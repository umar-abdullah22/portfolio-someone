"use client";

import { motion } from "framer-motion";

import { AvatarClay } from "@/components/avatar-clay";
import { skills, tools } from "@/data/projects";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container">
        {/* ── heading row ── */}
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
            About
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Design with strategy.
            <br />
            Craft with emotion.
          </motion.h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start lg:gap-16">
          {/* ── avatar card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#1a1538] via-[#15122a] to-[#0d0b18] p-5 shadow-[0_40px_120px_-40px_rgba(110,75,220,0.5)] md:p-6"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(160,130,255,0.18),transparent_55%)]" />
              <div className="flex h-full items-center justify-center">
                <AvatarClay />
              </div>
            </div>

            <div className="mt-5 text-center">
              <p className="font-display text-xl font-semibold">Momna Zaheer</p>
              <p className="mt-1 text-sm text-muted-foreground">
                UI/UX Designer &amp; Graphic Designer
              </p>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-green-400">
                Available for work
              </span>
            </div>
          </motion.div>

          {/* ── content ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.15 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8"
            >
              I&apos;m Momna — a UI/UX and visual designer who builds intuitive products
              and distinctive brand experiences. My process combines research, systems
              thinking, and a sharp aesthetic point of view to create work that performs
              as beautifully as it looks.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8"
            >
              I believe great design isn&apos;t decoration — it&apos;s a strategic
              advantage. Every pixel, every transition, every system I build is
              intentional.
            </motion.p>

            {/* ── tools ── */}
            <motion.div variants={fadeUp} className="mt-10">
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Tools I work with
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-wide transition hover:border-primary/40 hover:bg-primary/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── skills ── */}
            <motion.div variants={fadeUp} className="mt-10">
              <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Core competencies
              </p>
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.label} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  skill,
  index,
}: {
  skill: { label: string; value: number };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{skill.label}</span>
        <span className="font-display text-sm text-primary">{skill.value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.value}%` }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-[#8f72ff] via-[#b97aff] to-[#ff87c7]"
        />
      </div>
    </motion.div>
  );
}
