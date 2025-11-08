import React, { useState } from 'react';
import { ArrowLeft, Clock, User, CalendarDays, Star, ThumbsUp, MessageCircle } from 'lucide-react';

// Data Artikel Utama
const articleData = {
  id: 1,
  title: 'Nutrisi Penting di Trimester Pertama',
  category: 'Nutrisi',
  readTime: '5 menit baca',
  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  author: {
    name: 'Dr. Elina Halim, Sp.GK',
  },
  publishedDate: '5 November 2025',
  rating: 4.8,
  totalRatings: 342,
  totalLikes: 1240,
  totalComments: 89,
  content: `
    <p>Asam folat dan vitamin B12 memegang peranan krusial selama trimester pertama kehamilan. Kekurangan nutrisi ini dapat meningkatkan risiko cacat tabung saraf (neural tube defects) pada janin, seperti spina bifida, yang terjadi pada tahap sangat awal kehamilan.</p>
    
    <p>Oleh karena itu, pemenuhan nutrisi ini sangat penting bahkan sebelum Anda menyadari bahwa Anda hamil.</p>
    
    <h2>Mengapa Asam Folat Sangat Penting?</h2>
    <p>Asam folat, atau vitamin B9, adalah pahlawan dalam pembelahan sel dan pembentukan DNA. Pada 28 hari pertama setelah pembuahan, tabung saraf janin (yang akan menjadi otak dan sumsum tulang belakang) sedang berkembang pesat. Asam folat yang cukup membantu tabung saraf ini menutup dengan benar.</p>
    
    <h3>Sumber Asam Folat Terbaik:</h3>
    <ul>
      <li>Sayuran berdaun hijau tua (seperti bayam, brokoli, dan kale)</li>
      <li>Buah-buahan (terutama jeruk, lemon, dan alpukat)</li>
      <li>Kacang-kacangan (seperti kacang lentil dan buncis)</li>
      <li>Sereal dan roti yang difortifikasi (diperkaya)</li>
    </ul>
    <p>Meskipun bisa didapat dari makanan, dokter sering merekomendasikan suplemen asam folat untuk memastikan kecukupan harian tercapai.</p>

    <h2>Bagaimana dengan Vitamin B12?</h2>
    <p>Vitamin B12 bekerja sama dengan asam folat. Vitamin ini tidak hanya penting untuk sintesis DNA, tetapi juga untuk fungsi sistem saraf yang sehat dan pembentukan sel darah merah. Kekurangan B12 juga dapat berkontribusi pada risiko cacat tabung saraf.</p>

    <h3>Sumber Vitamin B12:</h3>
    <p>Vitamin B12 secara alami hampir secara eksklusif ditemukan dalam produk hewani. Ini bisa menjadi tantangan bagi ibu hamil vegetarian atau vegan.</p>
    <ul>
      <li>Daging tanpa lemak dan unggas</li>
      <li>Ikan (seperti salmon dan tuna)</li>
      <li>Telur</li>
      <li>Produk susu (susu, yogurt, dan keju)</li>
    </ul>
    <p>Bagi mereka yang tidak mengonsumsi produk hewani, susu nabati yang difortifikasi, sereal, atau suplemen B12 (setelah berkonsultasi dengan dokter) adalah solusi penting.</p>

    <h2>Poin Penting</h2>
    <p>Memulai kehamilan dengan status gizi yang baik adalah fondasi terbaik untuk Anda dan bayi Anda. Selalu konsultasikan kebutuhan nutrisi dan suplementasi spesifik Anda dengan dokter atau ahli gizi untuk mendapatkan rekomendasi yang tepat sesuai kondisi Anda.</p>
  `
};

