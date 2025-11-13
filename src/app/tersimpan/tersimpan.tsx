"use client";

import { useState } from "react";
import { 
  Flame, 
  Beef, 
  Droplet, 
  Fish, 
  Bookmark,
  Star,
  Check,
  Trash2,
  ChevronLeft
} from "lucide-react";

export default function MenuTersimpan() {
  const [savedMenus, setSavedMenus] = useState([
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
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<number | null>(null);
  const [menuToDeleteName, setMenuToDeleteName] = useState("");

  const nutritionSummary = {
    totalCalories: savedMenus.reduce((sum, menu) => sum + menu.calories[0], 0),
    protein: 95,
    iron: 45,
    omega3: "Tinggi"
  };

  const confirmDelete = (menuId: number, menuName: string) => {
    setMenuToDelete(menuId);
    setMenuToDeleteName(menuName);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (menuToDelete) {
      setSavedMenus(prev => prev.filter(menu => menu.id !== menuToDelete));
      setShowDeleteModal(false);
      setMenuToDelete(null);
      setMenuToDeleteName("");
    }
  };

  const handleViewDetail = (menu: any) => {
    // Navigasi ke halaman detail menu
    window.location.href = '/menu_detail';
  };

  const handleBackToMenu = () => {
    // Navigasi kembali ke halaman menu makanan
    window.location.href = '/menumakanan';
  };

  const handleExploreMenu = () => {
    // Navigasi ke halaman menu
    window.location.href = '/menumakanan';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={40} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Hapus Menu?</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus <span className="font-semibold text-pink-500">{menuToDeleteName}</span> dari daftar tersimpan?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 rounded-xl py-3 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white rounded-xl py-3 font-semibold hover:bg-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={handleBackToMenu}
            className="flex items-center gap-2 mb-4 text-pink-100 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Kembali</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Bookmark size={28} fill="white" />
            <h1 className="text-3xl font-bold">Menu Tersimpan</h1>
          </div>
          <p className="text-pink-100 text-sm">
            {savedMenus.length} menu favorit Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Nutrition Summary Cards */}
        {savedMenus.length > 0 && (
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
                {nutritionSummary.iron}<span className="text-sm font-normal text-gray-500">mg</span>
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
        )}

        {/* Empty State */}
        {savedMenus.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Menu Tersimpan</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Simpan menu favorit Anda dari halaman rekomendasi menu untuk akses yang lebih mudah
            </p>
            <button 
              onClick={handleExploreMenu}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl px-8 py-3 font-semibold hover:shadow-lg transition-all"
            >
              Jelajahi Menu
            </button>
          </div>
        ) : (
          <>
            {/* Menu List */}
            <div className="space-y-6">
              {savedMenus.map((menu) => (
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
                          onClick={() => confirmDelete(menu.id, menu.name)}
                          className="flex-1 bg-white border-2 border-red-200 text-red-500 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={18} />
                          Hapus dari Tersimpan
                        </button>
                        <button 
                          onClick={() => handleViewDetail(menu)}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                        >
                          <Star size={18} />
                          Lihat Detail Menu
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
                      <div className="mt-3 bg-green-50 border-2 border-green-200 rounded-xl p-3 flex items-center gap-2">
                        <Bookmark size={16} className="text-green-600 flex-shrink-0" fill="currentColor" />
                        <p className="text-xs text-green-700 font-medium">
                          Menu favorit Anda
                        </p>
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
                  <h3 className="font-bold text-lg mb-2">Menu Favorit Anda</h3>
                  <p className="text-sm text-pink-50 leading-relaxed">
                    Anda memiliki {savedMenus.length} menu tersimpan. Kombinasikan menu-menu ini untuk mendapatkan variasi nutrisi yang optimal setiap harinya.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}