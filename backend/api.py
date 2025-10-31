# backend/api.py (VERSI FINAL TERSTRUKTUR DENGAN GENERASI GEMINI DAN SINGLE-MENU ENDPOINT)

from fastapi import FastAPI, HTTPException, Body, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
from google import genai
import json
import os
import random 
import urllib.parse 
from typing import List, Optional
# --- PUSTAKA TAMBAHAN ---
from dotenv import load_dotenv 
from pydantic import BaseModel, Field 
import re # Diperlukan untuk membersihkan JSON dari respons Gemini

# --- 1. KONFIGURASI AWAL DAN PENGATURAN AI ---
app = FastAPI()

load_dotenv() 

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY tidak ditemukan. Harap set environment variable.")

client = genai.Client(api_key=GEMINI_API_KEY)

# Konfigurasi CORS (Tetap Sama)
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prompt Engineering untuk Analisis Gizi Gambar (Tetap Sama)
PROMPT_VISION = """
Anda adalah Ahli Gizi AI Profesional. Tugas Anda adalah menganalisis gambar makanan ini.
1. Identifikasi SEMUA komponen makanan di piring.
2. Perkirakan porsi (gunakan satuan umum: mangkok, potong, atau gram).
3. Hitung total Kalori (kcal) dan makronutrien (Protein, Lemak, Karbohidrat dalam gram).

Sajikan hasil analisis Anda HANYA dalam format JSON untuk memudahkan pemprosesan. JANGAN tambahkan teks lain di luar blok JSON. Gunakan struktur berikut:
{
  "total_kalori_kcal": [angka],
  "komponen_makanan": [
    {"nama": "...", "porsi": "...", "kalori_kcal": [angka], "protein_g": [angka], "lemak_g": [angka], "karbohidrat_g": [angka]}
  ],
  "saran_gizi_singkat": "..."
}
"""


# --- 2. MODEL DATA PYDANTIC ---

class MakroDetail(BaseModel):
    kalori: float
    protein: float
    lemak: float
    karbo: float

class Manfaat(BaseModel):
    teks: str
    status: str = Field(default="optimal")

class SlotMenu(BaseModel):
    nama_menu: str
    deskripsi: str
    nutrisi: MakroDetail
    manfaat: List[Manfaat]
    url_gambar: str 

class MenuHarianResponse(BaseModel):
    minggu_ke: str = "Minggu Ke-24"
    total_kalori: float
    total_protein: float
    total_besi: float
    omega3_status: str
    menu_sarapan: SlotMenu
    menu_siang: SlotMenu
    menu_malam: SlotMenu

class GantiMenuRequest(BaseModel):
    slot_to_ganti: str = Field(..., description="e.g., 'Sarapan', 'Siang', 'Malam', atau 'ALL'")
    menu_harian_saat_ini: Optional[MenuHarianResponse] = None
    calorie_limit: Optional[float] = None 
    
# *** MODEL BARU UNTUK GENERASI MENU TUNGGAL ***
class SingleMenuRequest(BaseModel):
    slot_to_generate: str = Field(..., description="Slot waktu yang akan digenerate: 'Sarapan', 'Siang', atau 'Malam'")
    calorie_limit: Optional[float] = None
# **********************************************

class KomponenGiziAnalisis(BaseModel):
    nama: str
    porsi: str
    kalori_kcal: float
    protein_g: float
    lemak_g: float
    karbohidrat_g: float

class AnalisisGiziResponse(BaseModel):
    total_kalori_kcal: float
    komponen_makanan: List[KomponenGiziAnalisis]
    saran_gizi_singkat: str


# --- 3. LOGIKA GENERASI MENU DENGAN GEMINI ---

def generate_ai_image_url(prompt: str) -> str:
    """Simulasi URL gambar AI untuk menghindari caching."""
    encoded_prompt = urllib.parse.quote(prompt)
    return f"https://source.unsplash.com/random/400x300/?healthy_food,{encoded_prompt}&{random.randint(1000, 9999)}"

