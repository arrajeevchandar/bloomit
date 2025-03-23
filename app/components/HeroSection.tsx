import { Button } from "../../src/components/ui/button";

export default function HeroSection() {
  return (
    <div className="text-center py-16 bg-gray-100 rounded-lg">
      <h1 className="text-4xl font-bold">Find the Best Decoration Services</h1>
      <p className="text-gray-600 mt-2">Explore thousands of decoration ads now!</p>
      <Button className="mt-4 bg-blue-500 text-white">Explore Ads</Button>
    </div>
  );
}
