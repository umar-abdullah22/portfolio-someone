"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCursor() {
  const [hidden, setHidden] = useState(false);
  const [touchOnly, setTouchOnly] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 38 });
  const sy = useSpring(y, { stiffness: 500, damping: 38 });

  useEffect(() => {
    setTouchOnly(window.matchMedia("(pointer: coarse)").matches);

    const move = (event: MouseEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  if (touchOnly) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full border border-primary/50 mix-blend-screen"
      style={{ x: sx, y: sy }}
      animate={{
        opacity: hidden ? 0 : 1,
        scale: hidden ? 0.3 : 1
      }}
      transition={{ duration: 0.18 }}
    />
  );
}
