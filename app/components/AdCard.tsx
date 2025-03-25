"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AdCard({ ad }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const images =
    Array.isArray(ad.images) && ad.images.length > 0
      ? ad.images
      : ["/placeholder.jpg"];

  return (
    <Card className="w-full max-w-[350px] mx-auto shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
      <Link href={`/ads/${ad.id ?? ad._id}`} passHref>
        <CardHeader className="p-4">
          <div className="relative w-full h-[220px] overflow-hidden rounded-md">
            {isMounted && (
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                loop={true}
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
                className="w-full h-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-[220px]">
                      <Image
                        src={img}
                        alt={ad.title || "Ad Image"}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Custom Navigation Buttons */}
            <button
              ref={prevRef}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"
            >
              ◀
            </button>
            <button
              ref={nextRef}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"
            >
              ▶
            </button>
          </div>

          <CardTitle className="mt-2 text-lg font-semibold text-center">
            {ad.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <p className="text-gray-600 text-sm line-clamp-2">{ad.description}</p>
          <p className="text-green-600 font-bold text-lg mt-2">₹{ad.price}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
