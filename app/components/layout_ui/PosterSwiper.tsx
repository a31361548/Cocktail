"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"

export default function PosterSwiper() {
  const posters = [
    "/image/png/反毒海報1.png",
    "/image/png/反毒海報2.png",
    "/image/png/性剝削海報.jpg",
    "/image/png/家暴海報.png",
    "/image/png/網路安全海報.png",
    "/image/png/臺語推廣.png"
  ]

  const [selectedPoster, setSelectedPoster] = useState<string | null>(null)

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-lg"
        >
          {posters.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[400px] cursor-pointer" onClick={() => setSelectedPoster(src)}>
                <Image
                  src={src}
                  alt={`poster-${index}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox 遮罩與大圖顯示 */}
      {selectedPoster && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center "
          onClick={() => setSelectedPoster(null)}
        >
          <div className="relative w-[60vw] h-[60vh]">
            {/* <Image src="/image/close-white.svg" alt="close" width={24}  height={24} className="absolute top-[-5%] right-[10%]"
              onClick={() => setSelectedPoster(null)}
            /> */}
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
    </>
  )
}
