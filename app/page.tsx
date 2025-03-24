
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
      <div className="grid grid-cols-3 gap-6 p-10 ">
        {ads?.length > 0 ? (
          ads.map((ad) => (
            <AdCard key={ad.id ?? ad._id} ad={ad} />
          ))
        ) : (
          <p>No ads available.</p>
        )}
      </div>
    </div>
  );
}