def generate_gemini_prompt(slot_nama: str, limit: float) -> str:
    """Membuat prompt khusus berdasarkan batasan kalori."""
    return f"""
Anda adalah Ahli Gizi AI. Buatkan satu ide menu lengkap yang cocok untuk wanita hamil pada slot makan '{slot_nama}'.
Menu ini HARUS memiliki total kalori SANGAT DEKAT dengan {limit:.0f} kkal.
Sajikan hasilnya HANYA dalam format JSON. JANGAN tambahkan teks lain.
Pastikan semua nilai nutrisi adalah angka (tipe float) dan kalori total mendekati target.

Struktur JSON yang WAJIB digunakan:
{{
  "nama_menu": "[Nama unik dan deskriptif]",
  "deskripsi": "[Deskripsi resep, 2-3 kalimat]",
  "kalori": {limit:.1f},
  "protein": [float, gram],
  "lemak": [float, gram],
  "karbo": [float, gram],
  "manfaat": ["Manfaat 1", "Manfaat 2", "Manfaat 3"]
}}
"""

def call_gemini_for_menu_detail(slot_nama: str, limit: float) -> dict:
    """Memanggil Gemini API untuk menghasilkan detail menu."""
    
    prompt = generate_gemini_prompt(slot_nama, limit)
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash', 
            contents=[prompt]
        )
        
        json_text = response.text.strip()
        json_text = re.sub(r'```json\s*|```', '', json_text, flags=re.IGNORECASE).strip()

        return json.loads(json_text)
        
    except Exception as e:
        print(f"Error calling Gemini for menu generation: {e}")
        # Fallback manual jika Gemini gagal
        return {
            "nama_menu": f"Fallback: Salad Gizi ({slot_nama})",
            "deskripsi": "Menu pengganti otomatis karena AI gagal. Pastikan API key dan service berjalan. Kalori target 320 kkal. Kaya serat dan vitamin.",
            "kalori": 320.0, "protein": 18.0, "lemak": 10.0, "karbo": 40.0,
            "manfaat": ["Data Fallback Manual", "Sumber Vitamin C tinggi"]
        }


def generate_random_menu(slot_nama: str, calorie_limit: Optional[float] = None) -> SlotMenu:
    """Menggunakan Gemini atau Fallback untuk menghasilkan menu."""
    
    # 1. Tentukan Limit Kalori 
    if calorie_limit is None or calorie_limit == 0:
        if slot_nama == "Sarapan": limit = 320.0
        elif slot_nama == "Siang": limit = 450.0
        elif slot_nama == "Malam": limit = 380.0
        else: limit = 400.0
    else:
        limit = calorie_limit

    # 2. Panggil Gemini untuk menghasilkan data
    menu_data = call_gemini_for_menu_detail(slot_nama, limit)
    
    # 3. Proses data yang diterima
    url_gambar_ai = generate_ai_image_url(f"delicious healthy {menu_data['nama_menu']}")

    manfaat_list = [
        Manfaat(teks=teks, status="optimal") for teks in menu_data.get("manfaat", [])
    ]
    
    return SlotMenu(
        nama_menu=menu_data.get("nama_menu", "Nama Menu Default"), 
        deskripsi=menu_data.get("deskripsi", "Deskripsi Default"),
        nutrisi=MakroDetail(
            # Memastikan semua kunci ada, menggunakan .get() dan nilai default
            kalori=menu_data.get("kalori", limit), 
            protein=menu_data.get("protein", 0.0), 
            lemak=menu_data.get("lemak", 0.0), 
            karbo=menu_data.get("karbo", 0.0)
        ),
        manfaat=manfaat_list,
        url_gambar=url_gambar_ai 
    )


def calculate_totals(sarapan: SlotMenu, siang: SlotMenu, malam: SlotMenu):
    """Menghitung total gizi harian dari ketiga slot."""
    total_kal = sarapan.nutrisi.kalori + siang.nutrisi.kalori + malam.nutrisi.kalori
    total_prot = sarapan.nutrisi.protein + siang.nutrisi.protein + malam.nutrisi.protein
    return total_kal, total_prot, 27.0, "Optimal" 


# --- 4. ENDPOINT ANALISIS GIZI GAMBAR (/analyze-food/) ---

