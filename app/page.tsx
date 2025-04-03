import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AdCard from "./components/AdCard";
import AdCardHolder from "./components/AdCardHolder";

import prisma from "../lib/db"; // Import Prisma instead of connectDB

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <AdCardHolder />
    </div>
  );
}
