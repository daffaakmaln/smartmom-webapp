"use client";


export default function ActivityList() {
  const activities = [
    { text: "Scan AI Nutrisi - Nasi goreng sayur", time: "2 jam lalu" },
    { text: "Update Jurnal Kesehatan", time: "5 jam lalu" },
    { text: "Membaca artikel 'Trimester Kedua'", time: "Kemarin" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Aktivitas Terbaru</h2>
      <div className="space-y-3">
        {activities.map((item, idx) => (
          <div key={idx} className="bg-pink-50 p-3 rounded-lg flex justify-between items-center">
            <p className="text-sm text-gray-700">{item.text}</p>
            <span className="text-xs text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
