"use client"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Sidebar() {
  const [show_hamburger, set_show_hamburger] = useState(false)

  return (
    <div className="relative w-full">
      {/* 導覽列 */}
      <div className="h-12 bg-[linear-gradient(135deg,_#e0c3fc,_#fbc2eb,_#a18cd1,_#fbc2eb,_#e0c3fc)] flex w-full p-2">

        <div className="flex-1 text-center">
          <span className="text-2xl font-bold text-white">13隻小豬</span>
        </div>
        <Image
          src="/image/hamburger.svg"
          alt="hamburger"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => set_show_hamburger(true)}
        />
      </div>

      {/* 側邊欄動畫 */}
      <AnimatePresence>
        {show_hamburger && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[288px] bg-[var(--red)] backdrop-blur z-[99] p-2"
          >
            <Image
              src="/image/close-white.svg"
              alt="close"
              width={24}
              height={24}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => set_show_hamburger(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
