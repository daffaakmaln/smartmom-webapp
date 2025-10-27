"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeroImageCarousel;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function HeroImageCarousel() {
    const images = ["/mom1.jpg", "/mom2.jpg", "/mom3.jpg"]; // foto
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(0);
    // Auto-slide  3 detik
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-[350px] aspect-[3/4] overflow-hidden rounded-3xl shadow-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex transition-transform duration-[1500ms] ease-in-out", style: {
                    transform: `translateX(-${currentIndex * 100}%)`,
                }, children: images.map((src, index) => ((0, jsx_runtime_1.jsx)("img", { src: src, alt: `SmartMom ${index}`, className: "w-full h-full object-cover flex-shrink-0" }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2", children: images.map((_, index) => ((0, jsx_runtime_1.jsx)("div", { onClick: () => setCurrentIndex(index), className: `w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${currentIndex === index ? "bg-pink-500 scale-125" : "bg-gray-300"}` }, index))) })] }));
}
