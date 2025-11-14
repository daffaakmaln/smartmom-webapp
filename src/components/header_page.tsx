"use client";

import { Bell, Crown, X, Heart, Calendar, MessageCircle, Award } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  userName?: string;
  showSubscription?: boolean;
  isPremium?: boolean;
}

// Dummy notification data
const dummyNotifications = [
  {
    id: 1,
    icon: <Heart size={20} className="text-pink-500" />,
    title: "Scan Nutrisi Berhasil!",
    message: "Makanan Anda mengandung 450 kalori dengan nutrisi seimbang.",
    time: "5 menit lalu",
    isRead: false,
  },
  {
    id: 2,
    icon: <Calendar size={20} className="text-blue-500" />,
    title: "Jadwal Kontrol Kehamilan",
    message: "Jangan lupa kontrol kehamilan Anda besok pukul 10.00 WIB.",
    time: "2 jam lalu",
    isRead: false,
  },
  {
    id: 3,
    icon: <MessageCircle size={20} className="text-green-500" />,
    title: "Pesan Baru dari dr. Sarah",
    message: "Hasil konsultasi Anda sudah tersedia, silakan cek di menu Konsultasi.",
    time: "5 jam lalu",
    isRead: true,
  },
  {
    id: 4,
    icon: <Award size={20} className="text-yellow-500" />,
    title: "Pencapaian Baru!",
    message: "Selamat! Anda telah mencatat jurnal kesehatan selama 7 hari berturut-turut.",
    time: "1 hari lalu",
    isRead: true,
  },
  {
    id: 5,
    icon: <Heart size={20} className="text-red-500" />,
    title: "Tips Nutrisi Hari Ini",
    message: "Jangan lupa konsumsi buah-buahan untuk asupan vitamin C yang cukup!",
    time: "2 hari lalu",
    isRead: true,
  },
];

export default function PageHeader({
  title,
  description,
  userName = "S",
  showSubscription = true,
  isPremium = false,
}: PageHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
              {title}
            </h1>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {showSubscription &&
              (isPremium ? (
                <div className="flex items-center gap-1 lg:gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 lg:px-4 py-1.5 lg:py-2 rounded-full font-semibold shadow-md">
                  <Crown size={16} className="lg:hidden" />
                  <Crown size={18} className="hidden lg:block" />
                  <span className="text-xs lg:text-sm">S-Mom Pro</span>
                </div>
              ) : (
                <Link
                  href="/subscription"
                  className="flex items-center gap-1 lg:gap-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white px-2 lg:px-4 py-1.5 lg:py-2 rounded-full font-semibold hover:from-pink-500 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Crown size={16} className="lg:hidden" />
                  <Crown size={18} className="hidden lg:block" />
                  <span className="text-xs lg:text-sm">Premium</span>
                </Link>
              ))}

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>


            <Link href="/pengaturan">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white text-xs lg:text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            </Link> 
            
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[80] animate-fade-in"
            onClick={handleCloseNotifications}
          />

          {/* Notification Dropdown */}
          <div className="fixed top-16 right-4 lg:right-6 w-[calc(100vw-2rem)] lg:w-96 bg-white rounded-2xl shadow-2xl z-[85] animate-slide-down max-h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Notifikasi</h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-gray-500">
                    {unreadCount} pesan belum dibaca
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-pink-600 hover:text-pink-700 font-semibold"
                  >
                    Tandai Semua
                  </button>
                )}
                <button
                  onClick={handleCloseNotifications}
                  className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Tidak ada notifikasi
                  </p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleMarkAsRead(notif.id)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notif.isRead ? "bg-pink-50/50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">{notif.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                            {notif.title}
                          </h4>
                          {!notif.isRead && (
                            <span className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <Link
                  href="#"
                  onClick={handleCloseNotifications}
                  className="block text-center text-sm text-pink-600 hover:text-pink-700 font-semibold"
                >
                  Lihat Semua Notifikasi
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      {/* Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}