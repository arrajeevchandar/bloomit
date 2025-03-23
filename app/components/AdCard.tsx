import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AdCard({ ad }) {
  console.log("Rendering AdCard - Images:", ad.images); // 🔍 Debug

  const images = Array.isArray(ad.images) && ad.images.length > 0 
    ? ad.images 
    : ["/placeholder.jpg"];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <div key={index} className="relative w-[300px] h-[200px]">
              <Image
                src={img}  // ✅ Removed unnecessary placeholder logic
                alt={ad.title || "Ad Image"}
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
        <CardTitle>{ad.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{ad.description}</p>
        <p className="text-green-600 font-bold">${ad.price}</p>
      </CardContent>
    </Card>
  );
}
