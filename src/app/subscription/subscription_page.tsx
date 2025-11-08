import { useState } from "react";
import {
  Check,
  Crown,
  Sparkles,
  Heart,
  Camera,
  MessageCircle,
  Baby,
  TrendingUp,
  Shield,
  Zap,
  Star,
  ArrowLeft,
} from "lucide-react";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: 0,
      yearlyPrice: 0,
      description: "Mulai perjalanan sehat Anda",
      color: "gray",
      gradient: "from-gray-400 to-gray-500",
      icon: <Heart size={32} />,
      popular: false,
      features: [
        {
          text: "1 scan makanan per hari",
          icon: <Camera size={16} />,
          available: true,
        },
        {
          text: "Analisis nutrisi dasar",
          icon: <TrendingUp size={16} />,
          available: true,
        },
        {
          text: "Artikel kesehatan umum",
          icon: <Sparkles size={16} />,
          available: true,
        },
        {
          text: "Komunitas ibu",
          icon: <MessageCircle size={16} />,
          available: true,
        },
        {
          text: "Konsultasi profesional",
          icon: <Shield size={16} />,
          available: false,
        },
        {
          text: "Pantau perkembangan janin",
          icon: <Baby size={16} />,
          available: false,
        },
      ],
      cta: "Mulai Gratis",
      ctaVariant: "outline",
    },
    {
      id: "plus",
      name: "SmartMom Plus",
      price: 59999,
      yearlyPrice: 599999,
      description: "Untuk ibu yang ingin lebih",
      color: "pink",
      gradient: "from-pink-400 to-pink-600",
      icon: <Sparkles size={32} />,
      popular: true,
      features: [
        {
          text: "Access lebih scan makanan/hari",
          icon: <Camera size={16} />,
          available: true,
        },
        {
          text: "Analisis nutrisi lengkap & AI",
          icon: <TrendingUp size={16} />,
          available: true,
        },
        {
          text: "Rekomendasi menu personal",
          icon: <Star size={16} />,
          available: true,
        },
        {
          text: "Artikel & panduan premium",
          icon: <Sparkles size={16} />,
          available: true,
        },
        {
          text: "Tracking kesehatan harian",
          icon: <Heart size={16} />,
          available: true,
        },
        {
          text: "Konsultasi chat (5x/bulan)",
          icon: <MessageCircle size={16} />,
          available: true,
        },
        {
          text: "Pantau perkembangan janin",
          icon: <Baby size={16} />,
          available: false,
        },
      ],
      cta: "Pilih Plus",
      ctaVariant: "solid",
    },
    {
      id: "pro",
      name: "SmartMom Pro",
      price: 129999,
      yearlyPrice: 1299999,
      description: "Pendampingan lengkap & maksimal",
      color: "yellow",
      gradient: "from-yellow-400 to-yellow-500",
      icon: <Crown size={32} />,
      popular: false,
      features: [
        {
          text: "Unlimited scan makanan",
          icon: <Camera size={16} />,
          available: true,
        },
        {
          text: "AI analisis super detail",
          icon: <Zap size={16} />,
          available: true,
        },
        {
          text: "Menu personal dari ahli gizi",
          icon: <Star size={16} />,
          available: true,
        },
        {
          text: "Semua artikel & konten eksklusif",
          icon: <Sparkles size={16} />,
          available: true,
        },
        {
          text: "Konsultasi unlimited (chat & video)",
          icon: <MessageCircle size={16} />,
          available: true,
        },
        {
          text: "Pantau janin dengan teknologi AI",
          icon: <Baby size={16} />,
          available: true,
        },
      ],
      cta: "Pilih Pro",
      ctaVariant: "solid",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6 relative px-4">
            {/* Tombol Back */}
            <button
              onClick={() => window.history.back()}
              className="absolute left-4 sm:left-6 md:left-8 flex items-center justify-center w-15 h-15 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all"
              aria-label="Kembali"
            >
              <ArrowLeft size={25} className="text-gray-700" />
            </button>

            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center">
                <img
                  src="/logo.png"
                  className="w-14 h-14 rounded-full"
                  alt="logo"
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Pilih Paket Terbaik Anda
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Investasi terbaik untuk kesehatan Anda dan buah hati
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full p-1.5 shadow-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-semibold transition-all relative ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Tahunan
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const displayPrice =
              billingCycle === "monthly" ? plan.price : plan.yearlyPrice;
            const isHovered = hoveredPlan === plan.id;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative bg-white rounded-3xl p-8 transition-all duration-500 animate-slide-up ${
                  plan.popular
                    ? "shadow-2xl scale-105 border-2 border-pink-300"
                    : "shadow-lg hover:shadow-xl hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      Paling Populer
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${
                    plan.gradient
                  } rounded-2xl flex items-center justify-center text-white mb-6 transition-transform duration-300 ${
                    isHovered ? "scale-110 rotate-6" : ""
                  }`}
                >
                  {plan.icon}
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gray-800">
                        Gratis
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline mb-1">
                        <span className="text-gray-600 text-sm mr-1">Rp</span>
                        <span className="text-4xl font-bold text-gray-800">
                          {formatPrice(displayPrice)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        per {billingCycle === "monthly" ? "bulan" : "tahun"}
                      </p>
                      {billingCycle === "yearly" && plan.price > 0 && (
                        <p className="text-green-600 text-xs font-semibold mt-1">
                          Hemat Rp{" "}
                          {formatPrice(plan.price * 12 - plan.yearlyPrice)}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 transition-all duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    >
                      {feature.available ? (
                        <div
                          className={`w-5 h-5 bg-gradient-to-br ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <Check
                            size={12}
                            className="text-white"
                            strokeWidth={3}
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-gray-400 text-xs">×</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            feature.available
                              ? "text-gray-600"
                              : "text-gray-400"
                          }
                        >
                          {feature.icon}
                        </span>
                        <span
                          className={`text-sm ${
                            feature.available
                              ? "text-gray-700"
                              : "text-gray-400 line-through"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    plan.ctaVariant === "solid"
                      ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:scale-105`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ / Trust Section */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
            <Shield size={20} className="text-green-500" />
            <span className="text-sm text-gray-700">
              <strong>Jaminan 100% Aman</strong> - Uang kembali dalam 7 hari
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
