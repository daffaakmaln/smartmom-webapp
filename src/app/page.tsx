"use client";



import Navbar from "../components/navbar";
import Hero from "../components/hero";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar/>
      <Hero />
    </main>
  );
}
