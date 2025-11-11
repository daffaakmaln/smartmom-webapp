// smartmom-webapp/src/app/generate/page.tsx

"use client";

import { useState } from "react";
import axios from 'axios';
import { 
    RefreshCw, 
    Zap, 
    ChevronDown, 
    AlertTriangle,
    Flame, 
    Beef, 
    Droplet, 
    Fish, 
    Check
} from "lucide-react";

// --- INTERFACE DARI BACKEND (Single SlotMenu) ---
interface MakroDetail { kalori: number; protein: number; lemak: number; karbo: number; }
interface SlotMenu { 
    nama_menu: string; 
    deskripsi: string; 
    nutrisi: MakroDetail; 
    manfaat: {teks: string}[]; // Menggunakan array of object teks
    url_gambar: string; 
}
// Catatan: Interface MenuHarianResponse TIDAK lagi digunakan di halaman ini.
// --- END INTERFACE ---

// Ganti API URL ke endpoint SINGLE MENU
const API_URL_SINGLE = "http://localhost:8000/api/generate-single-menu"; 

const SlotOptions = ["Sarapan", "Siang", "Malam"];

const SlotIconMap: { [key: string]: string } = {
    "Sarapan": "🥣", 
    "Siang": "⭐", 
    "Malam": "🍽️"
};


// Komponen Pembantu untuk Input Numerik
const MacroInput: React.FC<{
    label: string;
    icon: React.ElementType;
    value: number;
    unit: string;
    onChange: (value: number) => void;
    colorClass: string;
}> = ({ label, icon: Icon, value, unit, onChange, colorClass }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <label className="block text-xs font-semibold text-gray-500 mb-2">{label}</label>
        <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {/* <Icon size="16" className="text-white" /> */}
            </div>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                className="w-full text-xl font-bold text-gray-800 focus:outline-none"
                min="0"
            />
            <span className="text-sm font-medium text-gray-500">{unit}</span>
        </div>
    </div>
);


