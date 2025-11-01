"use client";

import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat Datang, Ibu Rani 👋
        </h1>
        <p className="text-gray-500 text-sm">
          Pantau kesehatan dan nutrisi harianmu di sini
        </p>
      </div>

      {/* Tombol aksi */}
      <div className="flex gap-3 mt-3 sm:mt-0">
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
        <button className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition">
          + Tambah Catatan
        </button>
      </div>
    </div>
  );
}
