"use client";

import { useEffect, useState } from "react";

import { defaultProjects, defaultSiteContent } from "@/lib/portfolio-defaults";
import { loadProjects, loadSiteContent } from "@/lib/portfolio-store";
import type { PortfolioProject, SiteContent } from "@/lib/portfolio-types";

export function usePortfolioData() {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [projects, setProjects] = useState<PortfolioProject[]>(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [loadedSiteContent, loadedProjects] = await Promise.all([
          loadSiteContent(),
          loadProjects(),
        ]);

        if (!isMounted) return;

        setSiteContent(loadedSiteContent);
        setProjects(loadedProjects);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    siteContent,
    projects,
    loading,
    setSiteContent,
    setProjects,
  };
}
