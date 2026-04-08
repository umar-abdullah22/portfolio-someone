"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { defaultProjects } from "@/lib/portfolio-defaults";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PortfolioSection() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.15 }}
          variants={stagger}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs uppercase tracking-[0.22em] text-primary"
            >
              Portfolio
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Selected Work
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle mt-4">
              Case studies built for design leaders, recruiters, and product
              teams evaluating craft, process, and measurable impact.
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <Magnetic>
              <Button asChild variant="secondary" size="lg">
                <Link href="/portfolio">
                  Full Portfolio <ArrowUpRight size={15} />
                </Link>
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <PortfolioGrid projects={defaultProjects} featuredOnly columns="two" />
      </div>
    </section>
  );
}
