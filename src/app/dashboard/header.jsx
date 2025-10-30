"use client";

import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat Datang, Nafine 👋
        </h1>
        <p className="text-gray-500 text-sm">
          Pantau kesehatan dan nutrisi harianmu di sini
        </p>
      </div>

      {/* Tombol aksi */}
      <div className="flex gap-3 mt-3 sm:mt-0">
        <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100 transition">
          <Search size={20} className="text-gray-700" />
        </button>
        <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100 transition relative">
          <Bell size={20} className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition">
          + Tambah Catatan
        </button>
      </div>
    </div>
  );
}
