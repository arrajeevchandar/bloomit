
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AdCard from "./components/AdCard";

import prisma from "../lib/db"; // Import Prisma instead of connectDB

export default async function Home() {
  let ads = [];

  try {
    ads = await prisma.ad.findMany();
  } catch (error) {
    console.error("Error fetching ads:", error);
  }

  return (
    <div>
     
      <HeroSection />
      <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <AdCard key={ad.id ?? ad._id} ad={ad} />
        ))}
      </div>
    </div>
    </div>
  );
}