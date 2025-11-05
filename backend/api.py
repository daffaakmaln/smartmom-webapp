# backend/api.py (FIXED VERSION)

from fastapi import FastAPI, HTTPException, Body, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
import google.generativeai as genai
import json
import os
import random 
import urllib.parse 
from typing import List, Optional
from dotenv import load_dotenv 
from pydantic import BaseModel, Field 
import re

# --- 1. KONFIGURASI AWAL DAN PENGATURAN AI ---
app = FastAPI()

# Load environment variables
load_dotenv() 

# Coba ambil API key dari berbagai sumber
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY")

print("=" * 60)
print("🔑 CHECKING GEMINI API KEY")
print("=" * 60)

if not GEMINI_API_KEY:
    print("❌ GEMINI_API_KEY TIDAK DITEMUKAN!")
    print("\n📝 Cara setting API Key:")
    print("   1. Buat file .env di folder backend/")
    print("   2. Tambahkan: GEMINI_API_KEY=your_actual_key_here")
    print("   3. Atau set environment variable di terminal:")
    print("      Windows: set GEMINI_API_KEY=your_key")
    print("      Linux/Mac: export GEMINI_API_KEY=your_key")
    print("\n🌐 Dapatkan API key di: https://makersuite.google.com/app/apikey")
    raise RuntimeError("GEMINI_API_KEY tidak ditemukan. Harap set environment variable.")

# Validasi format API key
if not GEMINI_API_KEY.startswith("AIza"):
    print(f"⚠️  WARNING: API Key tidak dimulai dengan 'AIza' - mungkin tidak valid")
    print(f"   Key Anda: {GEMINI_API_KEY[:20]}...")

print(f"✅ API Key ditemukan: {GEMINI_API_KEY[:10]}...{GEMINI_API_KEY[-4:]}")
print(f"📏 Panjang key: {len(GEMINI_API_KEY)} karakter")
print("=" * 60)

# Configure Gemini
try:
    genai.configure(api_key=GEMINI_API_KEY)
    print("✅ Gemini configured successfully")
except Exception as e:
    print(f"❌ Error configuring Gemini: {e}")
    raise

# Konfigurasi CORS
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prompt Engineering untuk Analisis Gizi Gambar
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
    
class SingleMenuRequest(BaseModel):
    slot_to_generate: str = Field(..., description="Slot waktu yang akan digenerate: 'Sarapan', 'Siang', atau 'Malam'")
    calorie_limit: Optional[float] = None

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
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        
        json_text = response.text.strip()
        json_text = re.sub(r'```json\s*|```', '', json_text, flags=re.IGNORECASE).strip()

        return json.loads(json_text)
        
    except Exception as e:
        print(f"Error calling Gemini for menu generation: {e}")
        # Fallback manual jika Gemini gagal
        return {
            "nama_menu": f"Fallback: Salad Gizi ({slot_nama})",
            "deskripsi": "Menu pengganti otomatis karena AI gagal. Pastikan API key dan service berjalan. Kalori target 320 kkal. Kaya serat dan vitamin.",
            "kalori": limit, 
            "protein": 18.0, 
            "lemak": 10.0, 
            "karbo": 40.0,
            "manfaat": ["Data Fallback Manual", "Sumber Vitamin C tinggi"]
        }


def generate_random_menu(slot_nama: str, calorie_limit: Optional[float] = None) -> SlotMenu:
    """Menggunakan Gemini atau Fallback untuk menghasilkan menu."""
    
    # 1. Tentukan Limit Kalori 
    if calorie_limit is None or calorie_limit == 0:
        if slot_nama == "Sarapan": 
            limit = 320.0
        elif slot_nama == "Siang": 
            limit = 450.0
        elif slot_nama == "Malam": 
            limit = 380.0
        else: 
            limit = 400.0
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
    print(f"📸 Menerima file: {file.filename}, Content-Type: {file.content_type}")
    
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar.")

    try:
        # Baca file gambar
        image_data = await file.read()
        print(f"📦 Ukuran file: {len(image_data)} bytes")
        
        # Validasi gambar dengan PIL
        try:
            image = Image.open(BytesIO(image_data))
            image.verify()  # Verifikasi integritas gambar
            image = Image.open(BytesIO(image_data))  # Re-open setelah verify
            print(f"✅ Gambar valid: {image.size}, format: {image.format}")
        except Exception as img_error:
            print(f"❌ Error membaca gambar: {img_error}")
            raise HTTPException(status_code=400, detail=f"File gambar tidak valid: {img_error}")

        # Panggil Gemini API
        print("🤖 Memanggil Gemini API...")
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Upload gambar ke Gemini
        response = model.generate_content([PROMPT_VISION, image])
        print(f"📥 Response dari Gemini diterima")
        
        # Debug: Print raw response
        print(f"🔍 Raw Response Text:\n{response.text[:500]}...")

        json_text = response.text.strip()
        
        # Bersihkan markdown code blocks
        json_text = re.sub(r'```json\s*|```', '', json_text, flags=re.IGNORECASE).strip()
        
        print(f"🧹 Cleaned JSON:\n{json_text[:500]}...")

        # Parse JSON
        data = json.loads(json_text)
        print(f"✅ JSON berhasil di-parse: {data.keys()}")
        
        # Validasi struktur data
        if "total_kalori_kcal" not in data:
            raise ValueError("Response dari AI tidak memiliki field 'total_kalori_kcal'")
        if "komponen_makanan" not in data:
            raise ValueError("Response dari AI tidak memiliki field 'komponen_makanan'")
            
        return data

    except json.JSONDecodeError as json_err:
        print(f"❌ JSON Decode Error: {json_err}")
        print(f"Problematic text: {json_text[:1000]}")
        raise HTTPException(
            status_code=500, 
            detail=f"Gagal memproses JSON dari AI: {json_err}. Raw response: {json_text[:200]}"
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Unexpected Error: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Analisis gagal: {type(e).__name__}: {str(e)}")


# --- 5. ENDPOINT MENU HARIAN (/api/menu-harian) ---

@app.post("/api/menu-harian", response_model=MenuHarianResponse)
async def generate_menu_harian(request: GantiMenuRequest = Body(...)):
    
    if request.slot_to_ganti == "ALL":
        total_target = 1200.0
        limit_sarapan = total_target * 0.25
        limit_siang = total_target * 0.40
        limit_malam = total_target * 0.35
        
        current_menu = MenuHarianResponse(
            minggu_ke="Minggu Ke-24 (AI Generated)",
            total_kalori=0.0, 
            total_protein=0.0, 
            total_besi=0.0, 
            omega3_status="",
            menu_sarapan=generate_random_menu("Sarapan", limit_sarapan), 
            menu_siang=generate_random_menu("Siang", limit_siang),
            menu_malam=generate_random_menu("Malam", limit_malam),
        )
    else:
        current_menu = request.menu_harian_saat_ini or MenuHarianResponse(
            minggu_ke="Minggu Ke-24 (AI Generated)", 
            total_kalori=0.0, 
            total_protein=0.0, 
            total_besi=0.0, 
            omega3_status="",
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


# --- 6. ENDPOINT BARU: GENERASI MENU TUNGGAL ---

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
        new_menu = generate_random_menu(slot_nama, limit)
        return new_menu
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal menghasilkan menu dari AI: {e}")


# --- 7. ENDPOINT TEST ---
@app.get("/")
def read_root():
    return {
        "status": "ok", 
        "service": "SmartMom Full API is running", 
        "endpoints": [
            "/analyze-food/",
            "/api/menu-harian",
            "/api/generate-single-menu"
        ]
    }