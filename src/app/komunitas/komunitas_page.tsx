import React, { useState } from 'react';
import { Bell, Search, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import PageHeader from '@/components/header_page';

export default function KomunitasPage() {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sinta Wijaya',
        avatar: 'https://i.pravatar.cc/150?img=1',
        time: '2 jam lalu'
      },
      content: 'Halo ibu-ibu, saya sedang hamil 20 minggu. Ada yang punya pengalaman mengatasi kaki bengkak? Akhir-akhir ini kaki saya sering bengkak di malam hari. Terima kasih sebelumnya 🙏',
      likes: 12,
      comments: 8,
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'Rani Putri',
        avatar: 'https://i.pravatar.cc/150?img=5',
        time: '5 jam lalu'
      },
      content: 'Alhamdulillah hari ini scan USG dan dokter bilang perkembangan bayi sehat sempurna! Senang sekali rasanya. Semangat untuk semua ibu di sini, kita tidak sendiri ❤️',
      likes: 12,
      comments: 8,
      liked: true
    },
    {
      id: 3,
      user: {
        name: 'Maya Kusuma',
        avatar: 'https://i.pravatar.cc/150?img=9',
        time: '1 hari lalu'
      },
      content: 'Tips mengatasi morning sickness: Saya makan biskuit tawar sebelum bangun dari tempat tidur, minum air jahe hangat, dan makan dalam porsi kecil tapi sering. Semoga membantu! 💪',
      likes: 24,
      comments: 15,
      liked: false
    }
  ]);

  const topics = [
    { name: '#Nutrisi Trimester 1', posts: 145 },
    { name: '#Morning Sickness', posts: 98 },
    { name: '#Olahraga Hamil', posts: 87 },
    { name: '#Menu Sehat', posts: 65 }
  ];

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        user: {
          name: 'FutureMom',
          avatar: '/s.png',
          time: 'Baru saja'
        },
        content: postText,
        likes: 0,
        comments: 0,
        liked: false
      };
      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Header */}
      <PageHeader
        title="S-Moms Komunitas"
        description="Bergabunglah dengan komunitas ibu hamil untuk berbagi cerita, tips, dan dukungan."
        userName="SmartMom"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">S</span>
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <p className="font-semibold text-black">FutureMom</p>
                    <p className="text-xs text-gray-500">Postingan Terbaru</p>
                  </div>
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Bagikan cerita atau tanyakan sesuatu..."
                    rows={4}
                    className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none text-sm text-gray-700"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handlePost}
                      disabled={!postText.trim()}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all ${
                        postText.trim()
                          ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-md'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send size={16} />
                      Posting
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                {/* Post Header */}
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{post.user.name}</h3>
                    <p className="text-xs text-gray-500">{post.user.time}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors group"
                  >
                    <Heart
                      size={18}
                      className={post.liked ? 'fill-pink-500 text-pink-500' : ''}
                    />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors ml-auto">
                    <Share2 size={18} />
                    <span className="text-sm font-medium">Bagikan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 mb-4">Statistik Komunitas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Anggota</span>
                  <span className="font-bold text-pink-500">12,458</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Posting Hari Ini</span>
                  <span className="font-bold text-pink-500">234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Anggota Aktif</span>
                  <span className="font-bold text-pink-500">1,892</span>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 mb-4">Topik Populer</h3>
              <div className="space-y-3">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-800">{topic.name}</span>
                    <span className="text-xs text-gray-500">{topic.posts} post</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-md p-5 text-white">
              <h3 className="font-bold text-lg mb-3">Pedoman Komunitas</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Saling menghormati dan mendukung</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Berbagi informasi yang akurat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Jaga privasi diri dan orang lain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">✓</span>
                  <span>Hindari konten yang menyinggung</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}