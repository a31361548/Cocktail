"use client"
import Image from "next/image"
import PosterSwiper from "./components/layout_ui/PosterSwiper"
import { TbTargetArrow } from "react-icons/tb";
import { RiFilePpt2Fill } from "react-icons/ri";
import { PiPencilBold,PiPaletteBold  } from "react-icons/pi";

export default function Home(){
  return(
    <div className="flex flex-col items-center gap-y-10 mb-10">
      <div className="relative w-screen h-[360px] ">
        <Image 
          src="/image/png/Alice.png" 
          alt="Alice" fill 
          style={{ 
            objectFit: "cover",
            objectPosition:"50% 15%" 
          }}/>
      </div>
      <div className="flex flex-col gap-y-4 items-center text-center px-6">
        <div className="flex gap-x-2 items-center">
          <TbTargetArrow
            size={36}
            color="rgb(255, 0, 0)"
          />
          <h1 className="text-[36px] font-medium">我能幫你做什麼</h1>
        </div>
        <span className="text-gray text-xl">
          我擅長的是把你「懶得弄」但「不能不弄」的東西處理到位，從文案到PPT，從圖片到整理，不用交接五個人，只找我一個就夠。
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
        <div className="flex flex-col gap-y-4 items-center text-center px-4">
           <div className="flex gap-x-2 items-center">
            <PiPencilBold
              size={36}
              color="blue"
            />
            <h2 className="text-xl font-medium">文案幫你寫好好</h2>
           </div>
          <span className="text-gray text-lg">
            活動企劃書、SEO文章、社群貼文，我幫你寫得清楚、寫得有感。
          </span>
        </div>
        <div className="flex flex-col gap-y-4 items-center text-center px-4">
           <div className="flex gap-x-2 items-center">
            <RiFilePpt2Fill
              size={36}
              color="orange"
            />
            <h2 className="text-xl font-medium">PPT我會做得比你快</h2>
           </div>
          <span className="text-gray text-lg">
            你說重點，我排畫面。報告、簡報、教案全都做得出。
          </span>
        </div>
        <div className="flex flex-col gap-y-4 items-center text-center px-4">
           <div className="flex gap-x-2 items-center">
            <PiPaletteBold
              size={36}
              color="rgba(255,105,180,0.95)"
            />
            <h2 className="text-xl font-medium">圖文我也會設計</h2>
           </div>
          <span className="text-gray text-lg">
            簡單修圖＋好讀排版，社群圖、海報圖、LINE@圖文選單通通包辦。
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 items-center">
          <h1 className="text-[36px] font-medium">海報</h1>
        <PosterSwiper/>
      </div>
    </div>
  )
}