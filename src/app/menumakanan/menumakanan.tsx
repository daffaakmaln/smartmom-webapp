"use client";

import { useState } from "react";
import { 
  Flame, 
  Beef, 
  Droplet, 
  Fish, 
  RefreshCw, 
  Bookmark,
  Bell,
  Search,
  User,
  Star,
  Check
} from "lucide-react";

export default function Menumakanan() {
  const [savedMenus, setSavedMenus] = useState<number[]>([]);

  // Sample menu data
  const menuData = [
    {
      id: 1,
      category: "Sarapan Pagi",
      icon: "🥣",
      name: "Bubur Havermut dengan Buah Segar",
      description: "Oatmeal hangat dengan potongan pisang, stroberi, dan taburan chia seed",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      calories: [320, 320, 320, 320],
      benefits: [
        "Sumber energi tahan lama",
        "Kaya serat untuk pencernaan",
        "Vitamin B kompleks",
        "Vitamin B kompleks"
      ]
    },
    {
      id: 2,
      category: "Makan Siang",
      icon: "⭐",
      name: "Nasi Merah dengan Ikan & Sayur",
      description: "Nasi merah, ikan salmon panggang, tumis brokoli wortel, dan tahu",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      calories: [420, 380, 350, 280],
      benefits: [
        "Protein tinggi untuk janin",
        "Omega-3 untuk otak bayi",
        "Zat besi mencegah anemia",
        "Kalsium untuk tulang"
      ]
    },
    {
      id: 3,
      category: "Makan Malam",
      icon: "🍽️",
      name: "Sup Ayam dengan Quinoa",
      description: "Sup ayam hangat dengan quinoa, wortel, kentang, dan daun bawang",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
      calories: [380, 350, 320, 290],
      benefits: [
        "Mudah dicerna",
        "Protein lengkap",
        "Rendah lemak",
        "Menghangatkan tubuh"
      ]
    }
  ];

  const nutritionSummary = {
    totalCalories: 1220,
    protein: 60,
    fat: 27,
    omega3: "Optimal"
  };

  const toggleSaveMenu = (menuId: number) => {
    setSavedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-800">
                Rekomendasi Menu Harian
              </h1>
              <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                Minggu Ke-24
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Menu disesuaikan dengan usia kehamilan dan kebutuhan nutrisi Ibu
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
              <span className="text-white text-xs lg:text-sm font-semibold">R</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Summary Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Flame size={16} className="text-red-500" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Total Kalori</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {nutritionSummary.totalCalories} <span className="text-sm font-normal text-gray-500">kkal</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <Beef size={16} className="text-pink-500" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Protein</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {nutritionSummary.protein}<span className="text-sm font-normal text-gray-500">g</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Droplet size={16} className="text-orange-500" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Zat Besi</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {nutritionSummary.fat}<span className="text-sm font-normal text-gray-500">mg</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Fish size={16} className="text-blue-500" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Omega-3</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {nutritionSummary.omega3}
            </p>
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-6">
          {menuData.map((menu) => (
            <div key={menu.id} className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{menu.icon}</span>
                <div className="flex-1">
                  <h3 className="text-pink-500 text-sm font-semibold mb-1">
                    {menu.category}
                  </h3>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {menu.name}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {menu.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Section - Info */}
                <div className="flex-1 space-y-4">
                  {/* Calorie Distribution */}
                  <div className="grid grid-cols-4 gap-3">
                    {menu.calories.map((cal, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Kalori</p>
                        <p className="text-sm font-bold text-gray-800">{cal} kkal</p>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Manfaat:</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      {menu.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="bg-pink-500 text-white rounded-xl px-4 py-2.5 text-sm font-medium flex items-center gap-2"
                        >
                          <Check size={16} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleSaveMenu(menu.id)}
                      className="flex-1 bg-white border-2 border-pink-200 text-pink-500 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors"
                    >
                      <RefreshCw size={18} />
                      Ganti Menu
                    </button>
                    <button
                      onClick={() => toggleSaveMenu(menu.id)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <Bookmark size={18} fill={savedMenus.includes(menu.id) ? "white" : "none"} />
                      Simpan
                    </button>
                  </div>
                </div>

                {/* Right Section - Image */}
                <div className="lg:w-80 flex-shrink-0">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-6 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-3">
            <Star size={24} className="flex-shrink-0 mt-1" fill="white" />
            <div>
              <h3 className="font-bold text-lg mb-2">Tips Menu Sehat</h3>
              <p className="text-sm text-pink-50 leading-relaxed">
                Variasikan menu setiap hari untuk mendapatkan nutrisi yang lengkap. 
                Konsultasikan dengan dokter atau ahli gizi jika ada kondisi kesehatan khusus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}