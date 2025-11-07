// feature_section.tsx
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './feature_card';
import { Apple, Calendar, BookOpen, Users, Stethoscope, NotebookPen } from 'lucide-react';

const features = [
  {
    title: 'AI Scanner Gizi',
    description: 'Ambil foto makanan, dan lihat kandungan gizinya seketika.',
    icon: <Apple className="w-8 h-8" />,
    color: '#FF6384',
    bgColor: '#FFF0F5',
  },
  {
    title: 'Jadwal & Menu Sehat',
    description: 'Rekomendasi menu harian sesuai usia & kebutuhan ibu.',
    icon: <Calendar className="w-8 h-8" />,
    color: '#36A2EB',
    bgColor: '#E6F0FF',
  },
  {
    title: 'Jurnal Kesehatan Ibu',
    description: 'Catat kesehatan dan perasaan ibu, hari demi hari.',
    icon: <NotebookPen className="w-8 h-8" />,
    color: '#FFCE56',
    bgColor: '#FFF8E1',
  },
  {
    title: 'Artikel & Edukasi',
    description: 'Pengetahuan terpercaya agar ibu merasa tenang dan yakin.',
    icon: <BookOpen className="w-8 h-8" />,
    color: '#4BC0C0',
    bgColor: '#E0F7F7',
  },
  {
    title: 'Komunitas Ibu',
    description: 'Ruang aman untuk berbagi cerita dan dukungan sesama ibu.',
    icon: <Users className="w-8 h-8" />,
    color: '#9966FF',
    bgColor: '#F3E8FF',
  },
  {
    title: 'Konsultasi Ahli',
    description: 'Temui ahli kandungan & gizi kapan ibu butuh kepastian.',
    icon: <Stethoscope className="w-8 h-8" />,
    color: '#FF9F40',
    bgColor: '#FFF2E6',
  },
];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// ✅ forwardRef agar bisa di-scroll dari parent
const FeatureSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section id="Fitur" ref={ref} className="bg-pink-50 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-800">Fitur Utama</h2>
          <p className="text-gray-600 mt-2">
            Semua yang Ibu Butuhkan, Dalam Satu Platform
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
});

FeatureSection.displayName = "FeatureSection";
export default FeatureSection;