"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
} from "lucide-react";

const menu = [
  { name: "Beranda", icon: <Home size={20} />, href: "/dashboard" },
  { name: "Scan AI Nutrisi", icon: <ScanHeart size={20} />, href: "/scan" },
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

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Gunakan pathname untuk mendeteksi halaman aktif

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

        {/* Logout Button */}
        <button
          onClick={() => {
            // Tambahkan logika logout di sini
            console.log("Logout clicked");
          }}
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

              {/* 🔥 Logout Button di Drawer */}
              <button
                onClick={() => {
                  console.log("Logout clicked");
                  setOpen(false);
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
    </>
  );
}
