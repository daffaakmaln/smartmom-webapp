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
  Heart,
  Globe,
  X,
  Utensils,
  Stethoscope,
  LogOut,
  AlertTriangle,
  Smile,
  Newspaper,
  Baby,
} from "lucide-react";

const menu = [
  { name: "Beranda", icon: <Home size={20} />, href: "/dashboard" },
  { name: "Scan AI Nutrisi", icon: <Heart size={20} />, href: "/scan" },
  { name: "Perkembangan Janin", icon: <Baby size={20} />, href: "/janin" },
  { name: "Menu Harian", icon: <Utensils size={20} />, href: "/menumakanan" },
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
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  description: `Selamat datang kembali! Jangan lewatkan artikel terbaru kami mengenai <b>pentingnya asam folat dan zat besi</b> untuk perkembangan optimal janin di usia kandungan 4 hingga 6 bulan. Baca selengkapnya di menu <b>Artikel & Edukasi</b>.`,
};

const WELCOME_POPUP_KEY = "hasSeenWelcomePopup";
const SESSION_POPUP_KEY = "sessionWelcomeShown";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenInSession = sessionStorage.getItem(SESSION_POPUP_KEY);

      if (!hasSeenInSession) {
        setTimeout(() => {
          setShowWelcomePopup(true);
          sessionStorage.setItem(SESSION_POPUP_KEY, "true");
        }, 500);
      }
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    console.log("User logged out");
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_POPUP_KEY);
      localStorage.removeItem(WELCOME_POPUP_KEY);
    }
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

    setTimeout(() => {
      setShowWelcomePopup(false);
    }, 350);
  };

  const handleCloseMobileMenu = () => {
    setOpen(false);
  };

  return (
    <>
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

        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all bg-white/10 hover:bg-white/20 border border-white/30 mt-4"
        >
          <LogOut size={20} />
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

      {/* Mobile Menu Overlay - Lainnya */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden animate-fade-in"
            onClick={handleCloseMobileMenu}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[65] lg:hidden animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Menu Lainnya</h2>
                <button
                  onClick={handleCloseMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <nav className="space-y-2">
                {menu.slice(4).map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={handleCloseMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                      pathname === item.href
                        ? "bg-pink-500 text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-pink-50"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                ))}

                <button
                  onClick={() => {
                    handleCloseMobileMenu();
                    handleLogoutClick();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all bg-red-50 text-red-600 hover:bg-red-100 mt-4"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Keluar</span>
                </button>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Welcome Popup */}
      {showWelcomePopup && (
        <>
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[75] flex items-center justify-center p-4 transition-opacity duration-500 ease-out ${
              showWelcomePopup ? "animate-fade-in" : "animate-fade-out"
            }`}
            onClick={handleCloseWelcomePopup}
          >
            <div
              className={`bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                showWelcomePopup ? "animate-popup-enter" : "animate-popup-exit"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
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
                <div className="flex items-center gap-3 mb-4 text-pink-500">
                  <Smile size={30} className="text-pink-600" />
                  <h3 className="text-3xl font-extrabold text-gray-800">
                    Selamat Datang!
                  </h3>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {currentNews.title}
                </h4>

                <p
                  className="text-gray-600 mb-6"
                  dangerouslySetInnerHTML={{ __html: currentNews.description }}
                ></p>

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
        </>
      )}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-fade-in"
            onClick={handleCancelLogout}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle size={32} className="text-red-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                Keluar dari Akun?
              </h3>
              <p className="text-gray-600 text-center mb-8">
                Apakah Anda yakin ingin keluar dari akun SmartMom Anda?
              </p>
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
        </>
      )}

      {/* GLOBAL STYLES */}
      <style jsx global>{`
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

        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
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
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-popup-enter {
          animation: popup-enter 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-popup-exit {
          animation: fade-out 0.35s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Style untuk text bold berwarna pink */
        p b {
          color: #ec4899;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}