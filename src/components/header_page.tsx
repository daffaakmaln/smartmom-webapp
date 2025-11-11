"use client";

import { Bell, Crown } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  userName?: string;
  showSubscription?: boolean;
  isPremium?: boolean;
}

export default function PageHeader({
  title,
  description,
  userName = "R",
  showSubscription = false,
  isPremium = false,
}: PageHeaderProps) {
  return (
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
          {showSubscription && (
            isPremium ? (
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
            )
          )}

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <span className="text-white text-xs lg:text-sm font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
