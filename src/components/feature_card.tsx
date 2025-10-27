// /app/components/FeatureCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-start space-y-4"
    >
      <div className="text-3xl text-pink-500">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;