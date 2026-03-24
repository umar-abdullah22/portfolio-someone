"use client";

import { motion } from "framer-motion";
import {
  Dribbble,
  Instagram,
  Linkedin,
  Mail,
  PenTool,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const links = [
  { icon: Mail, label: "Email", href: "mailto:momnazaheer456@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/momna-zaheer-607185351/" },
  { icon: PenTool, label: "Behance", href: "https://www.linkedin.com/in/momna-zaheer-607185351/" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function ContactSection() {
  return (
    <section id="contact" className="pb-24 pt-16 md:pb-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.4rem] border border-border bg-gradient-to-br from-[#f2ecff] via-[#ecebff] to-[#ffeef8] p-8 shadow-[0_40px_120px_-40px_rgba(120,80,220,0.25)] md:p-14 dark:border-white/12 dark:from-[#3b2d72]/65 dark:via-[#2d2451]/55 dark:to-[#5a2d4b]/50 dark:shadow-[0_40px_120px_-40px_rgba(120,80,220,0.5)]"
        >
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#ff82c8]/15 blur-[80px] dark:bg-[#ff82c8]/20" />
          <div className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-[#8a6dff]/12 blur-[80px] dark:bg-[#8a6dff]/20" />

          <div className="relative grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
            {/* ── left ── */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.15 }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-xs uppercase tracking-[0.22em] text-muted-foreground"
              >
                Let&apos;s collaborate
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl xl:text-6xl"
              >
                Let&apos;s create something
                <br />
                <span className="bg-gradient-to-r from-[#8f72ff] to-[#ff87c7] bg-clip-text text-transparent">
                  amazing together.
                </span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-sm text-muted-foreground md:text-base"
              >
                I&apos;m available for full-time roles, freelance collaborations,
                and design consulting for startups and product teams.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-2.5"
              >
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground transition hover:border-primary/40 hover:bg-primary/10 dark:border-white/15 dark:bg-white/8"
                  >
                    <link.icon size={14} />
                    {link.label}
                  </a>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex items-center gap-6"
              >
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-foreground">1+</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Years exp
                  </p>
                </div>
                <div className="h-10 w-px bg-border dark:bg-white/15" />
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-foreground">10+</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Projects
                  </p>
                </div>
                <div className="h-10 w-px bg-border dark:bg-white/15" />
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-foreground">5+</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Brands
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── form ── */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.15 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="space-y-4 rounded-[1.5rem] border border-border bg-background/80 p-6 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-black/40"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Send a message
              </p>
              <input
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none ring-primary transition placeholder:text-muted-foreground/70 focus:ring-2 dark:border-white/15 dark:bg-white/5"
                placeholder="Your name"
              />
              <input
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none ring-primary transition placeholder:text-muted-foreground/70 focus:ring-2 dark:border-white/15 dark:bg-white/5"
                placeholder="Your email"
              />
              <textarea
                rows={4}
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none ring-primary transition placeholder:text-muted-foreground/70 focus:ring-2 dark:border-white/15 dark:bg-white/5"
                placeholder="Tell me about your project..."
              />
              <Button className="w-full gap-2" size="lg">
                <Send size={15} />
                Send Inquiry
              </Button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
