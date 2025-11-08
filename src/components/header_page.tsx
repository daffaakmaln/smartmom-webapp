"use client";

import { Bell, Crown } from "lucide-react";
import { useState } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  userName?: string; // Opsional, default "R"
  showSubscription?: boolean; // Opsional, default true
}

export default function PageHeader({ 
  title, 
  description, 
  userName = "R",
  showSubscription = true 
}: PageHeaderProps) {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleSubscribe = () => {
    setShowSubscriptionModal(true);
  };

  const closeModal = () => {
    setShowSubscriptionModal(false);
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
            {/* Subscription Button */}
            {showSubscription && (
              <button 
                onClick={handleSubscribe}
                className="flex items-center gap-1 lg:gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 lg:px-4 py-1.5 lg:py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Crown size={16} className="lg:hidden" />
                <Crown size={18} className="hidden lg:block" />
                <span className="text-xs lg:text-sm">Premium</span>
              </button>
            )}

            {/* Notification Button */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              {/* Badge notifikasi */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white text-xs lg:text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Modal */}
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon Premium */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Crown size={40} className="text-white" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                Upgrade ke Premium
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Dapatkan akses penuh ke semua fitur eksklusif SmartMom
              </p>

              {/* Benefits */}
              <div className="bg-yellow-50 rounded-2xl p-4 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Konsultasi ahli gizi tanpa batas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Artikel eksklusif dan panduan lengkap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Menu makanan personal dari ahli</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Tracking kesehatan premium</span>
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">Mulai dari</p>
                <p className="text-3xl font-bold text-gray-800">
                  Rp 99.000
                  <span className="text-lg text-gray-500 font-normal">/bulan</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Nanti Saja
                </button>
                <button
                  onClick={() => {
                    alert("Redirect ke halaman pembayaran");
                    closeModal();
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg"
                >
                  Langganan
                </button>
              </div>
            </div>
          </div>

          {/* CSS Animation */}
          <style jsx>{`
            @keyframes scale-in {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .animate-scale-in {
              animation: scale-in 0.2s ease-out;
            }
          `}</style>
        </>
      )}
    </>
  );
}