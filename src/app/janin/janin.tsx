"use client";
import { useRef } from 'react';
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Calendar, Baby, Scale, RotateCw, Info, ArrowLeft, Download, Share2 } from 'lucide-react';
import PageHeader from '@/components/header_page';

// Component untuk load model GLB
function FetalModel({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} scale={2.5} position={[0, -1, 0]} />;
}

// Loading placeholder
function LoadingPlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ffc9d4" opacity={0.5} transparent />
    </mesh>
  );
}

export default function JaninPage() {
  const [modelPath] = useState('/model/fetus.glb'); // Path ke file GLB Anda
  const controlsRef = useRef<any>(null);

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

  const resetCamera = () => {
    if (controlsRef.current) {
      // Try calling reset on OrbitControls if available, then re-center target and update.
      controlsRef.current.reset?.();
      if (controlsRef.current.target?.set) controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update?.();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header with Back Button */}
      <PageHeader
        title="Visualisasi Janin 3D"
        description={`Minggu ke-${pregnancyData.weeks} Kehamilan`}
        userName="SmartMom"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pt-4">
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
                onClick={resetCamera}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                <RotateCw className="w-4 h-4" />
                Reset
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <RotateCw className="w-4 h-4" />
                <span>Drag untuk memutar</span>
              </div>
            </div>
          </div>
          
          <div 
            className="relative bg-gradient-to-b from-pink-100 to-purple-100 rounded-xl overflow-hidden"
            style={{ height: '500px' }}
          >
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              
              {/* Lighting */}
              <ambientLight intensity={0.6} />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={0.8} 
                castShadow 
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <spotLight position={[-5, 5, 2]} intensity={0.3} />
              
              {/* Environment for reflections */}
              <Environment preset="sunset" />
              
              {/* 3D Model */}
              <Suspense fallback={<LoadingPlaceholder />}>
                <FetalModel modelPath={modelPath} />
                <OrbitControls 
                  ref={controlsRef}
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={2}
                  maxDistance={10}
                  autoRotate={false}
                  autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>

            {/* Instructions overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-700">
              <p>🖱️ Klik & drag untuk memutar</p>
              <p>🔍 Scroll untuk zoom</p>
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