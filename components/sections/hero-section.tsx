"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const skewX = useTransform(smoothX, [-1, 1], [2.5, -2.5]);
  const skewY = useTransform(smoothY, [-1, 1], [-1.5, 1.5]);
  const [marqueeOffset, setMarqueeOffset] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setMarqueeOffset((prev) => (prev - 0.3) % 2400);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero-mesh relative min-h-screen overflow-hidden pt-32 md:pt-36">
      <div className="hero-light-rays pointer-events-none absolute inset-0" />
      <div className="hero-particles pointer-events-none absolute inset-0" />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
          mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
        }}
        className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4"
      >
        {/* ── background marquee ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div className="flex gap-4" style={{ x: marqueeOffset, y: 0 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Image
                key={i}
                src={
                  i % 2 === 0
                    ? "/assets/hero/momna-hero-01.jpg"
                    : "/assets/hero/momna-hero-02.jpg"
                }
                alt=""
                width={600}
                height={400}
                className="h-[80vh] w-[360px] shrink-0 object-cover opacity-[0.12]"
              />
            ))}
          </motion.div>
        </div>

        {/* ── kinetic text ── */}
        <motion.div
          style={{ skewX, skewY }}
          className="relative z-10 select-none text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            UI/UX Designer &amp; Graphic Designer
          </motion.p>

          <h1
            className="font-display text-[15vw] font-bold leading-[0.85] tracking-[-0.04em] md:text-[12vw] xl:text-[10vw]"
            style={{
              backgroundImage: `url('/assets/hero/momna-hero-01.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MOMNA
          </h1>
          <h1
            className="font-display text-[15vw] font-bold leading-[0.85] tracking-[-0.04em] md:text-[12vw] xl:text-[10vw]"
            style={{
              backgroundImage: `url('/assets/hero/momna-hero-02.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ZAHWER
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            I craft interfaces where every pixel has a purpose, every transition
            tells a story, and every system scales beautifully.
          </motion.p>
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative z-10 mt-10"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Button asChild size="lg" className="group">
                <a href="#work">
                  <Eye size={16} />
                  View Work
                  <motion.span className="inline-flex" whileHover={{ x: 3 }}>
                    <ArrowUpRight size={14} />
                  </motion.span>
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="secondary" size="lg" className="group">
                <a href="/assets/momna-zaheer-resume.pdf">
                  <Download size={16} />
                  Resume
                  <motion.span className="inline-flex" whileHover={{ x: 3 }}>
                    <ArrowUpRight size={14} />
                  </motion.span>
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="ghost" size="lg" className="group">
                <a href="#contact">
                  Hire Me
                  <motion.span className="inline-flex" whileHover={{ x: 3 }}>
                    <ArrowUpRight size={14} />
                  </motion.span>
                </a>
              </Button>
            </Magnetic>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Scroll to explore <ArrowDownRight size={14} />
          </div>
        </motion.div>

        {/* ── vignette ── */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(4,8,22,0.92)_75%)]" />
      </motion.div>
    </section>
  );
}
