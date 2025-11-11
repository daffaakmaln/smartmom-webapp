import { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  Flame, 
  Heart, 
  ChefHat,
  ShoppingCart,
  Users,
  Bookmark,
  Share2,
  Play,
  CheckCircle2,
  Sparkles,
  TrendingUp
} from "lucide-react";

export default function RecipeDetailPage() {
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps" | "nutrition">("ingredients");
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Data dummy resep
  const recipe = {
    id: 1,
    category: "Makan Siang",
    icon: "⭐",
    name: "Nasi Merah dengan Ikan & Sayur",
    description: "Nasi merah, ikan salmon panggang, tumis brokoli wortel, dan tahu",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    calories: 420,
    protein: 35,
    carbs: 45,
    fat: 12,
    prepTime: "15 menit",
    cookTime: "25 menit",
    servings: 2,
    difficulty: "Mudah",
    rating: 4.8,
    reviews: 234,
    benefits: [
      "Protein tinggi untuk janin",
      "Omega-3 untuk otak bayi",
      "Zat besi mencegah anemia",
      "Kalsium untuk tulang"
    ],
    ingredients: [
      { name: "Nasi merah", amount: "200g", category: "Karbohidrat" },
      { name: "Ikan salmon segar", amount: "150g", category: "Protein" },
      { name: "Brokoli", amount: "100g", category: "Sayuran" },
      { name: "Wortel", amount: "80g", category: "Sayuran" },
      { name: "Tahu putih", amount: "100g", category: "Protein" },
      { name: "Bawang putih", amount: "3 siung", category: "Bumbu" },
      { name: "Kecap asin", amount: "1 sdm", category: "Bumbu" },
      { name: "Minyak zaitun", amount: "2 sdm", category: "Lemak Sehat" },
      { name: "Garam & merica", amount: "Secukupnya", category: "Bumbu" }
    ],
    steps: [
      {
        number: 1,
        title: "Persiapan Bahan",
        description: "Cuci bersih semua sayuran. Potong brokoli menjadi kuntum kecil, wortel dipotong dadu, dan tahu dipotong kotak.",
        time: "5 menit"
      },
      {
        number: 2,
        title: "Masak Nasi Merah",
        description: "Masak nasi merah dengan rice cooker atau panci. Pastikan tekstur nasi tidak terlalu lembek.",
        time: "20 menit"
      },
      {
        number: 3,
        title: "Panggang Ikan Salmon",
        description: "Lumuri salmon dengan sedikit garam, merica, dan minyak zaitun. Panggang di oven 180°C selama 12-15 menit atau pan-fried dengan api sedang.",
        time: "15 menit"
      },
      {
        number: 4,
        title: "Tumis Sayuran",
        description: "Panaskan minyak, tumis bawang putih hingga harum. Masukkan wortel, tumis 2 menit, lalu tambahkan brokoli dan tahu. Beri kecap asin, garam, dan merica. Masak hingga sayuran matang tapi tetap renyah.",
        time: "8 menit"
      },
      {
        number: 5,
        title: "Penyajian",
        description: "Tata nasi merah di piring, letakkan ikan salmon panggang di samping, dan sajikan dengan tumisan sayuran dan tahu. Hidangkan selagi hangat.",
        time: "2 menit"
      }
    ],
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 45,
      fat: 12,
      fiber: 8,
      calcium: 180,
      iron: 4.5,
      omega3: 2.5
    }
  };

  const toggleStep = (stepNumber: number) => {
    if (checkedSteps.includes(stepNumber)) {
      setCheckedSteps(checkedSteps.filter(s => s !== stepNumber));
    } else {
      setCheckedSteps([...checkedSteps, stepNumber]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
          >
            <Bookmark 
              size={20} 
              className={isSaved ? "text-pink-500 fill-pink-500" : "text-gray-800"} 
            />
          </button>
          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all">
            <Share2 size={20} className="text-gray-800" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {recipe.category}
              </span>
              <span className="text-2xl">{recipe.icon}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {recipe.name}
            </h1>
            <p className="text-white/90 text-sm lg:text-base">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-12 relative z-10 pb-12">
        {/* Stats Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 animate-slide-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-pink-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Waktu</p>
                <p className="font-bold text-gray-800">40 menit</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Flame size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Kalori</p>
                <p className="font-bold text-gray-800">{recipe.calories} kkal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Porsi</p>
                <p className="font-bold text-gray-800">{recipe.servings} orang</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ChefHat size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Tingkat</p>
                <p className="font-bold text-gray-800">{recipe.difficulty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Heart size={20} className="text-pink-500" fill="currentColor" />
            <h2 className="text-xl font-bold text-gray-800">Manfaat untuk Ibu & Bayi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recipe.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4">
                <Sparkles size={18} className="text-pink-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-lg p-2 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "ingredients"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Bahan-Bahan
            </button>
            <button
              onClick={() => setActiveTab("steps")}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "steps"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Langkah-Langkah
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "nutrition"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Nutrisi
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8 animate-fade-in">
          {activeTab === "ingredients" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Bahan-Bahan</h3>
                <button className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold transition-colors">
                  <ShoppingCart size={18} />
                  <span className="text-sm">Beli Bahan</span>
                </button>
              </div>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-800 font-medium">{ingredient.name}</span>
                    </div>
                    <span className="text-gray-600 text-sm">{ingredient.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "steps" && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Langkah Memasak</h3>
              <div className="space-y-4">
                {recipe.steps.map((step) => (
                  <div 
                    key={step.number} 
                    className={`border-2 rounded-2xl p-5 transition-all ${
                      checkedSteps.includes(step.number)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleStep(step.number)}
                        className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          checkedSteps.includes(step.number)
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-pink-500"
                        }`}
                      >
                        {checkedSteps.includes(step.number) && (
                          <CheckCircle2 size={20} className="text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800">
                            Langkah {step.number}: {step.title}
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {step.time}
                          </span>
                        </div>
                        <p className={`text-sm ${
                          checkedSteps.includes(step.number)
                            ? "text-gray-600 line-through"
                            : "text-gray-700"
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Nutrisi</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-2">Kalori</p>
                  <p className="text-3xl font-bold text-pink-600">{recipe.nutrition.calories}</p>
                  <p className="text-xs text-gray-500">kkal</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-2">Protein</p>
                  <p className="text-3xl font-bold text-blue-600">{recipe.nutrition.protein}</p>
                  <p className="text-xs text-gray-500">gram</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-2">Karbohidrat</p>
                  <p className="text-3xl font-bold text-yellow-600">{recipe.nutrition.carbs}</p>
                  <p className="text-xs text-gray-500">gram</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 text-center">
                  <p className="text-sm text-gray-600 mb-2">Lemak</p>
                  <p className="text-3xl font-bold text-orange-600">{recipe.nutrition.fat}</p>
                  <p className="text-xs text-gray-500">gram</p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-2xl p-6">
                <h4 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} />
                  Nutrisi Penting Lainnya
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Serat</span>
                    <span className="font-semibold text-gray-800">{recipe.nutrition.fiber}g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Kalsium</span>
                    <span className="font-semibold text-gray-800">{recipe.nutrition.calcium}mg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Zat Besi</span>
                    <span className="font-semibold text-gray-800">{recipe.nutrition.iron}mg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Omega-3</span>
                    <span className="font-semibold text-gray-800">{recipe.nutrition.omega3}g</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-2xl font-bold hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl mt-6 flex items-center justify-center gap-2">
          <Play size={20} fill="currentColor" />
          Mulai Memasak
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}