"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        x.set(offsetX * 0.18);
        y.set(offsetY * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
