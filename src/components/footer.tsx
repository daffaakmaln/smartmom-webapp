import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 ">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" className="w-10 h-10 rounded-full border-2 border-white" alt="logo" />
            <span className="text-lg font-semibold text-gray-900">SmartMom</span>
          </div>
          <p className="text-sm leading-relaxed">
            Platform kesehatan ibu hamil dengan AI nutrisi, jurnal kesehatan, dan konsultasi ahli.
          </p>
        </div>

        {/* Produk */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Produk</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition">Scan AI Nutrisi</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Menu Harian</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Jurnal Kesehatan</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Konsultasi Ahli</a></li>
          </ul>
        </div>

        {/* Perusahaan */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Perusahaan</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Karir</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Blog</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Kontak</a></li>
          </ul>
        </div>

        {/* Dukungan */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Dukungan</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition">Pusat Bantuan</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Syarat & Ketentuan</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2025 SmartMom. Semua hak dilindungi.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-pink-500 transition"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-500 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-500 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-500 transition"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
