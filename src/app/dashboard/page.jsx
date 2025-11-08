"use client";
import { Apple, Activity, Baby, Wheat } from "lucide-react";
import Link from "next/link";
import Sidebar from "../dashboard/sidebar";
import CardStat from "../dashboard/card_stat";
import TipsCard from "../dashboard/tips_card";
import ActivityList from "../dashboard/activity_list";
import PageHeader from "@/components/header_page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 md:ml-64">
        <PageHeader />
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card Status Nutrisi - Clickable */}
          <Link href="/jurnal" className="block">
            <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardStat
                icon={<Activity className="w-6 h-6 text-pink-500" />}
                iconBg="bg-pink-100"
                title="Status Nutrisi Hari Ini"
                value="85%"
                note="Protein & Kalsium cukup"
                badge="Baik"
              />
            </div>
          </Link>
          
          {/* Card Usia Kehamilan - Clickable */}
          <Link href="/janin" className="block">
            <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardStat
                icon={<Baby className="w-6 h-6 text-purple-500" />}
                iconBg="bg-purple-100"
                title="Usia Kehamilan"
                value="180 hari"
                note="Berat janin: ~1,2 kg"
                badge="Normal"
              />
            </div>
          </Link>

          {/* Card Kalori - Clickable */}
          <Link href="#" className="block">
            <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardStat
                icon={<Apple className="w-6 h-6 text-green-500" />}
                iconBg="bg-cyan-100"
                title="Kalori Hari Ini"
                value="1,850"
                note="Target: 2,000 kal"
                badge="Baik"
              />
            </div>
          </Link>
          
          {/* Card Menu - Clickable */}
          <Link href="/menumakananx   " className="block">
            <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardStat
                icon={<Wheat className="w-6 h-6 text-yellow-500" />}
                iconBg="bg-green-100"
                title="Menu Hari Ini"
                value="Ayam"
                note="Target: 2,000 kal"
                badge="Baik"
              />
            </div>
          </Link>
        </div>
        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityList />
          </div>
          <TipsCard />
        </div>
      </main>
    </div>
  );
}