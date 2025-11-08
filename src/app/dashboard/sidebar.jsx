"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Users,
  Settings,
  Activity,
  Menu,
  ScanHeart,
  Globe,
  X,
  ForkKnife,
  Stethoscope,
  LogOutIcon,
  AlertTriangle,
  Smile,
  Newspaper,
  BabyIcon,
} from "lucide-react";

const menu = [
  { name: "Beranda", icon: <Home size={20} />, href: "/dashboard" },
  { name: "Scan AI Nutrisi", icon: <ScanHeart size={20} />, href: "/scan" },
  { name: "Perkembangan Janin", icon: <BabyIcon size={20} />, href: "/janin" },
  { name: "Menu Harian", icon: <ForkKnife size={20} />, href: "/menumakanan" },
  { name: "Jurnal Kesehatan", icon: <Activity size={20} />, href: "/jurnal" },
  { name: "Artikel & Edukasi", icon: <Globe size={20} />, href: "/artikel" },
  { name: "Komunitas Ibu", icon: <Users size={20} />, href: "/komunitas" },
  { name: "Konsultasi", icon: <Stethoscope size={20} />, href: "/konsultasi" },
  
  {
    name: "Pengaturan Akun",
    icon: <Settings size={20} />,
    href: "/pengaturan",
  },
  
];

// Data Dummy untuk Berita Terkini
const currentNews = {
  title: "Tips Nutrisi Terbaik untuk Trimester Kedua!",
  image:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80", // Ganti dengan URL gambar berita Anda
  description:
    "Selamat datang kembali! Jangan lewatkan artikel terbaru kami mengenai **pentingnya asam folat dan zat besi** untuk perkembangan optimal janin di usia kandungan 4 hingga 6 bulan. Baca selengkapnya di menu **Artikel & Edukasi**.",
};

