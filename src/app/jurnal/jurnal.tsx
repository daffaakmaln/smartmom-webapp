import React, { useState } from 'react';
import { Bell, Search, Calendar, TrendingUp, Info } from 'lucide-react';

export default function Jurnal() {
  const [formData, setFormData] = useState({
    weight: '',
    bloodPressure: '',
    sleepHours: '',
    notes: ''
  });

  const [weekSummary] = useState({
    entriesCount: 5,
    weightChange: 0.5,
    avgSleep: 7.5
  });

  const [history] = useState([
    {
      date: 'Kemarin, 9 Oktober 2025',
      weight: 58.5,
      bloodPressure: '120/80',
      sleep: 7.5,
      notes: 'Merasa segar, nafsu makan baik'
    },
    {
      date: 'Senin, 7 Oktober 2025',
      weight: 58.3,
      bloodPressure: '118/78',
      sleep: 8,
      notes: 'Tidur nyenyak malam ini'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({
      weight: '',
      bloodPressure: '',
      sleepHours: '',
      notes: ''
    });
    alert('Catatan berhasil disimpan!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Jurnal Kehamilan</h1>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">
              Catat perkembangan kesehatan ibu setiap hari untuk pemantauan yang lebih baik
            </p>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden lg:block">
              <Search size={20} className="text-gray-600" />
            </button>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-semibold">R</span>
            </div>
          </div> 
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Input */}
            <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">Tambah Catatan Hari Ini</h2>
              
              <div className="space-y-4 lg:space-y-5">
                {/* Berat Badan */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Berat Badan (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  placeholder="58.5"
                  className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
                </div>

                {/* Tekanan Darah */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tekanan Darah (mmHg)
                </label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  placeholder="120/80"
                  className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
                </div>

                {/* Jam Tidur */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Tidur (jam)
                </label>
                <input
                  type="number"
                  name="sleepHours"
                  value={formData.sleepHours}
                  onChange={handleInputChange}
                  step="0.5"
                  placeholder="7.5"
                  className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
                </div>

                {/* Catatan/Keluhan */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan / Keluhan
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tulis catatan atau keluhan ibu hari ini..."
                  className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
                >
                  Simpan Catatan
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Summary */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-md p-5 lg:p-6 text-white">
              <h3 className="font-bold text-base lg:text-lg mb-4">Ringkasan Minggu Ini</h3>
              
              <div className="space-y-3">
                <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-sm opacity-90">Catatan Dibuat</p>
                  <p className="text-2xl font-bold">{weekSummary.entriesCount}/7</p>
                </div>

                <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-sm opacity-90">Rata-rata Tidur</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{weekSummary.avgSleep} jam</p>
                  </div>
                </div>

                <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-sm opacity-90">Perubahan BB</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} />
                    <p className="text-2xl font-bold">+{weekSummary.weightChange} kg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-pink-50 rounded-2xl shadow-sm border border-pink-100 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Tips</h4>
                  <p className="text-sm text-gray-600">
                    Catat jurnal secara konsisten setiap hari untuk pemantauan kesehatan yang optimal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="mt-8">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Riwayat Catatan</h2>
          
          <div className="space-y-4">
            {history.map((entry, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">{entry.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-4">
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Berat Badan</p>
                    <p className="text-base lg:text-lg font-bold text-gray-800">{entry.weight} kg</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Tekanan Darah</p>
                    <p className="text-base lg:text-lg font-bold text-gray-800">{entry.bloodPressure}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Jam Tidur</p>
                    <p className="text-base lg:text-lg font-bold text-gray-800">{entry.sleep} jam</p>
                  </div>
                </div>

                {entry.notes && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm text-gray-700">{entry.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    );
}

