import React, { useState } from 'react';
import { Bell, Search, Star, Clock, MessageCircle, Video } from 'lucide-react';
import PageHeader from '@/components/header_page';

export default function KonsultasiPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'Dokter Kandungan', 'Ahli Gizi', 'Tersedia Sekarang'];

  const doctors = [
    {
      id: 1,
      name: 'dr. Sarah Amelia, Sp.OG',
      specialty: 'Dokter Kandungan',
      experience: '12 tahun pengalaman',
      rating: 4.9,
      reviews: 245,
      tags: ['Kehamilan Risiko Tinggi', 'USG 4D', 'Konsultasi Nutrisi'],
      price: 150000,
      availability: 'Tersedia Hari ini, 14:00 WIB',
      isOnline: true,
      avatar: 'SA'
    },
    {
      id: 2,
      name: 'dr. Sarah Amelia, Sp.OG',
      specialty: 'Dokter Kandungan',
      experience: '12 tahun pengalaman',
      rating: 4.9,
      reviews: 245,
      tags: ['Kehamilan Risiko Tinggi', 'USG 4D', 'Konsultasi Nutrisi'],
      price: 150000,
      availability: 'Tersedia Hari ini, 14:00 WIB',
      isOnline: true,
      avatar: 'SA'
    },
    {
      id: 3,
      name: 'dr. Sarah Amelia, Sp.OG',
      specialty: 'Dokter Kandungan',
      experience: '12 tahun pengalaman',
      rating: 4.9,
      reviews: 245,
      tags: ['Kehamilan Risiko Tinggi', 'USG 4D', 'Konsultasi Nutrisi'],
      price: 150000,
      availability: 'Tersedia Hari ini, 14:00 WIB',
      isOnline: true,
      avatar: 'SA'
    },
    {
      id: 4,
      name: 'dr. Maya Kusuma, Sp.GK',
      specialty: 'Ahli Gizi',
      experience: '8 tahun pengalaman',
      rating: 4.8,
      reviews: 189,
      tags: ['Diet Kehamilan', 'Nutrisi Trimester', 'Menu Sehat'],
      price: 120000,
      availability: 'Tersedia Hari ini, 15:00 WIB',
      isOnline: true,
      avatar: 'MK'
    },
    {
      id: 5,
      name: 'dr. Rani Putri, Sp.OG',
      specialty: 'Dokter Kandungan',
      experience: '15 tahun pengalaman',
      rating: 5.0,
      reviews: 312,
      tags: ['Persalinan Normal', 'Caesar', 'USG'],
      price: 180000,
      availability: 'Tersedia Besok, 09:00 WIB',
      isOnline: false,
      avatar: 'RP'
    }
  ];

  const filteredDoctors = activeFilter === 'Semua' 
    ? doctors 
    : activeFilter === 'Tersedia Sekarang'
    ? doctors.filter(doc => doc.isOnline)
    : doctors.filter(doc => doc.specialty === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Header */}
      <PageHeader 
        title="Konsultasi dengan Ahli"
        description="Tanya langsung kepada dokter kandungan dan ahli gizi berpengalaman"
        userName="SmartMom"
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-pink-200 hover:border-pink-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Doctor Avatar */}
                <div className="flex lg:block items-start gap-4">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl lg:text-2xl font-bold">{doctor.avatar}</span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                        {doctor.isOnline && (
                          <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Online
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{doctor.specialty}</p>
                      <p className="text-xs text-gray-500">{doctor.experience}</p>
                    </div>
                    <div className="text-left lg:text-right">
                      <p className="text-2xl font-bold text-pink-500">Rp {doctor.price.toLocaleString('id-ID')}</p>
                      <p className="text-xs text-gray-500">per sesi</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-800">{doctor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({doctor.reviews} ulasan)</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-pink-50 text-pink-600 text-xs font-medium px-3 py-1 rounded-full border border-pink-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Availability & Actions */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span className="text-sm">{doctor.availability}</span>
                    </div>
                    <div className="flex gap-2 w-full lg:w-auto">
                      <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-pink-500 text-pink-500 rounded-xl hover:bg-pink-50 transition-colors font-medium text-sm">
                        <MessageCircle size={16} />
                        Chat
                      </button>
                      <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-md font-medium text-sm">
                        <Video size={16} />
                        Booking Konsultasi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada dokter tersedia</h3>
            <p className="text-gray-600">Coba ubah filter pencarian Anda</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}