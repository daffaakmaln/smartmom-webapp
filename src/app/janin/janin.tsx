// app/perkembangan/janin/page.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Baby, Scale, RotateCw, Info, ArrowLeft, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function JaninPage() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const pregnancyData = {
    weeks: 28,
    days: 196,
    dueDate: "15 Maret 2026",
    daysUntilBirth: 84,
    fetalWeight: "1.2 kg",
    fetalLength: "37 cm",
    comparison: {
      fruit: "Terong Ungu Besar",
      emoji: "🍆",
      description: "Janin Anda sekarang seukuran terong ungu besar"
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
    setStartPos({ 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-purple-900">
            Visualisasi Janin 3D
          </h1>
          <p className="text-gray-600">Minggu ke-{pregnancyData.weeks} Kehamilan</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-700">Usia Kehamilan</h3>
          </div>
          <p className="text-3xl font-bold text-purple-900">{pregnancyData.weeks} Minggu</p>
          <p className="text-sm text-gray-500">{pregnancyData.days} hari</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Baby className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-700">Perkiraan Lahir</h3>
          </div>
          <p className="text-xl md:text-2xl font-bold text-pink-900">{pregnancyData.dueDate}</p>
          <p className="text-sm text-gray-500">HPL/EDD</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-700">Hitungan Mundur</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">{pregnancyData.daysUntilBirth}</p>
          <p className="text-sm text-gray-500">Hari lagi menuju kelahiran</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Visualization */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-xl font-bold text-gray-800">Model 3D Interaktif</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={resetRotation}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                <RotateCw className="w-4 h-4" />
                Reset
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <RotateCw className="w-4 h-4" />
                <span>Geser untuk memutar</span>
              </div>
            </div>
          </div>
          
          <div 
            ref={containerRef}
            className="relative bg-gradient-to-b from-pink-100 to-purple-100 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
            style={{ height: '500px' }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Fetus Model */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              }}
            >
              <svg width="300" height="400" viewBox="0 0 300 400" className="drop-shadow-2xl">
                {/* Body */}
                <ellipse cx="150" cy="200" rx="80" ry="120" fill="#ffc9d4" opacity="0.9"/>
                
                {/* Head */}
                <circle cx="150" cy="100" r="70" fill="#ffd4dc" opacity="0.95"/>
                
                {/* Eyes (closed) */}
                <ellipse cx="130" cy="90" rx="15" ry="8" fill="#ffb3c1" opacity="0.7"/>
                <ellipse cx="170" cy="90" rx="15" ry="8" fill="#ffb3c1" opacity="0.7"/>
                
                {/* Nose */}
                <ellipse cx="150" cy="105" rx="8" ry="12" fill="#ffb3c1" opacity="0.5"/>
                
                {/* Arms */}
                <ellipse cx="100" cy="220" rx="15" ry="60" fill="#ffc9d4" opacity="0.85" 
                  transform="rotate(-30 100 220)"/>
                <ellipse cx="200" cy="220" rx="15" ry="60" fill="#ffc9d4" opacity="0.85" 
                  transform="rotate(30 200 220)"/>
                
                {/* Legs */}
                <ellipse cx="130" cy="300" rx="18" ry="70" fill="#ffc9d4" opacity="0.85"/>
                <ellipse cx="170" cy="300" rx="18" ry="70" fill="#ffc9d4" opacity="0.85"/>
                
                {/* Umbilical cord */}
                <path d="M 150 250 Q 120 280 100 320" stroke="#e89fb5" strokeWidth="4" 
                  fill="none" opacity="0.6"/>
              </svg>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Rotation indicator */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-700">
              <p>Rotasi: X: {Math.round(rotation.x)}° Y: {Math.round(rotation.y)}°</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Berat Janin</p>
              <p className="text-2xl font-bold text-purple-900">{pregnancyData.fetalWeight}</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Panjang Janin</p>
              <p className="text-2xl font-bold text-pink-900">{pregnancyData.fetalLength}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              <Download className="w-5 h-5" />
              Simpan Gambar
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium">
              <Share2 className="w-5 h-5" />
              Bagikan
            </button>
          </div>
        </div>

        {/* Size Comparison & Info */}
        <div className="space-y-6">
          {/* Size Comparison */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Perbandingan Ukuran</h2>
            </div>
            
            <div className="text-center py-6">
              <div className="text-8xl mb-4 animate-bounce">
                {pregnancyData.comparison.emoji}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {pregnancyData.comparison.fruit}
              </h3>
              <p className="text-gray-600">
                {pregnancyData.comparison.description}
              </p>
            </div>
          </div>

          {/* Weekly Development */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Perkembangan Minggu Ini</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Janin dapat membuka dan menutup mata
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Otak berkembang sangat pesat
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Mulai mengatur suhu tubuh sendiri
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Paru-paru terus berkembang
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              💡 Tips Minggu Ini
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 flex-shrink-0">•</span>
                <span>Konsumsi makanan kaya zat besi untuk mencegah anemia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 flex-shrink-0">•</span>
                <span>Lakukan senam hamil ringan secara rutin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 flex-shrink-0">•</span>
                <span>Istirahat cukup dan tidur miring ke kiri</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}