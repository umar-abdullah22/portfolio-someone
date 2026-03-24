"use client";

import { motion } from "framer-motion";

export function AvatarClay() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto h-[370px] w-[300px]"
    >
      <div className="absolute inset-x-0 bottom-0 h-12 rounded-full bg-black/25 blur-xl" />
      <div className="absolute left-1/2 top-[24px] h-[146px] w-[230px] -translate-x-1/2 rounded-[55%_55%_46%_46%] bg-[#2a2144]" />
      <div className="absolute left-[40px] top-[72px] h-[190px] w-[84px] rounded-[48px] bg-[#2a2144]" />
      <div className="absolute right-[40px] top-[72px] h-[190px] w-[84px] rounded-[48px] bg-[#2a2144]" />
      <div className="absolute left-1/2 top-[72px] h-[188px] w-[164px] -translate-x-1/2 rounded-[45%_45%_44%_44%] bg-[#f7c8b8] shadow-[inset_0_-24px_26px_rgba(0,0,0,0.09)]" />
      <div className="absolute left-1/2 top-[94px] h-[34px] w-[62px] -translate-x-1/2 rounded-[46%] bg-[#f9d3c2]" />
      <div className="absolute left-[111px] top-[164px] h-[3px] w-[18px] rounded-full bg-[#1f1a35]" />
      <div className="absolute right-[111px] top-[164px] h-[3px] w-[18px] rounded-full bg-[#1f1a35]" />
      <div className="absolute left-[92px] top-[180px] h-[14px] w-[26px] rounded-full bg-[#f0b7a3]/45 blur-[1px]" />
      <div className="absolute right-[92px] top-[180px] h-[14px] w-[26px] rounded-full bg-[#f0b7a3]/45 blur-[1px]" />
      <motion.div
        animate={{ scaleY: [1, 0.08, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 3.1 }}
        className="absolute left-[108px] top-[158px] h-[7px] w-[13px] rounded-full bg-[#1b1930]"
      />
      <motion.div
        animate={{ scaleY: [1, 0.08, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 3.1 }}
        className="absolute right-[108px] top-[158px] h-[7px] w-[13px] rounded-full bg-[#1b1930]"
      />
      <div className="absolute left-1/2 top-[205px] h-[12px] w-[40px] -translate-x-1/2 rounded-full bg-[#df9a84]" />
      <div className="absolute left-[56px] top-[190px] h-[24px] w-[12px] rounded-full bg-[#e8c9ff]" />
      <div className="absolute right-[56px] top-[190px] h-[24px] w-[12px] rounded-full bg-[#e8c9ff]" />
      <div className="absolute left-1/2 top-[248px] h-[64px] w-[222px] -translate-x-1/2 rounded-[45%_45%_28%_28%] bg-[#efe8ff]" />
      <div className="absolute left-1/2 top-[274px] h-[96px] w-[276px] -translate-x-1/2 rounded-[48%_48%_34%_34%] bg-[#7f6dff]" />
    </motion.div>
  );
}
