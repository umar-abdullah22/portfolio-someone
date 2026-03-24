import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-14">
      <SiteHeader />
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
            <PortfolioGrid columns="three" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
