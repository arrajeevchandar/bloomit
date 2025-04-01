"use client"; // 👈 Add this at the very top

import { Button } from "../../src/components/ui/button";

export default function HeroSection() {
  const scrollToAds = () => {
    document.getElementById("ads-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative text-center py-24 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-wide leading-tight">
          Elevate Your Events with Stunning Decorations
        </h1>
        <p className="text-lg mt-4 opacity-90">
          Discover the finest decoration services to bring your vision to life.
        </p>
        <Button
          onClick={scrollToAds}
          className="mt-6 px-6 py-3 text-lg font-semibold bg-black text-blue-600 rounded-full shadow-md transition duration-300 hover:bg-blue-100 hover:scale-105"
        >
          Explore Ads
        </Button>
      </div>
    </div>
  );
}
