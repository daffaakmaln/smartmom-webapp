'use client';
import React, { useState } from 'react';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analisis Gambar Makanan</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 h-64 object-cover rounded-xl shadow mb-4"
        />
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition"
      >
        {loading ? 'Menganalisis...' : 'Analisis Sekarang'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow w-full max-w-md text-left">
          <pre className="text-sm text-gray-700">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
