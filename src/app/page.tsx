"use client";

import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Whysection from "../components/whysection";
import FeatureSection from "../components/feature_section";
import SmartMomTestimonials from "../components/smartmom_testimonials";
import SmartMomHeroSection from "../components/smartmom_hero_section";
import Footer from "../components/footer";
import { useRef } from "react";

export default function Home() {
  const featureRef = useRef<HTMLDivElement | null>(null);
  const testimonialRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const scrollWithOffset = (element: HTMLElement | null) => {
    if (element) {
      const yOffset = -100; // sesuaikan tinggi navbar kamu
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleScrollToHero = () => scrollWithOffset(heroRef.current);
  const handleScrollToFeature = () => scrollWithOffset(featureRef.current);
  const handleScrollToTestimonial = () => scrollWithOffset(testimonialRef.current);
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar
        onScrollToTestimonial={handleScrollToTestimonial}
        onScrollToFeature={handleScrollToFeature}
        onScrollToHero={handleScrollToHero}
      />
      <div ref={heroRef}>
        <Hero onScrollToFeature={handleScrollToFeature} />
      </div>
      <Whysection />
      <div ref={featureRef}>
        <FeatureSection />
      </div>
      <div ref={testimonialRef}>
        <SmartMomTestimonials />
      </div>
      <SmartMomHeroSection />
      <Footer />
    </main>
  );
}
