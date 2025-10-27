import { Home, Book, Users, Settings, Activity, Apple, MessageCircle } from "lucide-react";

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
  return (
    <div className="w-64 bg-pink-500 text-white p-6 flex flex-col rounded-r-3xl">
      <h1 className="text-2xl font-bold mb-10">SmartMom</h1>
      <nav className="space-y-3">
        {menu.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-400 cursor-pointer">
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
