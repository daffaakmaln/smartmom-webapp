"use client";
import { useState } from "react";
import {
  Home,
  Book,
  Users,
  Settings,
  Activity,
  Apple,
  MessageCircle,
  Menu,
  X,
  Bell,
  Search,
  User,
} from "lucide-react";

const menu = [
  { name: "Beranda", icon: <Home size={20} /> },
  { name: "Scan AI Nutrisi", icon: <Apple size={20} /> },
  { name: "Menu Harian", icon: <Activity size={20} /> },
  { name: "Jurnal Kesehatan", icon: <Book size={20} /> },
  { name: "Artikel & Edukasi", icon: <Book size={20} /> },
  { name: "Komunitas Ibu", icon: <Users size={20} /> },
  { name: "Konsultasi", icon: <MessageCircle size={20} /> },
  { name: "Pengaturan Akun", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <>
      {/* Sidebar Desktop */}
      <div className="hidden lg:flex fixed w-64 bg-gradient-to-b from-pink-500 to-pink-600 text-white p-6 flex-col rounded-r-3xl h-screen shadow-xl z-50">
        <h1 className="text-2xl font-bold mb-10">SmartMom</h1>
        <nav className="space-y-2">
          {menu.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveMenu(idx)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                activeMenu === idx
                  ? "bg-white text-pink-500 shadow-md"
                  : "hover:bg-pink-400/50"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 flex justify-around py-2 px-2 shadow-lg z-50">
        {menu.slice(0, 4).map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveMenu(idx)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              activeMenu === idx ? "text-pink-500 bg-pink-50" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">
              {item.name.split(" ")[0]}
            </span>
          </button>
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
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl z-50 lg:hidden animate-slide-up"
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
                <div
                  key={idx}
                  onClick={() => {
                    setActiveMenu(idx + 4);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    activeMenu === idx + 4
                      ? "bg-pink-500 text-white shadow-md"
                      : "bg-pink-50 text-gray-800 hover:bg-pink-100"
                  }`}
                >
                  <span
                    className={
                      activeMenu === idx + 4 ? "text-white" : "text-pink-500"
                    }
                  >
                    {item.icon}
                  </span>
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      
    </>
  );
}