// Data Komentar
const commentsData = [
  {
    id: 1,
    author: 'Siti Rahmawati',
    date: '6 November 2025',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Rahmawati&background=ec4899&color=fff',
    comment: 'Artikel yang sangat membantu! Saya sedang hamil 8 minggu dan baru tahu pentingnya asam folat sejak awal. Terima kasih dokter untuk informasinya.',
    likes: 24
  },
  {
    id: 2,
    author: 'Dewi Lestari',
    date: '6 November 2025',
    avatar: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=10b981&color=fff',
    comment: 'Sebagai vegetarian, saya sempat khawatir tentang vitamin B12. Sekarang lebih paham tentang alternatif yang bisa saya konsumsi. Sangat informatif!',
    likes: 18
  },
  {
    id: 3,
    author: 'Maya Putri',
    date: '5 November 2025',
    avatar: 'https://ui-avatars.com/api/?name=Maya+Putri&background=3b82f6&color=fff',
    comment: 'Penjelasannya mudah dipahami. Saya akan konsultasi dengan dokter saya tentang suplemen yang tepat. Terima kasih!',
    likes: 12
  }
];

// Data Artikel Lainnya
const relatedArticles = [
  {
    id: 2,
    title: 'Olahraga Aman untuk Ibu Hamil Trimester Pertama',
    category: 'Olahraga',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
    readTime: '4 menit baca',
    publishedDate: '4 November 2025'
  },
  {
    id: 3,
    title: 'Mengatasi Morning Sickness dengan Cara Alami',
    category: 'Kesehatan',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80',
    readTime: '6 menit baca',
    publishedDate: '3 November 2025'
  },
  {
    id: 4,
    title: 'Panduan Lengkap Pemeriksaan Kehamilan Pertama',
    category: 'Medis',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80',
    readTime: '7 menit baca',
    publishedDate: '2 November 2025'
  }
];

// Komponen Header
const ArticleDetailHeader = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center h-16">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Kembali</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen Utama
export default function ArticleDetailPage() {
  const article = articleData;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.totalLikes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Artikel tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      
      <ArticleDetailHeader />

      {/* Kontainer Utama */}
      <article className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        
        {/* Gambar Utama */}
        <div className="w-full h-64 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-10 lg:mb-12">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Konten Artikel */}
        <div className="max-w-3xl mx-auto">
          
          {/* Header Artikel */}
          <div className="mb-6">
            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {article.category}
            </span>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 my-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>{article.publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <hr className="mb-8 border-gray-200" />

          {/* Isi Artikel */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Rating & Interaksi */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              
              {/* Rating Bintang */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={star <= Math.round(article.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{article.rating}</span>
                <span className="text-sm text-gray-500">({article.totalRatings} rating)</span>
              </div>

              {/* Tombol Like & Komentar */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    liked ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ThumbsUp size={18} className={liked ? 'fill-white' : ''} />
                  <span className="font-medium">{likeCount}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle size={18} />
                  <span className="font-medium">{article.totalComments}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Komentar */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Komentar ({commentsData.length})
            </h2>
            
            {/* Form Komentar Baru */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <textarea
                placeholder="Tulis komentar Anda..."
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />
              <button className="mt-3 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors font-medium">
                Kirim Komentar
              </button>
            </div>

            {/* Daftar Komentar */}
            <div className="space-y-6">
              {commentsData.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-12 h-12 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                          <p className="text-sm text-gray-500">{comment.date}</p>
                        </div>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 transition-colors">
                          <ThumbsUp size={16} />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </article>

      {/* Artikel Lainnya */}
      <section className="bg-gray-50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            Artikel Lainnya
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <div 
                key={relatedArticle.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {relatedArticle.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{relatedArticle.readTime}</span>
                    </div>
                    <span>{relatedArticle.publishedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styling Global */}
      <style jsx global>{`
        .article-content {
          color: #374151;
        }
        .article-content p {
          font-size: 1.125rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .article-content ul {
          font-size: 1.125rem;
          line-height: 1.8;
          list-style-type: disc;
          padding-left: 1.75rem;
          margin-bottom: 1.5rem;
        }
        .article-content li {
          margin-bottom: 0.75rem;
        }
        .article-content a {
          color: #ec4899;
          text-decoration: underline;
        }
        .article-content a:hover {
          color: #d81b60;
        }
      `}</style>
    </div>
  );
}