"use client";
import Link from "next/link";
import HeroImageCarousel from "./carousel_hero";
import { useRef } from "react";

interface HeroProps {
  onScrollToFeature: () => void;
}

export default function Hero({ onScrollToFeature }: HeroProps) {
  const featureRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 py-12">
      {/* Left Side */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Merawat nutrisi ibu, <br /> dan menyiapkan masa depan
        </h1>
        <p className="text-gray-500 mb-6">
          Teman setia ibu untuk memahami gizi, menjaga ketenangan, dan merasa
          yakin selama kehamilan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/auth">
            <button className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              Mulai Sekarang →
            </button>
          </Link>
          <button
            onClick={onScrollToFeature}
            className="w-full sm:w-auto bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
          >
            Lihat Fitur
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex -space-x-3">
            <img
              src="/avatar1.png"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
              alt="Avatar 1"
            />
            <img
              src="/avatar2.png"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
              alt="Avatar 2"
            />
            <img
              src="/avatar3.png"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
              alt="Avatar 3"
            />
          </div>
          <div className="ml-0 sm:ml-0">
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              50.000+ ibu merasa lebih tenang
            </p>
            <p className="text-xs sm:text-sm text-gray-500">Rating ⭐ 4.9/5</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="mb-10 md:mb-0">
        <HeroImageCarousel />
      </div>
    </section>
  );
}