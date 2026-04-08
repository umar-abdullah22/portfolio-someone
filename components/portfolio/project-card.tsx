"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import type { PortfolioProject } from "@/lib/portfolio-types";

type ProjectCardProps = {
  project: PortfolioProject;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 220, damping: 20 });
  const glowOpacity = useTransform(smoothY, [-8, 8], [0.15, 0.4]);

  const previews = useMemo(() => project.previewImages.slice(0, 4), [project.previewImages]);

  return (
    <motion.article
      layout
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        rotateX.set(((cy - y) / rect.height) * 12);
        rotateY.set(((x - cx) / rect.width) * 12);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.02)_100%)] p-4 shadow-[0_30px_80px_-50px_rgba(120,95,255,0.85)]"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(255,146,205,0.8),transparent_35%),radial-gradient(circle_at_15%_90%,rgba(129,144,255,0.65),transparent_40%)]"
      />

      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={project.heroImage}
            alt={`${project.title} hero preview`}
            width={1200}
            height={760}
            priority={priority}
            className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.04] md:h-64"
          />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {previews.map((preview, index) => (
            <div key={`${project.slug}-${preview}-${index}`} className="overflow-hidden rounded-xl">
              <Image
                src={preview}
                alt={`${project.title} preview ${index + 1}`}
                width={340}
                height={200}
                className="h-16 w-full object-cover transition duration-500 group-hover:scale-105 md:h-20"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-4 font-display text-2xl">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm text-primary"
        >
          View case study
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <ArrowUpRight size={14} />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}
