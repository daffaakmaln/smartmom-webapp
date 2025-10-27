"use client";

import { useState, useEffect } from "react";

export default function HeroImageCarousel() {
  const images = ["/mom1.jpg", "/mom2.jpg", "/mom3.jpg"]; // foto
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide  3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-[350px] aspect-[3/4] overflow-hidden rounded-3xl shadow-lg">
      <div
        className="flex transition-transform duration-[1500ms] ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`SmartMom ${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigasi kecil di bawah */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${
                currentIndex === index ? "bg-pink-500 scale-125" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
