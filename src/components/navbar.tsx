'use client';

import { useState } from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "Fitur", "Testimoni", "Contact Us"];

export default function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <nav className="flex justify-between items-center py-5 px-6 md:px-20 bg-white shadow-sm relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="w-15 h-15 rounded-full border-2 border-white" alt="logo" />
        <span className="text-xl font-semibold">SmartMom</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-4 relative bg-gray-50 rounded-full p-1">
        {navItems.map((item) => (
          <button
            key={item}
            onMouseEnter={() => setActive(item)}
            className="relative z-10 px-5 py-2 text-gray-700 font-medium rounded-full transition-colors duration-200"
          >
            {active === item && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 bg-pink-500 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className={active === item ? "text-white relative z-10" : "relative z-10"}>
              {item}
            </span>
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <button className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition">
        Daftar →
      </button>
    </nav>
  );
}
