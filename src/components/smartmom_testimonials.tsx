import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Putri",
    role: "Ibu Hamil 8 Bulan",
    rating: 4.5,
    text: "Artikelnya bener-bener membantu banget! Jadi lebih ngerti gimana cara menghadapi anak & lagi tantrum tanpa ikutan emosi 😊 Terima kasih SmartMom! 💕",
    avatar: "👩",
  },
  
  {
    id: 2,
    name: "Putri",
    role: "Ibu Hamil 8 Bulan",
    rating: 4.5,
    text: "Aplikasinya keren banget, fitur pengingat jadwal harian bikin aku jadi lebih teratur. Dulu sering lupa waktu makan siang anak, sekarang nggak lagi 😊",
    avatar: "👩",
  },
  {
    id: 3,
    name: "Putri",
    role: "Ibu Hamil 8 Bulan",
    rating: 4.5,
    text: 'Topiknya relevan banget! Aku juga baru belajar gimana pentingnya punya waktu "me time" biar nggak stres ngurus rumah dan anak.',
    avatar: "👩",
  },
  {
    id: 4,
    name: "Putri",
    role: "Ibu Hamil 8 Bulan",
    rating: 4.5,
    text: "Ada yang punya pengalaman ngajarin anak tidur sendiri? Aku masih sering kalah kalau anak minta ditemeni terus 😅",
    avatar: "👩",
  },
  {
    id: 5,
    name: "Putri",
    role: "Ibu Hamil 8 Bulan",
    rating: 4.5,
    text: "Tips nomor 3 adalah langsung keliling supermarket. Waktu aku ajak anak ke sana...",
    avatar: "👩",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const fullStars = Math.floor(testimonial.rating);
  const hasHalfStar = testimonial.rating % 1 !== 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-w-[320px] max-w-[320px] flex-shrink-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
          {testimonial.avatar}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative w-5 h-5">
            <Star className="w-5 h-5 text-yellow-400 absolute" />
            <div className="overflow-hidden w-1/2 absolute">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">
        {testimonial.text}
      </p>
    </div>
  );
};

const SmartMomTestimonials: React.FC = () => {
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetBottom, setOffsetBottom] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cardWidth = 320 + 24; // 320px card + 24px gap
  const totalWidth = testimonials.length * cardWidth;

  // Baris atas: bergerak ke kanan
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setOffsetTop((prev) => {
        const newOffset = prev + 1;
        // Reset saat sudah melewati satu set lengkap
        if (newOffset <= -totalWidth) {
          return 0;
        }
        return newOffset;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, totalWidth]);

  // Baris bawah: bergerak ke kiri
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setOffsetBottom((prev) => {
        const newOffset = prev - 1;
        // Reset saat sudah melewati satu set lengkap
        if (newOffset <= -totalWidth) {
          return 0;
        }
        return newOffset;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [isPaused, totalWidth]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-white border-2 border-pink-300 rounded-full text-pink-500 font-medium mb-6">
            # Cerita Ibu
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Cerita Nyata dari Ibu yang Dipandu{" "}
            <span className="text-pink-500">SmartMom</span>
          </h1>
        </div>

        {/* Dua baris slider */}
        <div className="space-y-6">
          {/* Baris 1 - Bergerak ke Kanan */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex gap-6 flex-row-reverse"
              style={{
                transform: `translateX(${offsetTop % totalWidth}px)`,
                willChange: "transform",
              }}
            >
              {/* Triple reversed untuk smooth infinite loop */}
              {[...testimonials]
                .reverse()
                .concat([...testimonials].reverse())
                .concat([...testimonials].reverse())
                .map((testimonial, index) => (
                  <TestimonialCard
                    key={`row1-${index}`}
                    testimonial={testimonial}
                  />
                ))}
            </div>
          </div>

          {/* Baris 2 - Bergerak ke Kiri (arah berlawanan) */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex gap-6"
              style={{
                transform: `translateX(${offsetBottom}px)`,
                willChange: "transform",
              }}
            >
              {/* Triple untuk smooth infinite loop */}
              {[...testimonials, ...testimonials, ...testimonials].map(
                (testimonial, index) => (
                  <TestimonialCard
                    key={`row2-${index}`}
                    testimonial={testimonial}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          • Hover untuk berhenti •
        </p>
      </div>
    </div>
  );
};

export default SmartMomTestimonials;
