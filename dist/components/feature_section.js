"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeatureSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
const feature_card_1 = __importDefault(require("./feature_card"));
const lucide_react_1 = require("lucide-react");
const features = [
    {
        title: 'AI Scanner Gizi',
        description: 'Ambil foto makanan, dan lihat kandungan gizinya seketika.',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Apple, { className: "w-8 h-8" }),
        color: '#FF6384',
        bgColor: '#FFF0F5',
    },
    {
        title: 'Jadwal & Menu Sehat',
        description: 'Rekomendasi menu harian sesuai usia & kebutuhan ibu.',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "w-8 h-8" }),
        color: '#36A2EB',
        bgColor: '#E6F0FF',
    },
    {
        title: 'Jurnal Kesehatan Ibu',
        description: 'Catat kesehatan dan perasaan ibu, hari demi hari.',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.NotebookPen, { className: "w-8 h-8" }),
        color: '#FFCE56',
        bgColor: '#FFF8E1',
    },
    {
        title: 'Artikel & Edukasi',
        description: 'Pengetahuan terpercaya agar ibu merasa tenang dan yakin.',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "w-8 h-8" }),
        color: '#4BC0C0',
        bgColor: '#E0F7F7',
    },
    {
        title: 'Komunitas Ibu',
        description: 'Ruang aman untuk berbagi cerita dan dukungan sesama ibu.',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "w-8 h-8" }),
        color: '#9966FF',
        bgColor: '#F3E8FF',
    },
    {
        title: 'Konsultasi Ahli',
        description: 'Temui ahli kandungan & gizi kapan ibu butuh kepastian.',
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Stethoscope, { className: "w-8 h-8" }),
        color: '#FF9F40',
        bgColor: '#FFF2E6',
    },
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};
function FeatureSection() {
    return ((0, jsx_runtime_1.jsx)("section", { className: "bg-pink-50 py-12 px-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-6xl mx-auto", children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: -20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center mb-10", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-800", children: "Fitur Utama" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mt-2", children: "Semua yang Ibu Butuhkan, Dalam Satu Platform" })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 }, className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: features.map((feature, index) => ((0, jsx_runtime_1.jsx)(feature_card_1.default, { title: feature.title, description: feature.description, icon: feature.icon, color: feature.color, bgColor: feature.bgColor }, index))) })] }) }));
}
