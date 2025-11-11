import React, { useState } from 'react';
import { Bell, Search, Clock, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/header_page';
import Link from 'next/link';

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = [
    'Semua',
    'Nutrisi',
    'Mitos',
    'Tips Dokter',
    'Olahraga',
    'Mental Health'
  ];

  const articles = [
    {
      id: 1,
      title: 'Nutrisi Penting di Trimester Pertama',
      description: 'Asam folat dan vitamin B12 sangat penting untuk mencegah cacat tabung saraf pada janin. Pelajari makanan apa saja yang kaya akan nutrisi ini.',
      category: 'Nutrisi',
      readTime: '5 menit baca',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Mitos: Makan untuk Dua Orang',
      description: 'Benarkah ibu hamil harus makan porsi dua kali lipat? Dokter menjelaskan fakta...',
      category: 'Mitos',
      readTime: '4 menit',
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80'
    },
    {
      id: 3,
      title: 'Tips Mengatasi Mual di Pagi Hari',
      description: 'Morning sickness adalah hal yang umum, namun ada cara untuk menguranginya...',
      category: 'Tips Dokter',
      readTime: '4 menit',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80'
    },
    {
      id: 4,
      title: 'Olahraga Aman untuk Ibu Hamil',
      description: 'Tetap aktif selama kehamilan sangat bermanfaat. Pelajari jenis olahraga yang aman dan...',
      category: 'Olahraga',
      readTime: '4 menit',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
    },
    {
      id: 5,
      title: 'Makanan Tinggi Zat Besi',
      description: 'Cegah anemia dengan konsumsi makanan kaya zat besi seperti daging merah, bayam...',
      category: 'Nutrisi',
      readTime: '6 menit',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80'
    },
    {
      id: 6,
      title: 'Mengelola Stres Saat Hamil',
      description: 'Kesehatan mental sama pentingnya dengan kesehatan fisik. Pelajari teknik relaksasi...',
      category: 'Mental Health',
      readTime: '5 menit',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'
    },
    {
      id: 7,
      title: 'Mitos: Tidak Boleh Makan Pedas',
      description: 'Apakah benar makanan pedas berbahaya untuk ibu hamil? Simak penjelasan dokter...',
      category: 'Mitos',
      readTime: '3 menit',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80'
    },
    {
      id: 8,
      title: 'Yoga untuk Kehamilan Sehat',
      description: 'Yoga prenatal membantu meningkatkan fleksibilitas dan mengurangi ketegangan...',
      category: 'Olahraga',
      readTime: '5 menit',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'
    }
  ];

  const filteredArticles = activeCategory === 'Semua' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Header */}
      <PageHeader 
        title="Artikel Kehamilan & Nutrisi"
        description="Informasi terpercaya untuk perjalanan kehamilan yang lebih tenang"
        userName="SmartMom"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Categories Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {activeCategory === 'Semua' && featuredArticle && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredArticle.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock size={16} />
                      <span className="text-sm">{featuredArticle.readTime}</span>
                    </div>
                    <Link href="/artikel_detail">
                    <button className="flex items-center gap-2 text-pink-500 font-semibold hover:gap-3 transition-all">
                      Baca Selengkapnya
                      <ArrowRight size={18} />
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${
                    article.category === 'Nutrisi' ? 'bg-green-500' :
                    article.category === 'Mitos' ? 'bg-orange-500' :
                    article.category === 'Tips Dokter' ? 'bg-blue-500' :
                    article.category === 'Olahraga' ? 'bg-purple-500' :
                    'bg-indigo-500'
                  }`}>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={14} />
                    <span className="text-xs">{article.readTime}</span>
                  </div>
                  <button className="text-pink-500 text-sm font-semibold hover:underline">
                    Baca →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada artikel</h3>
            <p className="text-gray-600">Belum ada artikel untuk kategori ini</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}