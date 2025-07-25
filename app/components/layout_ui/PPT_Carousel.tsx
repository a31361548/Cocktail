"use client"
import { useEffect, useRef, useState } from "react"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"

const allImages = [
  "S__3293339.jpg",
  "S__3293341.jpg",
  "S__3293342.jpg",
  "S__3293343.jpg",
  "S__3293344.jpg",
  "S__3293345.jpg",
  "S__3293346.jpg",
  "S__3293347.jpg",
  "S__3301379.jpg",
  "S__3301381.jpg",
  "S__3301382.jpg",
  "S__3301383.jpg",
  "S__3301384.jpg",
]

export default function Carousel3D() {
  const [z, setZ] = useState(600)
  const [spacingMultiplier, setSpacingMultiplier] = useState(5)
  const [images, setImages] = useState<string[]>(allImages)

  const zRef = useRef(z)
  const spacingRef = useRef(spacingMultiplier)

  useEffect(() => {
    const width = window.innerWidth
    if (width < 640) {
      setZ(250)
      setSpacingMultiplier(1)
      setImages(allImages.slice(0, 6))
    } else if (width < 1024) {
      setZ(450)
      setSpacingMultiplier(1)
      setImages(allImages.slice(0, 10))
    } else {
      setZ(600)
      setSpacingMultiplier(5)
      setImages(allImages)
    }
  }, [])

  useEffect(() => {
    zRef.current = z
    spacingRef.current = spacingMultiplier
  }, [z, spacingMultiplier])

  const carousel3d: KeenSliderPlugin = (slider) => {
    const rotate = () => {
      const deg = 360 * slider.track.details.progress
      slider.container.style.transform = `translateZ(-${zRef.current}px) rotateY(${-deg}deg)`
    }

    slider.on("created", () => {
      const deg = (360 / slider.slides.length) * spacingRef.current
      slider.slides.forEach((el, i) => {
        el.style.transform = `rotateY(${deg * i}deg) translateZ(${zRef.current}px)`
      })
      rotate()
    })

    slider.on("detailsChanged", rotate)
  }

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel3d]
  )

  useEffect(() => {
    const scene = document.querySelector(".scene")
    if (!scene) return

    const container = scene.querySelector(".keen-slider") as HTMLElement
    const slides = scene.querySelectorAll(".carousel__cell")
    if (!container || slides.length === 0) return

    const deg = (360 / slides.length) * spacingRef.current

    slides.forEach((el, i) => {
      ;(el as HTMLElement).style.transform = `rotateY(${deg * i}deg) translateZ(${zRef.current}px)`
    })

    container.style.transform = `translateZ(-${zRef.current}px) rotateY(0deg)`
  }, [z, spacingMultiplier, images])

  const perspective = z * 2

  return (
    <div className="wrapper">
      <div className="scene" style={{ perspective }}>
        <div className="carousel keen-slider" ref={sliderRef}>
          {images.map((img, idx) => (
            <div className="carousel__cell 
            w-[160px] h-[120px] 
            sm:w-[200px] sm:h-[160px] 
            md:w-[220px] md:h-[180px] 
            lg:w-[240px] lg:h-[200px]"
            key={idx}
            >
              <Image
                src={`/image/jpg/${img}`}
                alt={`poster-${idx}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
