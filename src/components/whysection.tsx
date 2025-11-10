'use client';

import { Heart, Apple, Users, HeartPlus } from "lucide-react";

export default function Whysection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 md:px-20 py-16 bg-gray-50">
      {/* Left Image */}
      <div className="relative">
        <img
          src="/why1.png"
          alt="SmartMom"
          className="rounded-3xl shadow-lg w-[220px] md:w-[320px] object-cover"
        />

        {/* Tag label di kiri atas */}
        <div className="absolute top-4 left-4 bg-pink-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 shadow-md">
          <span className="bg-white/30 p-1 rounded-full">
            <HeartPlus size={16} />
          </span>
          Untuk Ibu
        </div>
      </div>

      {/* Right Text Content */}
      <div className="max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Mengapa <span className="text-pink-500">SmartMom?</span>
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Menjadi ibu sering kali penuh tanya dan cemas. Takut salah makan, 
          bingung percaya informasi, hingga khawatir membuat kesalahan kecil. 
          Kami ada bukan sekadar memberi informasi, tapi menemani rasa itu. 
          Di sini, ibu akan merasa dipahami dan tidak berjalan sendirian.
        </p>

        {/* Feature List */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
              <Heart size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                Pendampingan yang memahami rasa
              </h4>
              <p className="text-gray-600 text-sm">
                Panduan yang memperhatikan perasaan, bukan hanya data.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-full">
              <Apple size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                Nutrisi yang mudah dimengerti
              </h4>
              <p className="text-gray-600 text-sm">
                Gizi dijelaskan dengan bahasa sederhana dan nyata.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
              <Users size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                Ruang hangat untuk berbagi
              </h4>
              <p className="text-gray-600 text-sm">
                Tempat ibu bercerita dan merasa tidak sendiri.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
