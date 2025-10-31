"use client";

import { useState, ChangeEvent } from "react";
import { Upload, Sparkles, Info, X, Bell, Search, User } from "lucide-react";

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  // Sample activity data
  const activities = [
    { name: "Ayam Bakar", time: "1 jam lalu", status: "good" },
    { name: "Rendang Padang", time: "3 jam lalu", status: "warning" },
    { name: "Sushi", time: "4 jam lalu", status: "danger" },
  ];

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      // Simulate scan result after 1.5 seconds
      setTimeout(() => {
        setScanResult({
          name: file.name,
          calories: 450,
          protein: 25,
          carbs: 35,
          fat: 15,
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Scan AI Nutrisi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload foto makanan dan dapatkan analisis nutrisi secara instan dengan AI
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
              <span className="text-white text-xs lg:text-sm font-semibold">N</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Upload size={32} className="text-pink-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Upload Foto Makanan
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Pilih foto makanan dari galeri atau ambil foto baru
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full font-medium cursor-pointer hover:shadow-lg transition-all"
              >
                Pilih Foto
              </label>
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

          {/* Result Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {!selectedFile ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <Sparkles size={32} className="text-pink-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Belum Ada Hasil
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  Upload foto makanan dan klik "Analisa Nutrisi" untuk melihat hasilnya
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Hasil Analisis
                </h2>
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={selectedFile}
                    alt="Food"
                    className="w-full h-full object-cover"
                  />
                </div>
                {scanResult ? (
                  <div className="space-y-4">
                    <div className="bg-pink-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Informasi Nutrisi
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Kalori</p>
                          <p className="text-lg font-bold text-pink-600">
                            {scanResult.calories} kal
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Protein</p>
                          <p className="text-lg font-bold text-pink-600">
                            {scanResult.protein}g
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Karbohidrat</p>
                          <p className="text-lg font-bold text-pink-600">
                            {scanResult.carbs}g
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">Lemak</p>
                          <p className="text-lg font-bold text-pink-600">
                            {scanResult.fat}g
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setScanResult(null);
                      }}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Scan Lagi
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Activity Section */}
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