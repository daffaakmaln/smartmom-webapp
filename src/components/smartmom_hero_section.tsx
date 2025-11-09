import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// import { i } from "framer-motion/client";

const SmartMomHeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-gray-50 to-pink-50 py-8 px-4 md:py-12 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-5 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Siap memulai perjalanan kehamilan yang penuh cinta?
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
              Jadikan SmartMom sahabat setiamu selama masa kehamilan. Bersama
              kami, setiap langkah menuju kelahiran buah hati terasa lebih
              ringan dan bermakna.
            </p>
            <Link href="/auth">
            <div className="flex justify-center md:justify-start">
              <button className="group bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm md:text-base">
                Mulai Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            </Link>
          </div>

          {/* Right Content - Image Card */}
          <div className="relative mt-6 md:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto md:max-w-none">
              {/* Actual Image */}
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                <img
                  src="/hero.jpg"
                  alt="Ibu hamil tersenyum memegang perutnya"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hashtag Badge */}
              <div className="bg-pink-100 text-center py-3">
                <span className="text-pink-500 font-semibold text-sm md:text-base">
                  #CareTodayGlowTomorrow
                </span>
              </div>
            </div>

            {/* Decorative Elements (opsional) */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-pink-200 rounded-full blur-xl opacity-40 -z-10 hidden md:block"></div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-purple-200 rounded-full blur-xl opacity-40 -z-10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartMomHeroSection;
