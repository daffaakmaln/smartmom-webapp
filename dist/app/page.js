"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const jsx_runtime_1 = require("react/jsx-runtime");
const navbar_1 = __importDefault(require("../components/navbar"));
const hero_1 = __importDefault(require("../components/hero"));
const whysection_1 = __importDefault(require("../components/whysection"));
const feature_section_1 = __importDefault(require("../components/feature_section"));
function Home() {
    return ((0, jsx_runtime_1.jsxs)("main", { className: "bg-white text-gray-900 min-h-screen", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsx)(hero_1.default, {}), (0, jsx_runtime_1.jsx)(whysection_1.default, {}), (0, jsx_runtime_1.jsx)(feature_section_1.default, {})] }));
}
