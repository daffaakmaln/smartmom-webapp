"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const navItems = ["Home", "Fitur", "Testimoni", "Contact Us"];
function Navbar() {
    const [active, setActive] = (0, react_1.useState)("Home");
    return ((0, jsx_runtime_1.jsxs)("nav", { className: "flex justify-between items-center py-5 px-6 md:px-20 bg-white shadow-sm relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("img", { src: "/logo.png", className: "w-15 h-15 rounded-full border-2 border-white", alt: "logo" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-semibold", children: "SmartMom" })] }), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex gap-4 relative bg-gray-50 rounded-full p-1", children: navItems.map((item) => ((0, jsx_runtime_1.jsxs)("button", { onMouseEnter: () => setActive(item), className: "relative z-10 px-5 py-2 text-gray-700 font-medium rounded-full transition-colors duration-200", children: [active === item && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { layoutId: "pill", className: "absolute inset-0 bg-pink-500 rounded-full", transition: { type: "spring", stiffness: 300, damping: 25 } })), (0, jsx_runtime_1.jsx)("span", { className: active === item ? "text-white relative z-10" : "relative z-10", children: item })] }, item))) }), (0, jsx_runtime_1.jsx)("button", { className: "bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition", children: "Daftar \u2192" })] }));
}