// Kunci unik untuk localStorage
const WELCOME_POPUP_KEY = "hasSeenWelcomePopup";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  // Inisialisasi state pop-up menjadi FALSE
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Efek untuk MENAMPILKAN Pop-up Selamat Datang (hanya sekali)
  useEffect(() => {
    // Periksa apakah pop-up sudah pernah dilihat
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem(WELCOME_POPUP_KEY)
    ) {
      setShowWelcomePopup(true);
      // Tandai bahwa pop-up sudah dilihat
      localStorage.setItem(WELCOME_POPUP_KEY, "true");
    }
  }, []); // [] memastikan hanya dijalankan sekali setelah mount

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    // Logika logout (hapus token, clear storage, dll)
    console.log("User logged out");

    // Hapus status pop-up dari localStorage agar muncul lagi di sesi login berikutnya
    if (typeof window !== "undefined") {
      localStorage.removeItem(WELCOME_POPUP_KEY);
    }

    // Redirect ke halaman /src (global/landing page)
    router.push("/");
    setShowLogoutPopup(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const handleCloseWelcomePopup = () => {
    const popup = document.querySelector(".animate-popup-enter");
    if (popup) {
      popup.classList.remove("animate-popup-enter");
      popup.classList.add("animate-popup-exit");
    }

    const overlay = document.querySelector(".animate-fade-in");
    if (overlay) {
      overlay.classList.remove("animate-fade-in");
      overlay.classList.add("animate-fade-out");
    }

    // Tunggu durasi animasi (350ms), lalu sembunyikan popup
    setTimeout(() => {
      setShowWelcomePopup(false);
    }, 350);
  };

  return (
    <>
      {/* ... (Kode Sidebar Desktop, Mobile Nav, dan Drawer tidak berubah) ... */}

      {/* Sidebar Desktop */}
      <div className="hidden lg:flex fixed w-64 bg-gradient-to-b from-pink-500 to-pink-600 text-white p-6 flex-col rounded-r-3xl h-screen shadow-xl z-50">
        <h1 className="text-2xl font-bold mb-10">SmartMom</h1>
        <nav className="space-y-2 flex-1">
          {menu.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                pathname === item.href
                  ? "bg-white text-pink-500 shadow-md"
                  : "hover:bg-pink-400/50"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all bg-white/10 hover:bg-white/20 border border-white/30 mt-4"
        >
          <LogOutIcon size={20} />
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 flex justify-around py-2 px-2 shadow-lg z-40">
        {menu.slice(0, 4).map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              pathname === item.href
                ? "text-pink-500 bg-pink-50"
                : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">
              {item.name.split(" ")[0]}
            </span>
          </Link>
        ))}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-gray-500"
        >
          <Menu size={20} />
          <span className="text-[10px] font-medium">Lainnya</span>
        </button>
      </div>

      {/* Drawer Menu (for mobile) */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl z-[60] lg:hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Menu Lainnya</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {menu.slice(4).map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    pathname === item.href
                      ? "bg-pink-500 text-white shadow-md"
                      : "bg-pink-50 text-gray-800 hover:bg-pink-100"
                  }`}
                >
                  <span
                    className={
                      pathname === item.href ? "text-white" : "text-pink-500"
                    }
                  >
                    {item.icon}
                  </span>
                  <p className="text-sm font-medium">{item.name}</p>
                </Link>
              ))}

              {/* Logout Button di Drawer */}
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogoutClick();
                }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all w-full"
              >
                <LogOutIcon size={20} />
                <span className="text-sm font-medium">Keluar</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* =======================================
        POP-UP SELAMAT DATANG (WELCOME POPUP)
        (Hanya muncul sekali setelah login)
        =======================================
      */}
      {showWelcomePopup && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[75] flex items-center justify-center p-4 transition-opacity duration-500 ease-out ${
              showWelcomePopup ? "animate-fade-in" : "animate-fade-out"
            }`}
            onClick={handleCloseWelcomePopup}
          >
            {/* Popup Modal */}
            <div
              className={`bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                showWelcomePopup ? "animate-popup-enter" : "animate-popup-exit"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gambar Berita Terkini */}
              <div className="h-48 w-full bg-pink-100 relative overflow-hidden">
                <img
                  src={currentNews.image}
                  alt="Berita Terkini SmartMom"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1">
                  <Newspaper size={14} /> BERITA
                </div>
              </div>

              <div className="p-8">
                {/* Judul Selamat Datang */}
                <div className="flex items-center gap-3 mb-4 text-pink-500">
                  <Smile size={30} className="text-pink-600" />
                  <h3 className="text-3xl font-extrabold text-gray-800">
                    Selamat Datang!
                  </h3>
                </div>

                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {currentNews.title}
                </h4>
                <p className="text-gray-600 mb-6">{currentNews.description}</p>

                <div className="flex gap-3">
                  <button
                    onClick={handleCloseWelcomePopup}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Tutup
                  </button>
                  <Link
                    href="/artikel"
                    onClick={handleCloseWelcomePopup}
                    className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
                  >
                    Lihat Artikel <Globe size={16} className="inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Animation */}
          <style jsx>{`
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes fade-out {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }

            @keyframes popup-enter {
              from {
                opacity: 0;
                transform: translateY(25px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @keyframes popup-exit {
              from {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
              to {
                opacity: 0;
                transform: translateY(25px) scale(0.95);
              }
            }

            .animate-fade-in {
              animation: fade-in 0.35s ease-out forwards;
            }

            .animate-fade-out {
              animation: fade-out 0.35s ease-in forwards;
            }

            .animate-popup-enter {
              animation: popup-enter 0.45s ease-out forwards;
            }

            .animate-popup-exit {
              animation: popup-exit 0.35s ease-in forwards;
            }
          `}</style>
        </>
      )}

      {/* Logout Confirmation Popup (Tidak diubah) */}
      {showLogoutPopup && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
            onClick={handleCancelLogout}
          >
            {/* Popup Modal */}
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon Warning */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle size={32} className="text-red-500" />
                </div>
              </div>

              {/* Title & Message */}
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                Keluar dari Akun?
              </h3>
              <p className="text-gray-600 text-center mb-8">
                Apakah Anda yakin ingin keluar dari akun SmartMom Anda?
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelLogout}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg"
                >
                  Ya, Keluar
                </button>
              </div>
            </div>
          </div>

          {/* CSS Animation (Sudah ada di kode Anda) */}
          <style jsx>{`
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

            .animate-scale-in {
              animation: scale-in 0.2s ease-out;
            }
          `}</style>
        </>
      )}
    </>
  );
}
