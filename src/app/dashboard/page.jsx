"use client";

import { Apple, Activity, Heart, Wheat} from "lucide-react";
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
        <PageHeader
          title="Selamat Datang, Ibu Rani! "
          description="Pantau kesehatan dan aktivitas harian Anda."
          userName="Rani"
        />

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pt-4">
          <CardStat
            icon={<Activity className="w-6 h-6 text-pink-500" />}
            iconBg="bg-pink-100"
            title="Status Nutrisi Hari Ini"
            value="85%"
            note="Protein & Kalsium cukup"
            badge="Baik"
          />
          <CardStat
            icon={<Heart className="w-6 h-6 text-red-500" />}
            iconBg="bg-red-100"
            title="Detak Jantung"
            value="72 bpm"
            note="Normal"
            badge="Sehat"
          />

          <CardStat
            icon={<Apple className="w-6 h-6 text-green-500" />}
            iconBg="bg-cyan-100"
            title="Kalori Hari Ini"
            value="1,850"
            note="Target: 2,000 kal"
            badge="Baik"
          />

          <CardStat
            icon={<Wheat className="w-6 h-6 text-yellow-500" />}
            iconBg="bg-green-100"
            title="Menu Hari Ini"
            value="Ayam Sayur"
            note="Target: 2,000 kal"
            badge="Baik"
          />
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
