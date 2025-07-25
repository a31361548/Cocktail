"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"

interface PosterSwiperProps {
  posters: string[]
}

export default function PosterSwiper({ posters }: PosterSwiperProps) {
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null)

  return (
    <div className="w-screen">
      <div className="w-full max-w-4xl mx-auto px-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-lg"
        >
          {posters.map((src, index) => (
            <SwiperSlide key={index} className="!bg-transparent">
              <div
                className="relative min-w-[280px] w-full max-w-[1280px] min-h-[280px] sm:h-[400px] md:h-[600px] lg:h-[800px] cursor-pointer"
                onClick={() => setSelectedPoster(src)}
              >
                <Image
                  src={src}
                  alt={`poster-${index}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox 遮罩與大圖顯示 */}
      {selectedPoster && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center"
          onClick={() => setSelectedPoster(null)}
        >
          <div className="relative w-[60vw] h-[60vh]">
            <Image
              src={selectedPoster}
              alt="fullscreen-poster"
              fill
              style={{ objectFit: "contain" }}
              className="rounded"
            />
          </div>
        </div>
      )}
    </div>
  )
}
