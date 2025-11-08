// app/perkembangan/janin/page.tsx
"use client";
import Sidebar from "../dashboard/sidebar";
import JaninVisualization from "./janin";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 md:h-screen md:fixed md:left-0 md:top-0 z-10">
        <Sidebar />
      </aside>
      {/* Konten utama */}
      <section className="flex-1 p-4 sm:p-6 md:ml-64">
        <JaninVisualization />
      </section>
    </main>
  );
}