"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logoItems = [
  { src: "/assets/projects/logo-design/dew-beauty.png", name: "DEW Beauty", desc: "Nature-rooted beauty mark with woman's silhouette" },
  { src: "/assets/projects/logo-design/affordable-fade.png", name: "Affordable Fade", desc: "Luxury fragrance monogram with gold/black identity" },
  { src: "/assets/projects/logo-design/cider-delicious.png", name: "Cider Delicious", desc: "Playful food brand with apple-bite letterform" },
  { src: "/assets/projects/logo-design/mom-n-pops.png", name: "Mom'n Pop's", desc: "Family eyewear with character-integrated typography" },
  { src: "/assets/projects/logo-design/tresemme-rosegold.png", name: "TRESemme", desc: "Haircare rebrand with rose gold serif + script" },
  { src: "/assets/projects/logo-design/evening.png", name: "Evening", desc: "Minimalist desert moonscape in an arch" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function LogoShowcaseSection() {
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
            Brand Identity
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Logo &amp; identity showcase
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mt-4">
            Conceptual logo explorations across luxury, food, beauty, and
            lifestyle — each mark tells a story in a single glance.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1 }}
          variants={stagger}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {logoItems.map((item) => (
            <motion.article
              key={item.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-gradient-to-br from-white/[0.06] to-transparent shadow-[0_16px_50px_-20px_rgba(100,75,200,0.3)] transition hover:border-white/20"
            >
              <div className="overflow-hidden">
                <Image
                  src={item.src}
                  alt={`${item.name} logo design`}
                  width={1200}
                  height={700}
                  className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary/70">
                  Logo Design
                </p>
                <p className="mt-2 font-display text-lg font-semibold">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
