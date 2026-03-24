"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { socialDesigns } from "@/data/projects";
import { Lightbox } from "@/components/ui/lightbox";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function SocialMediaDesignSection() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.15 }}
          variants={stagger}
          className="mb-12 max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs uppercase tracking-[0.22em] text-primary"
          >
            Visual Content
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Social media design direction
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mt-4">
            Instagram posts, carousel systems, and ad creatives presented as a
            polished Dribbble-style gallery.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1 }}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {socialDesigns.map((src, index) => (
            <motion.button
              key={`${src}-${index}`}
              type="button"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setActiveSrc(src)}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] text-left shadow-[0_16px_50px_-20px_rgba(100,75,200,0.3)] transition hover:border-white/20"
            >
              <Image
                src={src}
                alt={`Social media creative ${index + 1}`}
                width={700}
                height={700}
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[9px] uppercase tracking-wider text-white/70 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                View full
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
      <Lightbox
        src={activeSrc}
        alt="Social media preview"
        onClose={() => setActiveSrc(null)}
      />
    </section>
  );
}
