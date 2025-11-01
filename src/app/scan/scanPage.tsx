// smartmom-webapp/src/app/scan/ScanPage.tsx

"use client";

import { useState, ChangeEvent, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import {
  Upload,
  Sparkles,
  Info,
  X,
  Bell,
  Search,
  User,
  CheckCircle,
  RefreshCcw,
  AlertTriangle,
  Heart,
} from "lucide-react";

interface KomponenGizi {
  nama: string;
  porsi: string;
  kalori_kcal: number;
  protein_g: number;
  lemak_g: number;
  karbohidrat_g: number;
}

interface HasilAnalisis {
  total_kalori_kcal: number;
  komponen_makanan: KomponenGizi[];
  saran_gizi_singkat: string;
}

interface HasilKartu {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const API_URL = "http://localhost:8000/analyze-food/";

export default function ScanPage() {
  // Semua hooks harus di atas tanpa kondisi
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<HasilKartu | null>(null);
  const [analysisDetail, setAnalysisDetail] = useState<HasilAnalisis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Aman: efek tidak mengubah urutan hook
  useEffect(() => {setIsMounted(true);}, []);

  const activities = [
    { name: "Ayam Bakar", time: "1 jam lalu", status: "good" },
    { name: "Rendang Padang", time: "3 jam lalu", status: "warning" },
    { name: "Sushi", time: "4 jam lalu", status: "danger" },
  ];

  // Handler
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFileObject(file);
      setSelectedFile(URL.createObjectURL(file));
      setScanResult(null);
      setAnalysisDetail(null);
      setError(null);
    }
  };

  const handleClear = () => {
    setFileObject(null);
    setSelectedFile(null);
    setScanResult(null);
    setAnalysisDetail(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!fileObject) {
      setError("Tidak ada file gambar yang dipilih.");
      return;
    }

    setIsScanning(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", fileObject);

    try {
      const response = await axios.post<HasilAnalisis>(API_URL, formData);
      const data = response.data;

      const totalCalories = data.total_kalori_kcal;
      const totalProtein = data.komponen_makanan.reduce((sum, item) => sum + item.protein_g, 0);
      const totalCarbs = data.komponen_makanan.reduce((sum, item) => sum + item.karbohidrat_g, 0);
      const totalFat = data.komponen_makanan.reduce((sum, item) => sum + item.lemak_g, 0);

      setScanResult({
        calories: totalCalories,
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fat: Math.round(totalFat),
      });

      setAnalysisDetail(data);
    } catch (err) {
      console.error("Kesalahan Analisis:", err);
      if (isAxiosError(err) && err.response) {
        setError(`Error ${err.response.status}: ${err.response.data.detail || "Terjadi kesalahan server."}`);
      } else {
        setError("Koneksi gagal. Pastikan server FastAPI (Python) berjalan di port 8000.");
      }
    } finally {
      setIsScanning(false);
    }
  };

  const isFileReady = selectedFile && !isScanning;

  // Return baru di sini (tidak sebelum hooks)
  if (!isMounted) return null;

  // --- RENDER UI (Bagian yang sudah Anda buat) ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (Dipertahankan) */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Scan AI Nutrisi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload foto makanan dan dapatkan analisis nutrisi secara instan
            dengan AI
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs lg:text-sm font-semibold">
              R
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Pesan Error Global */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-start">
            <AlertTriangle size={20} className="mr-3 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold">Gagal Menganalisis:</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* KARTU KIRI: UPLOAD & TIPS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {/* TAMPILAN FOTO TERPILIH */}
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden mb-4">
                  <img
                    src={selectedFile}
                    alt="Food"
                    className="w-full h-full object-cover"
                  />
                  {/* Tombol Hapus */}
                  <button
                    onClick={handleClear}
                    className="absolute top-2 right-2 bg-white text-gray-700 p-1 rounded-full shadow-md hover:bg-gray-200 transition-colors"
                    title="Hapus Foto"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-gray-700 font-medium mb-3">Foto Terpilih</p>
                <p className="text-sm text-gray-500 mb-6">
                  Pilih foto makanan dan tekan Analisa Nutrisi di bawah.
                </p>
              </div>
            ) : (
              // TAMPILAN PLACEHOLDER AWAL
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <Upload size={32} className="text-pink-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Upload Foto Makanan
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Pilih foto makanan dari galeri atau ambil foto baru
                </p>
              </div>
            )}

            {/* Kontrol Tombol */}
            <div className="flex flex-col items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-medium cursor-pointer hover:bg-gray-200 transition-colors mb-2"
              >
                {selectedFile ? "Ganti Foto" : "Pilih Foto"}
              </label>

              {/* Tombol Analisa Nutrisi */}
              <button
                onClick={handleAnalyze}
                disabled={!isFileReady || isScanning}
                className={`w-full max-w-xs py-3 rounded-full font-bold transition-all flex items-center justify-center ${
                  isFileReady && !isScanning
                    ? "bg-black text-white hover:bg-gray-800 shadow-xl"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {isScanning ? (
                  <RefreshCcw size={20} className="mr-2 animate-spin" />
                ) : (
                  <Sparkles size={20} className="mr-2" />
                )}
                {isScanning ? "Menganalisa..." : "Analisa Nutrisi"}
              </button>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-3 mb-4">
                <Info size={20} className="mt-1 flex-shrink-0" />
                <h3 className="font-semibold text-lg">Tips Scan yang Baik:</h3>
              </div>
              <ul className="space-y-2 text-sm ml-8">
                <li className="flex items-start gap-2">
                  <span className="text-pink-200">•</span>
                  <span>Pastikan makanan terlihat jelas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-200">•</span>
                  <span>Gunakan pencahayaan yang cukup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-200">•</span>
                  <span>Foto dari sudut atas untuk hasil terbaik</span>
                </li>
              </ul>
            </div>
          </div>

          {/* KARTU KANAN: HASIL ANALISIS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {scanResult ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Hasil Analisis Nutrisi
                </h2>

                {/* Kartu Nutrisi Utama (Kalori, Protein, Karbo, Lemak) */}
                <div className="bg-pink-50 rounded-xl p-5 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                    {/* Nama Makanan dari Backend jika tersedia: {analysisDetail?.komponen_makanan[0]?.nama} */}
                    Informasi Nutrisi
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Kalori */}
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Kalori</p>
                      <p className="text-xl font-bold text-pink-600">
                        {scanResult.calories} kal
                      </p>
                    </div>
                    {/* Protein */}
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="text-xl font-bold text-pink-600">
                        {scanResult.protein}g
                      </p>
                    </div>
                    {/* Karbohidrat */}
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Karbohidrat</p>
                      <p className="text-xl font-bold text-pink-600">
                        {scanResult.carbs}g
                      </p>
                    </div>
                    {/* Lemak */}
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Lemak</p>
                      <p className="text-xl font-bold text-pink-600">
                        {scanResult.fat}g
                      </p>
                    </div>
                  </div>
                </div>

                {/* Saran Gizi */}
                <div className="bg-teal-50 border-l-4 border-teal-500 rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-teal-800 mb-2 flex items-center">
                    <Heart
                      size={16}
                      className="mr-2 fill-teal-500 text-teal-800"
                    />{" "}
                    Saran SmartMom
                  </h4>
                  <p className="text-sm text-gray-700">
                    {analysisDetail?.saran_gizi_singkat ||
                      "Tidak ada saran gizi yang tersedia dari analisis ini."}
                  </p>
                </div>

                {/* Tombol Scan Lagi */}
                <button
                  onClick={handleClear}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors mt-4"
                >
                  Scan Lagi
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                {isScanning ? (
                  // Tampilan Loading
                  <div className="pb-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-6"></div>
                    <p className="text-lg font-semibold text-pink-600">
                      Sedang Menganalisa...
                    </p>
                    <p className="text-sm text-gray-500">
                      Mohon tunggu sebentar.
                    </p>
                  </div>
                ) : (
                  // Tampilan Belum Ada Hasil
                  <div className="pb-20">
                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <Sparkles size={32} className="text-pink-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Belum Ada Hasil
                    </h2>
                    <p className="text-sm text-gray-500">
                      Upload foto makanan dan klik "Analisa Nutrisi" untuk
                      melihat hasilnya
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Activity Section (Tetap sama) */}
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Aktivitas Hari Ini
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-5 ${
                  activity.status === "good"
                    ? "bg-green-50"
                    : activity.status === "warning"
                    ? "bg-orange-50"
                    : "bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {activity.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <button
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      activity.status === "good"
                        ? "bg-green-500"
                        : activity.status === "warning"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  >
                    <X size={14} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
