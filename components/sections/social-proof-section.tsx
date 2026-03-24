"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const logos = [
  "NovaLabs",
  "Pulse",
  "Lume",
  "BrightStack",
  "Kinetic",
  "Skyline",
];

const testimonials = [
  {
    quote:
      "Momna blends strategic UX thinking with a visual quality that immediately elevates the product. She doesn't just design — she solves.",
    by: "Sarah Chen",
    role: "Product Lead, Pulse Financial",
  },
  {
    quote:
      "Her design system work gave our team speed, consistency, and a stronger visual identity. The best designer I've hired.",
    by: "James Okoro",
    role: "Engineering Manager, Hive Metrics",
  },
  {
    quote:
      "Working with Momna felt like having a design co-founder. She understood the brand vision before we could articulate it.",
    by: "Aria Kim",
    role: "Founder, Lume Organics",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SocialProofSection() {
  return (
    <section id="proof" className="py-24 md:py-32">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.15 }}
          variants={stagger}
          className="mb-14 max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs uppercase tracking-[0.22em] text-primary"
          >
            Social Proof
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Trusted by ambitious teams
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mt-4">
            Collaborations across fintech, SaaS, e-commerce, and beauty brands
            — building products people love.
          </motion.p>
        </motion.div>

        {/* ── logo marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-6"
        >
          <div className="flex animate-[marqueeX_20s_linear_infinite] gap-12 px-6">
            {[...logos, ...logos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="shrink-0 whitespace-nowrap text-base font-medium uppercase tracking-[0.18em] text-muted-foreground/60"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── testimonials ── */}
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.by}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.15 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-gradient-to-br from-white/[0.07] to-transparent p-6 shadow-[0_20px_60px_-30px_rgba(100,75,200,0.35)] transition hover:border-white/20 md:p-7"
            >
              <Quote
                size={28}
                className="mb-4 text-primary/40 transition group-hover:text-primary/70"
              />
              <p className="text-[15px] leading-relaxed md:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-5 border-t border-white/8 pt-4">
                <p className="text-sm font-medium">{item.by}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
