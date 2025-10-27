"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
const FeatureCard = ({ title, description, icon }) => {
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.6, ease: 'easeOut' }, className: "bg-white p-6 rounded-2xl shadow-md flex flex-col items-start space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl text-pink-500", children: icon }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-800", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 text-sm leading-relaxed", children: description })] }));
};
exports.default = FeatureCard;
