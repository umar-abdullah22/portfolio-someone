import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LogoShowcaseSection } from "@/components/sections/logo-showcase-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { SocialMediaDesignSection } from "@/components/sections/social-media-design-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <LogoShowcaseSection />
      <SocialMediaDesignSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
