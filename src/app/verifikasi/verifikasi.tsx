import { useState } from "react";
import { ArrowRight, ArrowLeft, Heart, Sparkles, User, Calendar, Mail, Lock, Activity, Moon, Scale, AlertCircle } from "lucide-react";

export default function OnboardingPage() {
  const [currentSession, setCurrentSession] = useState(1);
  const [progress, setProgress] = useState(0);
  
  // Session 1 Data
  const [session1Data, setSession1Data] = useState({
    purpose: "",
    nickname: "",
    birthYear: "",
    email: "",
    password: ""
  });

  // Session 2 Data (Dynamic based on purpose)
  const [session2Data, setSession2Data] = useState({
    // For A & TTC
    lastPeriod: "",
    cycleLength: "",
    contraception: "",
    supplements: "",
    // For Pregnant
    dueDate: "",
    pregnancyWeek: "",
    firstPregnancy: "",
    medicalConditions: "",
    // For Postpartum
    childBirthDate: "",
    childGender: "",
    feedingMethod: ""
  });

  // Session 3 Data
  const [session3Data, setSession3Data] = useState({
    height: "",
    weight: "",
    stressLevel: "",
    sleepHours: "",
    chronicConditions: ""
  });

  const [showCompletion, setShowCompletion] = useState(false);

  const updateSession1 = (field: string, value: string) => {
    setSession1Data(prev => ({ ...prev, [field]: value }));
  };

  const updateSession2 = (field: string, value: string) => {
    setSession2Data(prev => ({ ...prev, [field]: value }));
  };

  const updateSession3 = (field: string, value: string) => {
    setSession3Data(prev => ({ ...prev, [field]: value }));
  };

  const nextSession = () => {
    if (currentSession === 1) {
      setProgress(33);
      setCurrentSession(2);
    } else if (currentSession === 2) {
      setProgress(66);
      setCurrentSession(3);
    } else if (currentSession === 3) {
      setProgress(100);
      setShowCompletion(true);
      setTimeout(() => {
        alert("Selamat datang di SmartMom! Profile Anda telah lengkap.");
      }, 2000);
    }
  };

  const prevSession = () => {
    if (currentSession === 2) {
      setProgress(0);
      setCurrentSession(1);
    } else if (currentSession === 3) {
      setProgress(33);
      setCurrentSession(2);
    }
  };

  // Render Session 1: Tujuan & Identitas
  const renderSession1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Mari Kenalan! 👋
        </h2>
        <p className="text-gray-600">
          Ceritakan sedikit tentang Anda untuk pengalaman terbaik
        </p>
      </div>

      {/* Question 1: Purpose */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          1. Apa tujuan utama Anda menggunakan SmartMom?
        </label>
        <div className="space-y-3">
          {[
            // { value: "cycle", label: "Melacak Siklus Menstruasi & Kesehatan Umum", icon: "🩸" },
            { value: "ttc", label: "Merencanakan Kehamilan (Trying To Conceive)", icon: "💑" },
            { value: "pregnant", label: "Melacak Kehamilan & Perkembangan Janin", icon: "🤰" },
            // { value: "postpartum", label: "Pascapersalinan & Kesehatan Anak", icon: "👶" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSession1("purpose", option.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                session1Data.purpose === option.value
                  ? "border-pink-500 bg-pink-50 shadow-md"
                  : "border-gray-200 hover:border-pink-300 hover:bg-pink-25"
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="font-medium text-gray-700">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Question 2: Nickname */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          2. Siapa nama panggilan Anda?
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={session1Data.nickname}
            onChange={(e) => updateSession1("nickname", e.target.value)}
            placeholder="Contoh: Ibu Rani"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Question 3: Birth Year */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          3. Tahun berapa Anda lahir?
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={session1Data.birthYear}
            onChange={(e) => updateSession1("birthYear", e.target.value)}
            placeholder="Contoh: 1990"
            min="1950"
            max="2010"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Question 4: Email & Password */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700">
          4. Konfirmasi Akun Anda
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={session1Data.email}
            onChange={(e) => updateSession1("email", e.target.value)}
            placeholder="Email Anda"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            value={session1Data.password}
            onChange={(e) => updateSession1("password", e.target.value)}
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );

  // Render Session 2: Health Data (Dynamic)
  const renderSession2 = () => {
    const { purpose } = session1Data;

    if (purpose === "cycle" || purpose === "ttc") {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {purpose === "ttc" ? "Perjalanan Promil Anda 💑" : "Kesehatan Reproduksi 🩸"}
            </h2>
            <p className="text-gray-600">
              Data ini membantu kami memberikan prediksi yang akurat
            </p>
          </div>

          {/* HPHT */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              1. Kapan hari pertama haid terakhir (HPHT) Anda?
            </label>
            <input
              type="date"
              value={session2Data.lastPeriod}
              onChange={(e) => updateSession2("lastPeriod", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Cycle Length */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              2. Berapa rata-rata lama siklus menstruasi Anda?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["21 hari", "28 hari", "30 hari", "35 hari", "Tidak Teratur"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateSession2("cycleLength", option)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    session2Data.cycleLength === option
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Contraception */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              3. Metode kontrasepsi yang sedang digunakan? (Opsional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Tidak Ada", "Pil KB", "IUD/Spiral", "Kondom", "KB Suntik", "Implan"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateSession2("contraception", option)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    session2Data.contraception === option
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Supplements (Only for TTC) */}
          {purpose === "ttc" && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                4. Apakah Anda sedang mengonsumsi suplemen untuk promil?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Ya", "Tidak", "Rencana Mulai"].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateSession2("supplements", option)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      session2Data.supplements === option
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (purpose === "pregnant") {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Kehamilan Anda 🤰
            </h2>
            <p className="text-gray-600">
              Mari kita lacak perkembangan si kecil
            </p>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              1. Kapan Perkiraan Hari Lahir (HPL) Anda?
            </label>
            <input
              type="date"
              value={session2Data.dueDate}
              onChange={(e) => updateSession2("dueDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Pregnancy Week */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              2. Berapa usia kehamilan Anda saat ini? (minggu)
            </label>
            <input
              type="number"
              value={session2Data.pregnancyWeek}
              onChange={(e) => updateSession2("pregnancyWeek", e.target.value)}
              placeholder="Contoh: 12"
              min="1"
              max="42"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>

          {/* First Pregnancy */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              3. Apakah ini kehamilan pertama Anda?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Ya, pertama kali", "Tidak, sudah pernah"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateSession2("firstPregnancy", option)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    session2Data.firstPregnancy === option
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              4. Adakah kondisi medis kehamilan? (Opsional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Tidak Ada", "Gestational Diabetes", "Preeklampsia", "Lainnya"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateSession2("medicalConditions", option)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    session2Data.medicalConditions === option
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (purpose === "postpartum") {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Kesehatan Ibu & Anak 👶
            </h2>
            <p className="text-gray-600">
              Ceritakan tentang si kecil
            </p>
          </div>

          {/* Child Birth Date */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              1. Kapan tanggal lahir anak Anda?
            </label>
            <input
              type="date"
              value={session2Data.childBirthDate}
              onChange={(e) => updateSession2("childBirthDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Child Gender */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              2. Jenis kelamin anak Anda?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "boy", label: "Laki-laki 👦" },
                { value: "girl", label: "Perempuan 👧" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateSession2("childGender", option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    session2Data.childGender === option.value
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feeding Method */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              3. Metode pemberian makan anak?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["ASI Eksklusif", "Susu Formula", "Kombinasi ASI & Formula"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateSession2("feedingMethod", option)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    session2Data.feedingMethod === option
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Render Session 3: Lifestyle
  const renderSession3 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Gaya Hidup & Kesehatan 🌟
        </h2>
        <p className="text-gray-600">
          Informasi ini membantu kami memberikan saran yang tepat
        </p>
      </div>

      {/* Height & Weight */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            1. Tinggi Badan (cm)
          </label>
          <div className="relative">
            <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="number"
              value={session3Data.height}
              onChange={(e) => updateSession3("height", e.target.value)}
              placeholder="160"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Berat Badan (kg)
          </label>
          <div className="relative">
            <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="number"
              value={session3Data.weight}
              onChange={(e) => updateSession3("weight", e.target.value)}
              placeholder="55"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Stress Level */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          2. Bagaimana tingkat stres Anda saat ini?
        </label>
        <div className="grid grid-cols-5 gap-2">
          {["1", "2", "3", "4", "5"].map((level) => (
            <button
              key={level}
              onClick={() => updateSession3("stressLevel", level)}
              className={`p-3 rounded-xl border-2 transition-all ${
                session3Data.stressLevel === level
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">1 = Sangat Tenang | 5 = Sangat Stres</p>
      </div>

      {/* Sleep Hours */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          3. Berapa lama rata-rata waktu tidur harian Anda?
        </label>
        <div className="relative">
          <Moon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={session3Data.sleepHours}
            onChange={(e) => updateSession3("sleepHours", e.target.value)}
            placeholder="7"
            min="1"
            max="24"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>
        <p className="text-xs text-gray-500">Dalam jam per hari</p>
      </div>

      {/* Chronic Conditions */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          4. Riwayat kondisi kesehatan kronis? (Opsional)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Tidak Ada", "PCOS", "Endometriosis", "Diabetes", "Hipertensi", "Lainnya"].map((option) => (
            <button
              key={option}
              onClick={() => updateSession3("chronicConditions", option)}
              className={`p-3 rounded-xl border-2 transition-all ${
                session3Data.chronicConditions === option
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Completion Screen
  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mb-6 shadow-lg">
            <Heart className="w-14 h-14 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Selamat Datang, {session1Data.nickname || "Ibu"}! 🎉
          </h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Profile Anda telah lengkap! Kami siap membantu Anda dalam perjalanan kesehatan dan keluarga.
          </p>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 max-w-md mx-auto shadow-xl">
            <div className="text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tujuan:</span>
                <span className="font-semibold text-gray-800">
                  {session1Data.purpose === "cycle" && "Melacak Siklus"}
                  {session1Data.purpose === "ttc" && "Merencanakan Kehamilan"}
                  {session1Data.purpose === "pregnant" && "Kehamilan"}
                  {session1Data.purpose === "postpartum" && "Pascapersalinan"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-800">{session1Data.email}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 mt-6 text-sm">
            Mengarahkan ke dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo */}
           <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16  rounded-2xl mb-3 shadow-lg">
        <img src="/logo.png" className="w-14 h-14 rounded-xl object-cover" alt="SmartMom Logo" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">SmartMom</h1>
    </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Sesi {currentSession} dari 3</span>
              <span>{Math.round(progress)}% Selesai</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Session Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-6">
            {currentSession === 1 && renderSession1()}
            {currentSession === 2 && renderSession2()}
            {currentSession === 3 && renderSession3()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentSession > 1 && (
              <button
                onClick={prevSession}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center group"
              >
                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Kembali
              </button>
            )}
            <button
              onClick={nextSession}
              className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all flex items-center justify-center group"
            >
              {currentSession === 3 ? "Selesai" : "Lanjutkan"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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
            transform: translateY(-10px);
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
          animation: fade-in 0.6s ease-out;
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