"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hero;
const jsx_runtime_1 = require("react/jsx-runtime");
const carousel_hero_1 = __importDefault(require("./carousel_hero"));
function Hero() {
    return ((0, jsx_runtime_1.jsxs)("section", { className: "flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 py-12", children: [(0, jsx_runtime_1.jsxs)("div", { className: "max-w-xl", children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4", children: ["Merawat nutrisi ibu, ", (0, jsx_runtime_1.jsx)("br", {}), " dan menyiapkan masa depan"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 mb-6", children: "Teman setia ibu untuk memahami gizi, menjaga ketenangan, dan merasa yakin selama kehamilan." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 mb-8", children: [(0, jsx_runtime_1.jsx)("button", { className: "bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition", children: "Mulai Sekarang \u2192" }), (0, jsx_runtime_1.jsx)("button", { className: "bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition", children: "Lihat Fitur" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex -space-x-3", children: [(0, jsx_runtime_1.jsx)("img", { src: "/avatar1.png", className: "w-15 h-15 rounded-full border-2 border-white object-contain", alt: "" }), (0, jsx_runtime_1.jsx)("img", { src: "/avatar2.png", className: "w-15 h-15 rounded-full border-2 border-white object-contain", alt: "" }), (0, jsx_runtime_1.jsx)("img", { src: "/avatar3.png", className: "w-15 h-15 rounded-full border-2 border-white object-contain", alt: "" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 font-medium", children: "50.000+ ibu merasa lebih tenang" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500", children: "Rating \u2B50 4.9/5" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mb-10 md:mb-0", children: (0, jsx_runtime_1.jsx)(carousel_hero_1.default, {}) })] }));
}
