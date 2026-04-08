"use client";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function PortfolioPageClient() {
  const { siteContent, projects } = usePortfolioData();

  return (
    <main className="relative min-h-screen overflow-hidden pb-14">
      <SiteHeader brandName={siteContent.brandName} />
      <section className="pt-36 md:pt-44">
        <div className="container">
          <h1 className="font-display text-5xl leading-[0.98] md:text-7xl">
            Full portfolio
          </h1>
          <p className="section-subtitle mt-5">
            Explore all product, web, branding, social, and creative direction
            projects with animated filtering.
          </p>
          <div className="mt-10">
            <PortfolioGrid projects={projects} columns="three" />
          </div>
        </div>
      </section>
      <SiteFooter brandName={siteContent.brandName} />
    </main>
  );
}
