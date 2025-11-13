"use client";

import { useState } from "react";
import { 
  Flame, 
  Beef, 
  Droplet, 
  Fish, 
  RefreshCw, 
  Bookmark,
  Star,
  Check,
  ArrowRight
} from "lucide-react";
import PageHeader from "@/components/header_page";
import Link from "next/link";

export default function MenuMakanan() {
  const [savedMenus, setSavedMenus] = useState<number[]>([]);
  const [currentMenuIndex, setCurrentMenuIndex] = useState<{[key: string]: number}>({
    "Makan Pagi": 0,
    "Makan Siang": 0,
    "Makan Malam": 0,
    "Snack": 0
  });
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [savedMenuName, setSavedMenuName] = useState("");

  // Extended menu data with multiple options per category
  const allMenuData = {
    "Makan Pagi": [
      {
        id: 1,
        category: "Makan Pagi",
        icon: "🌅",
        name: "Oatmeal dengan Buah & Kacang",
        description: "Oatmeal hangat dengan pisang, stroberi, almond cincang, dan madu",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
        calories: [320, 280, 260, 240],
        benefits: [
          "Serat tinggi cegah sembelit",
          "Energi tahan lama",
          "Asam folat untuk janin",
          "Antioksidan dari buah"
        ]
      },
      {
        id: 2,
        category: "Makan Pagi",
        icon: "🌅",
        name: "Sandwich Telur & Alpukat",
        description: "Roti gandum, telur orak-arik, alpukat, tomat, dan keju",
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
        calories: [380, 340, 310, 280],
        benefits: [
          "Protein dari telur",
          "Lemak sehat dari alpukat",
          "Kolin untuk otak bayi",
          "Vitamin E tinggi"
        ]
      },
      {
        id: 3,
        category: "Makan Pagi",
        icon: "🌅",
        name: "Smoothie Bowl Bayam & Berry",
        description: "Smoothie bayam, pisang, berry mix, granola, dan chia seeds",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
        calories: [340, 300, 280, 250],
        benefits: [
          "Zat besi dari bayam",
          "Antioksidan tinggi",
          "Vitamin C optimal",
          "Omega-3 dari chia"
        ]
      }
    ],
    "Makan Siang": [
      {
        id: 4,
        category: "Makan Siang",
        icon: "☀️",
        name: "Nasi Merah dengan Ikan & Sayur",
        description: "Nasi merah, ikan salmon panggang, tumis brokoli wortel, dan tahu",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        calories: [520, 480, 450, 380],
        benefits: [
          "Protein tinggi untuk janin",
          "Omega-3 untuk otak bayi",
          "Zat besi mencegah anemia",
          "Kalsium untuk tulang"
        ]
      },
      {
        id: 5,
        category: "Makan Siang",
        icon: "☀️",
        name: "Nasi Tim Ayam Jahe",
        description: "Nasi tim dengan ayam kampung, jahe, jamur shiitake, dan pak choy",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
        calories: [480, 440, 410, 360],
        benefits: [
          "Mudah dicerna",
          "Jahe kurangi mual",
          "Protein tinggi",
          "Vitamin B kompleks"
        ]
      },
      {
        id: 6,
        category: "Makan Siang",
        icon: "☀️",
        name: "Pasta Kalkun dengan Sayuran",
        description: "Pasta gandum utuh, daging kalkun giling, tomat, paprika, dan kemangi",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
        calories: [500, 460, 430, 370],
        benefits: [
          "Karbohidrat kompleks",
          "Protein tanpa lemak",
          "Lycopene dari tomat",
          "Vitamin C tinggi"
        ]
      }
    ],
    "Makan Malam": [
      {
        id: 7,
        category: "Makan Malam",
        icon: "🌙",
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
      },
      {
        id: 8,
        category: "Makan Malam",
        icon: "🌙",
        name: "Pepes Ikan dengan Nasi Hitam",
        description: "Ikan kakap pepes bumbu kuning, nasi hitam, sayur asem, dan tempe",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
        calories: [420, 380, 350, 310],
        benefits: [
          "Antosianin dari nasi hitam",
          "Protein ikan tinggi",
          "Probiotik dari tempe",
          "Rendah kalori"
        ]
      },
      {
        id: 9,
        category: "Makan Malam",
        icon: "🌙",
        name: "Tumis Tahu Sayur Campur",
        description: "Tahu sutra, buncis, jagung manis, wortel baby, dan kacang edamame",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
        calories: [360, 330, 300, 270],
        benefits: [
          "Protein nabati lengkap",
          "Serat tinggi",
          "Isoflavon dari kedelai",
          "Rendah kolesterol"
        ]
      }
    ],
    "Snack": [
      {
        id: 10,
        category: "Snack",
        icon: "🍪",
        name: "Greek Yogurt dengan Madu",
        description: "Greek yogurt tawar, madu murni, kacang almond, dan buah kiwi",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
        calories: [220, 200, 180, 160],
        benefits: [
          "Probiotik untuk pencernaan",
          "Kalsium tinggi",
          "Protein 15g per porsi",
          "Vitamin C dari kiwi"
        ]
      },
      {
        id: 11,
        category: "Snack",
        icon: "🍪",
        name: "Hummus dengan Sayur Stik",
        description: "Hummus homemade, wortel stik, seledri, paprika, dan crackers gandum",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
        calories: [180, 160, 140, 120],
        benefits: [
          "Serat dari kacang arab",
          "Protein nabati",
          "Vitamin A dari wortel",
          "Rendah gula"
        ]
      },
      {
        id: 12,
        category: "Snack",
        icon: "🍪",
        name: "Energy Balls Kurma",
        description: "Kurma, kacang mete, oat, cokelat dark, dan kelapa parut",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80",
        calories: [240, 220, 200, 180],
        benefits: [
          "Energi instan alami",
          "Zat besi dari kurma",
          "Magnesium tinggi",
          "Antioksidan cokelat"
        ]
      }
    ]
  };

  // Get current menus to display
  const getCurrentMenus = () => {
    return Object.keys(allMenuData).map(category => {
      const index = currentMenuIndex[category];
      return allMenuData[category as keyof typeof allMenuData][index];
    });
  };

  const menuData = getCurrentMenus();

  const nutritionSummary = {
    totalCalories: menuData.reduce((sum, menu) => sum + menu.calories[0], 0),
    protein: 75,
    fat: 32,
    omega3: "Optimal"
  };

  const changeMenu = (category: string) => {
    setCurrentMenuIndex(prev => {
      const categoryMenus = allMenuData[category as keyof typeof allMenuData];
      const currentIdx = prev[category];
      const nextIdx = (currentIdx + 1) % categoryMenus.length;
      
      return {
        ...prev,
        [category]: nextIdx
      };
    });
  };

  const toggleSaveMenu = (menuId: number, menuName: string) => {
    setSavedMenus(prev => {
      const isAlreadySaved = prev.includes(menuId);
      
      if (!isAlreadySaved) {
        // Show modal when saving
        setSavedMenuName(menuName);
        setShowSavedModal(true);
        
        // Auto hide modal after 2 seconds
        setTimeout(() => {
          setShowSavedModal(false);
        }, 2000);
        
        return [...prev, menuId];
      } else {
        // Remove from saved
        return prev.filter(id => id !== menuId);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Saved Modal */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Menu Tersimpan!</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold text-pink-500">{savedMenuName}</span> berhasil disimpan ke daftar menu favorit Anda
              </p>
              <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
                <p className="text-sm text-pink-600 font-medium">
                  📋 Total menu tersimpan: {savedMenus.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
            {/* Header */}
      <PageHeader 
        title="Rekomendasi menu"
        description="Menu disesuaikan dengan usia kehamilan dan kebutuhan nutrisi ibu."
        userName="SmartMom"
      />

 {/* Saved Menus Button - Versi Lebih Menarik */}
{savedMenus.length > 0 && (
  <div className="max-w-7xl mx-auto px-6 pt-4">
    <Link 
      href="/tersimpan" 
      className="group block w-full" // 'group' untuk mengaktifkan group-hover
    >
      <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-5 font-semibold flex items-center justify-between shadow-md hover:shadow-lg hover:shadow-green-300/50 transition-all duration-300 transform hover:scale-[1.01]">
        
        {/* Konten Kiri */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-pink bg-opacity-25 rounded-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
            <Bookmark size={30} fill="white" />
          </div>
          <div className="text-left">
            <p className="text-base font-bold">Menu Tersimpan</p>
            <p className="text-sm opacity-80">
              Lihat {savedMenus.length} menu favorit Anda
            </p>
          </div>
        </div>
        
        {/* Ikon Panah (Kanan) */}
        <ArrowRight 
          size={24} 
          className="transition-transform duration-300 group-hover:translate-x-1" 
        />
      </div>
    </Link>
  </div>
)}
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
                      onClick={(e) => {
                        e.preventDefault();
                        changeMenu(menu.category);
                      }}
                      className="flex-1 bg-white border-2 border-pink-200 text-pink-500 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors"
                    >
                      <RefreshCw size={18} />
                      Ganti Menu
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSaveMenu(menu.id, menu.name);
                      }}
                      className={`flex-1 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-all ${
                        savedMenus.includes(menu.id)
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg'
                      }`}
                    >
                      <Bookmark size={18} fill={savedMenus.includes(menu.id) ? "white" : "none"} />
                      {savedMenus.includes(menu.id) ? "Tersimpan ✓" : "Simpan"}
                    </button>
                  </div>
                  
                  {/* Detail Button */}
                  <Link href="/menu_detail">
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                      <Star size={18} />
                      Lihat Detail Menu
                    </button>
                  </Link>
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
                  {savedMenus.includes(menu.id) && (
                    <div className="mt-3 bg-green-50 border-2 border-green-200 rounded-xl p-3 flex items-center gap-2">
                      <Check size={16} className="text-green-600 flex-shrink-0" />
                      <p className="text-xs text-green-700 font-medium">
                        Menu ini sudah tersimpan di favorit Anda
                      </p>
                    </div>
                  )}
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