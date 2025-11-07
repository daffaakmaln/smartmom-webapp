import Sidebar from "../dashboard/sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Header />

        {/* Status Section */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          <CardStatus title="Status Nutrisi Hari Ini" value="85%" note="Protein & Kalsium cukup" badge="Baik" />
          <CardStatus title="Berat Badan Terakhir" value="58.5 kg" note="+0.5 kg minggu ini" icon="scale" />
          <CardMenu />
          <CardStatus title="Artikel Rekomendasi" value="“Tips Mengatasi Mual di Trimester Pertama”" note="Baca Sekarang →" />
        </div>

        {/* Journal */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Jurnal Hari Ini</h2>
            <p className="text-gray-500 mb-4">Catat kondisi kesehatan Ibu</p>
            <button className="bg-pink-500 text-white px-5 py-2 rounded-xl hover:bg-pink-600">
              Tambah Catatan
            </button>
          </div>

          <div className="bg-pink-500 text-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Tips Hari Ini</h2>
            <p className="text-sm">
              “Minum air putih minimal 8 gelas sehari membantu melancarkan pencernaan dan menjaga kesehatan janin.”
            </p>
          </div>
        </div>

        {/* Aktivitas */}
        <div className="bg-white mt-8 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Hari Ini</h2>
          <div className="space-y-3">
            <div className="bg-pink-50 p-3 rounded-lg flex justify-between">
              <p>Scan AI Nutrisi - Nasi goreng sayur</p>
              <span className="text-gray-400 text-sm">2 jam lalu</span>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg flex justify-between">
              <p>Scan AI Nutrisi - Nasi goreng sayur</p>
              <span className="text-gray-400 text-sm">2 jam lalu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
