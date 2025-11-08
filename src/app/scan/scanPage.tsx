// src/app/scan/ScanPage.tsx
"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  Upload,
  Sparkles,
  Info,
  X,
  RefreshCcw,
  AlertTriangle,
  Heart,
  Flame,
  TrendingUp,
  Calendar,
} from "lucide-react";
import PageHeader from "@/components/header_page";

// --- INTERFACE ---
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

interface ScanHistory {
  id: string;
  timestamp: string;
  calories: number;
  imageName: string;
}

export default function ScanPage() {
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<HasilKartu | null>(null);
  const [analysisDetail, setAnalysisDetail] = useState<HasilAnalisis | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Data dummy untuk kalori harian
  const [dailyCalories, setDailyCalories] = useState(1850); // Total kalori hari ini
  const targetCalories = 2000; // Target kalori harian
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([
    { id: "1", timestamp: "08:00", calories: 450, imageName: "Sarapan - Nasi Goreng" },
    { id: "2", timestamp: "13:00", calories: 750, imageName: "Makan Siang - Ayam Geprek" },
    { id: "3", timestamp: "19:00", calories: 650, imageName: "Makan Malam - Soto Ayam" },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    selectedFile && URL.revokeObjectURL(selectedFile);
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

    setTimeout(() => {
      try {
        const dummyData: HasilAnalisis = {
          total_kalori_kcal: 650,
          komponen_makanan: [
            {
              nama: "Nasi Putih",
              porsi: "1 piring (200g)",
              kalori_kcal: 260,
              protein_g: 5.3,
              lemak_g: 0.5,
              karbohidrat_g: 56.0
            },
            {
              nama: "Ayam Goreng",
              porsi: "1 potong (100g)",
              kalori_kcal: 290,
              protein_g: 28.0,
              lemak_g: 18.0,
              karbohidrat_g: 3.0
            },
            {
              nama: "Sayur Tumis",
              porsi: "1 mangkok (150g)",
              kalori_kcal: 100,
              protein_g: 3.0,
              lemak_g: 5.0,
              karbohidrat_g: 12.0
            }
          ],
          saran_gizi_singkat: "Makanan ini cukup seimbang! Tinggi protein dari ayam baik untuk pertumbuhan. Namun, perhatikan asupan lemak dari gorengan. Tambahkan lebih banyak sayuran untuk serat dan vitamin yang optimal."
        };

        const resultData = {
          calories: Math.round(dummyData.total_kalori_kcal),
          protein: Math.round(dummyData.komponen_makanan.reduce((sum, k) => sum + k.protein_g, 0)),
          carbs: Math.round(dummyData.komponen_makanan.reduce((sum, k) => sum + k.karbohidrat_g, 0)),
          fat: Math.round(dummyData.komponen_makanan.reduce((sum, k) => sum + k.lemak_g, 0)),
        };

        setScanResult(resultData);
        setAnalysisDetail(dummyData);

        // Update daily calories dan history
        setDailyCalories(prev => prev + resultData.calories);
        const newScan: ScanHistory = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          calories: resultData.calories,
          imageName: fileObject?.name || "Makanan"
        };
        setScanHistory(prev => [...prev, newScan]);

      } catch (err) {
        console.error("❌ Error pada simulasi:", err);
        setError("Terjadi kesalahan saat memproses data dummy.");
      } finally {
        setIsScanning(false);
      }
    }, 2000);
  };

  const isFileReady = selectedFile && !isScanning;
  const caloriePercentage = (dailyCalories / targetCalories) * 100;
  const remainingCalories = targetCalories - dailyCalories;

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Scan AI Nutrisi"
        description="Upload foto makanan dan dapatkan analisis nutrisi secara instan dengan AI"
        userName="Rani"
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Calorie Tracker Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Daily Calorie Card */}
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Kalori Hari Ini</h3>
              <Flame size={24} />
            </div>
            <div className="mb-4">
              <p className="text-4xl font-bold mb-1">{dailyCalories}</p>
              <p className="text-pink-100 text-sm">dari {targetCalories} kkal</p>
            </div>
            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-pink-100 mt-2">
              {remainingCalories > 0 
                ? `Sisa ${remainingCalories} kkal lagi` 
                : `Melebihi ${Math.abs(remainingCalories)} kkal`}
            </p>
          </div>

          {/* Target Achievement */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Target Harian</h3>
              <TrendingUp size={24} className="text-green-500" />
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-800">{Math.round(caloriePercentage)}%</p>
              <p className="text-gray-500 text-sm">Tercapai</p>
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
              caloriePercentage >= 90 ? 'bg-green-100 text-green-700' :
              caloriePercentage >= 70 ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {caloriePercentage >= 90 ? 'Target Hampir Tercapai' :
               caloriePercentage >= 70 ? 'Dalam Jalur' :
               'Masih Perlu Makan'}
            </div>
          </div>

          {/* Scan Count */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Scan Hari Ini</h3>
              <Calendar size={24} className="text-purple-500" />
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-800">{scanHistory.length}</p>
              <p className="text-gray-500 text-sm">Makanan tercatat</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Rata-rata {Math.round(dailyCalories / scanHistory.length)} kkal per makanan
            </p>
          </div>
        </div>

        {/* Error Message */}
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
          {/* LEFT: UPLOAD & TIPS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden mb-4">
                  <img src={selectedFile} alt="Food" className="w-full h-full object-cover" />
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
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <Upload size={32} className="text-pink-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Upload Foto Makanan</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Pilih foto makanan dari galeri atau ambil foto baru
                </p>
              </div>
            )}

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

              <button
                onClick={handleAnalyze}
                disabled={!isFileReady || isScanning}
                className={`w-full max-w-xs py-3 rounded-full font-bold transition-all flex items-center justify-center ${
                  isFileReady && !isScanning
                    ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 shadow-xl"
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

          {/* RIGHT: ANALYSIS RESULT */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {scanResult ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hasil Analisis Nutrisi</h2>

                <div className="bg-pink-50 rounded-xl p-5 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3 text-lg">Informasi Nutrisi</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Kalori</p>
                      <p className="text-xl font-bold text-pink-600">{scanResult.calories} kal</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="text-xl font-bold text-pink-600">{scanResult.protein}g</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Karbohidrat</p>
                      <p className="text-xl font-bold text-pink-600">{scanResult.carbs}g</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-pink-100">
                      <p className="text-xs text-gray-500">Lemak</p>
                      <p className="text-xl font-bold text-pink-600">{scanResult.fat}g</p>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 border-l-4 border-teal-500 rounded-lg p-4 shadow-sm mb-4">
                  <h4 className="font-bold text-teal-800 mb-2 flex items-center">
                    <Heart size={16} className="mr-2 fill-teal-500 text-teal-800" />
                    Saran SmartMom
                  </h4>
                  <p className="text-sm text-gray-700">
                    {analysisDetail?.saran_gizi_singkat || "Tidak ada saran gizi yang tersedia."}
                  </p>
                </div>

                <button
                  onClick={handleClear}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Scan Lagi
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                {isScanning ? (
                  <div className="pb-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-6"></div>
                    <p className="text-lg font-semibold text-pink-600">Sedang Menganalisa...</p>
                    <p className="text-sm text-gray-500">Mohon tunggu sebentar.</p>
                  </div>
                ) : (
                  <div className="pb-20">
                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <Sparkles size={32} className="text-pink-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Hasil</h2>
                    <p className="text-sm text-gray-500">
                      Upload foto makanan dan klik Analisa Nutrisi untuk melihat hasilnya
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Scan History Section */}
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Riwayat Scan Hari Ini</h2>
          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <Flame size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{scan.imageName}</p>
                    <p className="text-xs text-gray-500">{scan.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-pink-600">{scan.calories}</p>
                  <p className="text-xs text-gray-500">kkal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}