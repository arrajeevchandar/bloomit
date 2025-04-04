// @ts-nocheck
"use client";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Ad } from "@prisma/client";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    async function fetchAd() {
      setLoading(true);
      const res = await fetch(`/api/ads/id?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setAd(data);
      }
      setLoading(false);
    }
    fetchAd();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-96 h-64 rounded-lg" />
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Ad not found.</p>
      </div>
    );
  }

  const whatsappLink = ad.phno
    ? `https://wa.me/${ad.phno}?text=${encodeURIComponent(
        `Hi, I'm interested in your ad: ${ad.title}`
      )}`
    : "#";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="rounded-xl shadow-lg">
        <CardHeader className="relative">
          {/* Swiper Image Carousel */}
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}
            pagination={{ clickable: true }}
            className="relative w-full h-96 rounded-lg"
          >
            {ad.images?.length > 0 ? (
              ad.images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                <Image
  src={image}
  width={800}
  height={500}
  alt={ad.title}
  className="w-full h-96 object-contain rounded-lg bg-black"
/>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <Image
                  src="/placeholder.jpg"
                  width={800}
                  height={500}
                  alt="Placeholder"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </SwiperSlide>
            )}
          </Swiper>
          <button
            ref={prevRef}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
          >
            ◀
          </button>
          <button
            ref={nextRef}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
          >
            ▶
          </button>

          {/* Badge */}
          <Badge className="absolute top-4 left-4 text-sm font-semibold px-3 py-1 bg-green-600 text-white z-50">
            ₹{ad.price}
          </Badge>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <CardTitle className="text-3xl font-bold">{ad.title}</CardTitle>
          <p className="text-gray-600 text-lg">₹{ad.price}</p>
          <div className="flex gap-4 mt-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={ad.phno ? "" : "pointer-events-none opacity-50"}
            >
              <Button variant="default" disabled={!ad.phno}>
                Chat on WhatsApp
              </Button>
            </a>
          </div>
          <p className="text-gray-600 text-lg">{ad.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
