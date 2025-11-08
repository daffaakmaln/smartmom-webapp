import React, { useState } from 'react';
import { Bell, Search, User, Mail, Phone, Calendar, MapPin, Lock, Shield, Globe, Moon, Sun, ChevronRight, Camera, Save } from 'lucide-react';
import PageHeader from '@/components/header_page';

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState('profil');
  const [isDarkMode, setIsDarkMode] = useState(false);
  type NotificationKey = 'appointment' | 'article' | 'community' | 'health';
  const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
    appointment: true,
    article: true,
    community: false,
    health: true
  });
  
  const [profileData, setProfileData] = useState({
    name: 'Ibu Rani',
    email: 'iburani@email.com',
    phone: '081234567890',
    birthDate: '1990-05-15',
    address: 'Jl. Kenangan No. 123, Jakarta Selatan',
    pregnancyWeek: 24,
    dueDate: '2025-03-15'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profil', label: 'Profil Saya', icon: <User size={18} /> },
    { id: 'keamanan', label: 'Keamanan', icon: <Lock size={18} /> },
    { id: 'notifikasi', label: 'Notifikasi', icon: <Bell size={18} /> },
    { id: 'preferensi', label: 'Preferensi', icon: <Globe size={18} /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (key: NotificationKey) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveProfile = () => {
    alert('Profil berhasil disimpan!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Password baru tidak cocok!');
      return;
    }
    alert('Password berhasil diubah!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Header */}
      <PageHeader
        title="Pengaturan Akun"
        description="Kelola informasi pribadi dan preferensi akun Anda"
        userName="Rani"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                    activeTab === tab.id
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                  <ChevronRight size={16} className="ml-auto" />
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-md p-5 text-white">
              <h3 className="font-bold text-lg mb-3">Info Kehamilan</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Minggu ke</span>
                  <span className="text-2xl font-bold">{profileData.pregnancyWeek}</span>
                </div>
                <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-xs opacity-90 mb-1">Perkiraan Lahir</p>
                  <p className="font-semibold">{new Date(profileData.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profil Tab */}
            {activeTab === 'profil' && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Foto Profil</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">IR</span>
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors shadow-md">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{profileData.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">Bergabung sejak Januari 2025</p>
                      <button className="text-sm text-pink-500 font-medium hover:underline">
                        Ubah Foto
                      </button>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-black mb-4">Informasi Pribadi</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Lahir
                      </label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="birthDate"
                          value={profileData.birthDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-black"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alamat
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none text-black"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="mt-6 w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-md font-medium"
                  >
                    <Save size={18} />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {/* Keamanan Tab */}
            {activeTab === 'keamanan' && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Lock size={20} className="text-pink-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">Ubah Password</h2>
                      <p className="text-sm text-gray-500">Pastikan password Anda kuat dan aman</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Lama
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Masukkan password lama"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Masukkan password baru"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Konfirmasi password baru"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <button
                      onClick={handleChangePassword}
                      className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-md font-medium"
                    >
                      <Lock size={18} />
                      Ubah Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield size={20} className="text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-800">Autentikasi Dua Faktor</h2>
                      <p className="text-sm text-gray-500">Tingkatkan keamanan akun Anda</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Dengan mengaktifkan autentikasi dua faktor, akun Anda akan lebih aman. Setiap kali login, Anda akan menerima kode verifikasi melalui SMS.
                  </p>
                </div>

                {/* Login History */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Riwayat Login</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Jakarta, Indonesia</p>
                        <p className="text-xs text-gray-500">Chrome on Windows • IP: 103.xxx.xxx.xxx</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Aktif sekarang</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">Jakarta, Indonesia</p>
                        <p className="text-xs text-gray-500">Safari on iPhone • 2 hari lalu</p>
                      </div>
                      <button className="text-xs text-red-600 font-medium hover:underline">Logout</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifikasi Tab */}
            {activeTab === 'notifikasi' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Pengaturan Notifikasi</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Kelola notifikasi yang ingin Anda terima dari SmartMom
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-gray-800">Pengingat Janji Temu</h3>
                      <p className="text-sm text-gray-500">Dapatkan notifikasi untuk jadwal konsultasi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.appointment}
                        onChange={() => handleNotificationToggle('appointment')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-gray-800">Artikel Baru</h3>
                      <p className="text-sm text-gray-500">Notifikasi saat ada artikel kesehatan baru</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.article}
                        onChange={() => handleNotificationToggle('article')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-gray-800">Aktivitas Komunitas</h3>
                      <p className="text-sm text-gray-500">Notifikasi komentar dan balasan di komunitas</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.community}
                        onChange={() => handleNotificationToggle('community')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-gray-800">Tips Kesehatan Harian</h3>
                      <p className="text-sm text-gray-500">Terima tips kesehatan setiap hari</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.health}
                        onChange={() => handleNotificationToggle('health')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Preferensi Tab */}
            {activeTab === 'preferensi' && (
              <div className="space-y-6">
                {/* Language & Region */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Bahasa & Region</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bahasa
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all">
                        <option>Bahasa Indonesia</option>
                        <option>English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zona Waktu
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all">
                        <option>WIB (GMT+7)</option>
                        <option>WITA (GMT+8)</option>
                        <option>WIT (GMT+9)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Theme */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Tampilan</h2>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? <Moon size={20} className="text-gray-600" /> : <Sun size={20} className="text-yellow-500" />}
                      <div>
                        <h3 className="font-semibold text-gray-800">Mode Gelap</h3>
                        <p className="text-sm text-gray-500">Aktifkan tema gelap untuk kenyamanan mata</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(!isDarkMode)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>

                {/* Privacy */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Privasi</h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-800">Unduh Data Saya</span>
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-800">Kebijakan Privasi</span>
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-800">Syarat & Ketentuan</span>
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 rounded-2xl shadow-sm border border-red-200 p-6">
                  <h2 className="text-lg font-bold text-red-600 mb-4">Zona Berbahaya</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Tindakan berikut bersifat permanen dan tidak dapat dibatalkan
                  </p>
                  <button className="w-full lg:w-auto px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md font-medium">
                    Hapus Akun
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
