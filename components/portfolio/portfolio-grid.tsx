"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ProjectCard } from "@/components/portfolio/project-card";
import { defaultFilterTabs } from "@/lib/portfolio-defaults";
import { cn } from "@/lib/utils";
import type { PortfolioCategory, PortfolioProject } from "@/lib/portfolio-types";

type PortfolioGridProps = {
  projects: PortfolioProject[];
  featuredOnly?: boolean;
  columns?: "two" | "three";
};

export function PortfolioGrid({
  projects,
  featuredOnly = false,
  columns = "three"
}: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "All">("All");
  const filterTabs = useMemo(() => {
    const categories = Array.from(new Set(projects.map((project) => project.category)));

    return [
      defaultFilterTabs[0],
      ...categories.map((category) => ({
        label: category.replace(" Design", "").replace("Social Media", "Social"),
        value: category,
      })),
    ];
  }, [projects]);

  const baseProjects = useMemo(
    () => (featuredOnly ? projects.filter((project) => project.featured) : projects),
    [featuredOnly, projects]
  );

  const filtered = useMemo(() => {
    if (activeFilter === "All") return baseProjects;
    return baseProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter, baseProjects]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveFilter(tab.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition",
              activeFilter === tab.value
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "border-white/15 bg-white/5 text-muted-foreground hover:border-white/35 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className={cn(
          "grid gap-6",
          columns === "three" ? "lg:grid-cols-3 md:grid-cols-2" : "md:grid-cols-2"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
            >
              <ProjectCard project={project} priority={index < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