@app.post("/analyze-food/", response_model=AnalisisGiziResponse)
async def analyze_food(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar.")

    try:
        image_data = await file.read()
        image = Image.open(BytesIO(image_data))

        response = client.models.generate_content(
            model='gemini-2.5-flash', 
            contents=[PROMPT_VISION, image]
        )

        json_text = response.text.strip()
        
        if json_text.startswith("```json"):
            json_text = json_text.replace("```json", "").replace("```", "").strip()

        data = json.loads(json_text)
        
        return data

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Gagal memproses JSON dari AI. Coba lagi dengan gambar yang lebih jelas.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analisis gagal di backend: {e}")


# --- 5. ENDPOINT MENU HARIAN (/api/menu-harian) ---

@app.post("/api/menu-harian", response_model=MenuHarianResponse)
async def generate_menu_harian(request: GantiMenuRequest = Body(...)):
    
    # ... (Logika Generate Menu Harian Tetap Sama)
    
    # KOREKSI: Jika request adalah ALL (panggilan pertama), kita tetapkan limit untuk setiap slot
    if request.slot_to_ganti == "ALL":
        total_target = 1200.0
        limit_sarapan = total_target * 0.25
        limit_siang = total_target * 0.40
        limit_malam = total_target * 0.35
        
        current_menu = MenuHarianResponse(
            minggu_ke="Minggu Ke-24 (AI Generated)",
            total_kalori=0.0, total_protein=0.0, total_besi=0.0, omega3_status="",
            menu_sarapan=generate_random_menu("Sarapan", limit_sarapan), 
            menu_siang=generate_random_menu("Siang", limit_siang),
            menu_malam=generate_random_menu("Malam", limit_malam),
        )
    else:
        current_menu = request.menu_harian_saat_ini or MenuHarianResponse(
            minggu_ke="Minggu Ke-24 (AI Generated)", 
            total_kalori=0.0, total_protein=0.0, total_besi=0.0, omega3_status="",
            menu_sarapan=generate_random_menu("Sarapan"), 
            menu_siang=generate_random_menu("Siang"),
            menu_malam=generate_random_menu("Malam"),
        )
        
        limit = request.calorie_limit
        
        if request.slot_to_ganti == "Sarapan":
            current_menu.menu_sarapan = generate_random_menu("Sarapan", limit) 
        elif request.slot_to_ganti == "Siang":
            current_menu.menu_siang = generate_random_menu("Siang", limit)
        elif request.slot_to_ganti == "Malam":
            current_menu.menu_malam = generate_random_menu("Malam", limit)
        else:
             raise HTTPException(status_code=400, detail="Slot menu yang diminta tidak valid.")
    
    total_kal, total_prot, total_besi, omega3 = calculate_totals(
        current_menu.menu_sarapan, current_menu.menu_siang, current_menu.menu_malam
    )
    
    current_menu.total_kalori = total_kal
    current_menu.total_protein = total_prot
    current_menu.total_besi = total_besi
    current_menu.omega3_status = omega3
    
    return current_menu


# *** 7. ENDPOINT BARU: GENERASI MENU TUNGGAL ***

@app.post("/api/generate-single-menu", response_model=SlotMenu)
async def generate_single_menu(request: SingleMenuRequest = Body(...)):
    """
    Menghasilkan satu ide menu lengkap (SlotMenu) berdasarkan slot waktu 
    dan batasan kalori yang diminta oleh pengguna.
    """
    slot_nama = request.slot_to_generate
    limit = request.calorie_limit
    
    if slot_nama not in ["Sarapan", "Siang", "Malam"]:
        raise HTTPException(status_code=400, detail="Slot menu yang diminta harus 'Sarapan', 'Siang', atau 'Malam'.")
        
    try:
        # Panggil logika generasi Gemini yang sudah ada
        new_menu = generate_random_menu(slot_nama, limit)
        return new_menu
    except Exception as e:
        # Menangkap error jika Gemini gagal menghasilkan data, menggunakan fallback
        raise HTTPException(status_code=500, detail=f"Gagal menghasilkan menu dari AI: {e}")


# --- 8. ENDPOINT TEST ---
@app.get("/")
def read_root():
    return {"status": "ok", "service": "SmartMom Full API is running. Available: /analyze-food/, /api/menu-harian, & /api/generate-single-menu"}