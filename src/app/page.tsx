"use client";

import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Whysection from "../components/whysection";
import FeatureSection from "../components/feature_section";
import SmartMomTestimonials from "../components/smartmom_testimonials";
import SmartMomHeroSection from "../components/smartmom_hero_section";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <Hero />
      <Whysection />
      <FeatureSection />
      <SmartMomTestimonials />
      <SmartMomHeroSection />
      <Footer />
    </main>
  );
}