export default function GenerateMenuPage() {
    // State untuk input
    const [selectedSlot, setSelectedSlot] = useState<string>("Sarapan");
    const [calorieLimit, setCalorieLimit] = useState(350);
    const [proteinTarget, setProteinTarget] = useState(25);
    const [showAdvanced, setShowAdvanced] = useState(false);
    
    // State untuk hasil
    const [generatedMenu, setGeneratedMenu] = useState<SlotMenu | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        setGeneratedMenu(null); 

        try {
            // KIRIM HANYA SATU REQUEST ke endpoint baru
            const requestBody = {
                slot_to_generate: selectedSlot,
                calorie_limit: calorieLimit, 
                // Protein, Lemak, Karbo dapat ditambahkan di sini jika backend diupdate
            };

            const response = await axios.post<SlotMenu>(API_URL_SINGLE, requestBody);
            
            // Set hasil menu tunggal
            setGeneratedMenu(response.data);

        } catch (err) {
            console.error("Kesalahan Generasi Menu:", err);
            setError("Gagal menghubungi server AI. Pastikan FastAPI berjalan di /api/generate-single-menu.");
        } finally {
            setIsGenerating(false);
        }
    };

    const isInputValid = calorieLimit > 100;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-xl mx-auto px-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
                    <Zap size={28} className="text-pink-600 fill-pink-600" />
                    Generator Menu AI Tunggal
                </h1>
                <p className="text-gray-500 mb-8">
                    Ciptakan ide menu baru yang disesuaikan dengan waktu makan dan target kalori Anda.
                </p>

                {/* Input Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Atur Kriteria Menu</h2>
                    
                    <div className="space-y-4">
                        {/* Slot Selector */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2">Pilih Waktu Makan</label>
                            <select
                                value={selectedSlot}
                                onChange={(e) => setSelectedSlot(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl text-lg font-medium focus:ring-pink-500 focus:border-pink-500"
                            >
                                {SlotOptions.map(slot => (
                                    <option key={slot} value={slot}>
                                        {SlotIconMap[slot]} {slot}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <MacroInput
                                label="Target Kalori (Kkal)"
                                icon={Flame}
                                value={calorieLimit}
                                unit="kkal"
                                onChange={setCalorieLimit}
                                colorClass="bg-red-500"
                            />
                            <MacroInput
                                label="Protein Target (g)"
                                icon={Beef}
                                value={proteinTarget}
                                unit="g"
                                onChange={setProteinTarget}
                                colorClass="bg-pink-500"
                            />
                        </div>
                    </div>
                    
                    {/* Advanced Filters Toggle */}
                    <button 
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="mt-4 flex items-center text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
                    >
                        Filter Lanjutan 
                        <ChevronDown size={16} className={`ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Advanced Filters Content */}
                    {showAdvanced && (
                        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                            <MacroInput
                                label="Lemak Maksimum (g)"
                                icon={Droplet}
                                value={30} // Placeholder
                                unit="g"
                                onChange={() => {}}
                                colorClass="bg-orange-500"
                            />
                            <MacroInput
                                label="Batasan Karbo (g)"
                                icon={Fish}
                                value={180} // Placeholder
                                unit="g"
                                onChange={() => {}}
                                colorClass="bg-blue-500"
                            />
                        </div>
                    )}
                    
                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !isInputValid}
                        className={`w-full mt-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center ${
                            isInputValid && !isGenerating
                                ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-xl'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                    >
                        {isGenerating ? (
                            <RefreshCw size={20} className="mr-2 animate-spin" />
                        ) : (
                            <Zap size={20} className="mr-2" />
                        )}
                        {isGenerating ? 'Menghasilkan...' : `Generate Menu ${SlotIconMap[selectedSlot]}`}
                    </button>
                </div>

                {/* Hasil dan Error Display */}
                {error && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center mb-6">
                        <AlertTriangle size={20} className="mr-3 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                {generatedMenu && (
                    <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-pink-500">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {SlotIconMap[selectedSlot]} {generatedMenu.nama_menu}
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{generatedMenu.deskripsi}</p>
                        
                        {/* Image */}
                        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 shadow-inner">
                            <img 
                                key={generatedMenu.url_gambar} 
                                src={generatedMenu.url_gambar}
                                alt={generatedMenu.nama_menu} 
                                className="w-full h-full object-cover" 
                            />
                        </div>

                        {/* Nutrisi Detail */}
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Detail Gizi:</h3>
                        <div className="grid grid-cols-4 gap-2 text-center text-sm mb-4">
                            <div className="bg-red-50 p-2 rounded-lg font-medium">
                                <p className="text-gray-800">{generatedMenu.nutrisi.kalori.toFixed(0)}</p>
                                <p className="text-red-500 text-xs">Kkal</p>
                            </div>
                            <div className="bg-pink-50 p-2 rounded-lg font-medium">
                                <p className="text-gray-800">{generatedMenu.nutrisi.protein.toFixed(1)}</p>
                                <p className="text-pink-500 text-xs">Prot (g)</p>
                            </div>
                            <div className="bg-orange-50 p-2 rounded-lg font-medium">
                                <p className="text-gray-800">{generatedMenu.nutrisi.lemak.toFixed(1)}</p>
                                <p className="text-orange-500 text-xs">Lemak (g)</p>
                            </div>
                            <div className="bg-blue-50 p-2 rounded-lg font-medium">
                                <p className="text-gray-800">{generatedMenu.nutrisi.karbo.toFixed(1)}</p>
                                <p className="text-blue-500 text-xs">Karbo (g)</p>
                            </div>
                        </div>

                        {/* Manfaat */}
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Manfaat Utama:</h3>
                        <div className="flex flex-wrap gap-2">
                            {generatedMenu.manfaat.map((benefit, idx) => (
                                <span 
                                    key={idx}
                                    className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1"
                                >
                                    <Check size={14}/>
                                    {benefit.teks}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}