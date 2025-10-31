# backend/api.py

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
from google import genai
import json
import os
# --- PUSTAKA TAMBAHAN ---
from dotenv import load_dotenv # Untuk membaca kunci dari file .env

# --- 1. Konfigurasi Awal dan Keamanan ---
app = FastAPI()

# Muat variabel lingkungan dari file .env di direktori backend/
load_dotenv() 

# Mengambil Kunci API dari Variabel Lingkungan
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    # Menghentikan server jika kunci API tidak ditemukan (Demi Keamanan)
    # Ini akan mencari di environment system ATAU file .env
    raise RuntimeError("GEMINI_API_KEY tidak ditemukan. Harap set environment variable.")

client = genai.Client(api_key=GEMINI_API_KEY)

# Konfigurasi CORS (Wajib untuk komunikasi Frontend)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. Prompt Engineering (Inti Logika AI) ---
PROMPT = """
Anda adalah Ahli Gizi AI Profesional. Tugas Anda adalah menganalisis gambar makanan ini.
1. Identifikasi SEMUA komponen makanan di piring.
2. Perkirakan porsi (gunakan satuan umum: mangkok, potong, atau gram).
3. Hitung total Kalori (kcal) dan makronutrien (Protein, Lemak, Karbohidrat dalam gram).

Sajikan hasil analisis Anda HANYA dalam format JSON untuk memudahkan pemrosesan. JANGAN tambahkan teks lain di luar blok JSON. Gunakan struktur berikut:
{
  "total_kalori_kcal": [angka],
  "komponen_makanan": [
    {"nama": "...", "porsi": "...", "kalori_kcal": [angka], "protein_g": [angka], "lemak_g": [angka], "karbohidrat_g": [angka]}
  ],
  "saran_gizi_singkat": "..."
}
"""

# --- 3. API Endpoint Utama ---
@app.post("/analyze-food/")
async def analyze_food(file: UploadFile = File(...)):
    """
    Menerima file gambar, memprosesnya melalui Gemini Vision, 
    dan mengembalikan analisis gizi dalam format JSON.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar.")

    try:
        # 1. Baca data gambar yang diunggah
        image_data = await file.read()
        image = Image.open(BytesIO(image_data))

        # 2. Panggil Gemini Multimodal
        response = client.models.generate_content(
            model='gemini-2.5-flash', 
            contents=[PROMPT, image]
        )

        json_text = response.text.strip()
        
        # 3. Bersihkan dan kembalikan JSON
        if json_text.startswith("```json"):
            json_text = json_text.replace("```json", "").replace("```", "").strip()

        data = json.loads(json_text)
        return data

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Gagal memproses JSON dari AI. Coba lagi dengan gambar yang lebih jelas.")
    except Exception as e:
        # Tangani error umum lainnya
        raise HTTPException(status_code=500, detail=f"Analisis gagal di backend: {e}")

# --- 4. Endpoint Test (Opsional) ---
@app.get("/")
def read_root():
    return {"status": "Backend Gizi AI berjalan! Akses /analyze-food/ via POST."}