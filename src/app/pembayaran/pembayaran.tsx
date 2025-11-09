import { useState } from "react";
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Crown, 
  Check, 
  ArrowLeft,
  Shield,
  Lock,
  AlertCircle,
  Sparkles
} from "lucide-react";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "ewallet" | "bank">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Data dummy dari halaman subscription
  const selectedPlan = {
    name: "SmartMom Plus",
    price: 59999,
    billing: "monthly",
    features: [
      "50 scan makanan per hari",
      "Analisis nutrisi lengkap & AI",
      "Rekomendasi menu personal",
      "Artikel & panduan premium",
      "Tracking kesehatan harian",
      "Konsultasi chat (5x/bulan)"
    ]
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Kartu Kredit/Debit",
      icon: <CreditCard size={24} />,
      description: "Visa, Mastercard, JCB"
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: <Wallet size={24} />,
      description: "GoPay, OVO, DANA, ShopeePay"
    },
    {
      id: "bank",
      name: "Transfer Bank",
      icon: <Building2 size={24} />,
      description: "BCA, Mandiri, BNI, BRI"
    }
  ];

  const ewalletOptions = [
    { name: "GoPay", logo: "🟢" },
    { name: "OVO", logo: "🟣" },
    { name: "DANA", logo: "🔵" },
    { name: "ShopeePay", logo: "🟠" }
  ];

  const bankOptions = [
    { name: "BCA", code: "014" },
    { name: "Mandiri", code: "008" },
    { name: "BNI", code: "009" },
    { name: "BRI", code: "002" }
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Pembayaran Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Selamat! Anda sekarang adalah member <strong>{selectedPlan.name}</strong>
          </p>
          <div className="bg-pink-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
            <p className="text-2xl font-bold text-pink-600">Rp {formatPrice(selectedPlan.price)}</p>
          </div>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg"
          >
            Mulai Gunakan Fitur Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Kembali ke Paket</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-3xl p-8 shadow-lg animate-slide-up">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Pembayaran</h1>
              <p className="text-gray-600">Selesaikan pembayaran untuk mengaktifkan paket Anda</p>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-3xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Pilih Metode Pembayaran</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`flex flex-col items-center text-center ${
                      paymentMethod === method.id ? "text-pink-600" : "text-gray-600"
                    }`}>
                      {method.icon}
                      <p className="font-semibold mt-2 text-sm">{method.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Form based on selected method */}
              {paymentMethod === "card" && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Kartu</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kadaluarsa</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pemegang Kartu</label>
                    <input
                      type="text"
                      placeholder="NAMA ANDA"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "ewallet" && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-sm text-gray-600 mb-4">Pilih e-wallet Anda:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ewalletOptions.map((wallet) => (
                      <button
                        key={wallet.name}
                        className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all"
                      >
                        <span className="text-2xl">{wallet.logo}</span>
                        <span className="font-semibold text-gray-800">{wallet.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        Anda akan diarahkan ke aplikasi e-wallet untuk menyelesaikan pembayaran
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-sm text-gray-600 mb-4">Pilih bank tujuan transfer:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {bankOptions.map((bank) => (
                      <button
                        key={bank.name}
                        className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all"
                      >
                        <span className="font-semibold text-gray-800">{bank.name}</span>
                        <span className="text-sm text-gray-500">({bank.code})</span>
                      </button>
                    ))}
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-800">
                        Nomor rekening virtual akan diberikan setelah Anda klik "Bayar Sekarang"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 animate-fade-in">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-600" />
                <span>Pembayaran Aman</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-green-600" />
                <span>Terenkripsi SSL</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedPlan.name}</h3>
                  <p className="text-xs text-gray-500">Pembayaran {selectedPlan.billing === "monthly" ? "Bulanan" : "Tahunan"}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Fitur yang Didapat:</h4>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">Rp {formatPrice(selectedPlan.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pajak (11%)</span>
                  <span className="font-semibold text-gray-800">Rp {formatPrice(Math.round(selectedPlan.price * 0.11))}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-pink-600 text-lg">Rp {formatPrice(Math.round(selectedPlan.price * 1.11))}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Bayar Sekarang</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Dengan melanjutkan, Anda menyetujui <span className="text-pink-600 font-medium">Syarat & Ketentuan</span> kami
              </p>
            </div>
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
          }
          to {
            opacity: 1;
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

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
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