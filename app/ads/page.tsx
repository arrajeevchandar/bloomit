"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetch("/api/ads")
      .then((res) => res.json())
      .then(setAds);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <Card key={ad.id}>
          <CardHeader>
            <h2 className="text-lg font-bold">{ad.title}</h2>
          </CardHeader>
          <CardContent>
            <p>{ad.description}</p>
            <p className="font-bold">${ad.price}</p>
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {ad.images.map((img, index) => (
                <img key={index} src={img} alt="Ad Image" className="h-32 w-32 object-cover rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
