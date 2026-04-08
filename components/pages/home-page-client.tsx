"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Eye,
  Linkedin,
  Mail,
  MessageCircle,
  PenTool,
} from "lucide-react";

import { AvatarClay } from "@/components/avatar-clay";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/ui/lightbox";
import { Magnetic } from "@/components/ui/magnetic";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

const linkIcons = {
  email: Mail,
  linkedin: Linkedin,
  behance: PenTool,
  instagram: MessageCircle,
  website: ArrowUpRight,
};

export function HomePageClient() {
  const { siteContent, projects } = usePortfolioData();
  const [activeSocialImage, setActiveSocialImage] = useState<string | null>(null);

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects]
  );

  return (
    <main className="relative overflow-hidden">
      <SiteHeader brandName={siteContent.brandName} />

      <section className="hero-mesh relative min-h-screen overflow-hidden pt-32 md:pt-36">
        <div className="hero-light-rays pointer-events-none absolute inset-0" />
        <div className="hero-particles pointer-events-none absolute inset-0" />

        <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="flex gap-4 opacity-20">
              {Array.from({ length: 8 }).map((_, index) => (
                <Image
                  key={`${siteContent.hero.backgroundImages[index % siteContent.hero.backgroundImages.length]}-${index}`}
                  src={
                    siteContent.hero.backgroundImages[
                      index % siteContent.hero.backgroundImages.length
                    ]
                  }
                  alt=""
                  width={600}
                  height={400}
                  className="h-[80vh] w-[360px] shrink-0 object-cover opacity-[0.35]"
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 select-none text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {siteContent.hero.eyebrow}
            </p>

            <h1
              className="font-display text-[15vw] font-bold leading-[0.85] tracking-[-0.04em] md:text-[12vw] xl:text-[10vw]"
              style={{
                backgroundImage: `url('${siteContent.hero.backgroundImages[0]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {siteContent.hero.firstName}
            </h1>
            <h1
              className="font-display text-[15vw] font-bold leading-[0.85] tracking-[-0.04em] md:text-[12vw] xl:text-[10vw]"
              style={{
                backgroundImage: `url('${siteContent.hero.backgroundImages[1] ?? siteContent.hero.backgroundImages[0]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {siteContent.hero.lastName}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              {siteContent.hero.intro}
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <div className="flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Button asChild size="lg" className="group">
                  <a href={siteContent.hero.primaryCtaHref}>
                    <Eye size={16} />
                    {siteContent.hero.primaryCtaLabel}
                    <motion.span className="inline-flex" whileHover={{ x: 3 }}>
                      <ArrowUpRight size={14} />
                    </motion.span>
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="secondary" size="lg" className="group">
                  <a href={siteContent.hero.secondaryCtaHref}>
                    <Download size={16} />
                    {siteContent.hero.secondaryCtaLabel}
                    <motion.span className="inline-flex" whileHover={{ x: 3 }}>
                      <ArrowUpRight size={14} />
                    </motion.span>
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="ghost" size="lg" className="group">
                  <a href={siteContent.hero.tertiaryCtaHref}>
                    {siteContent.hero.tertiaryCtaLabel}
                    <motion.span className="inline-flex" whileHover={{ x: 3 }}>
                      <ArrowUpRight size={14} />
                    </motion.span>
                  </a>
                </Button>
              </Magnetic>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Scroll to explore <ArrowDownRight size={14} />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(4,8,22,0.92)_75%)]" />
        </div>
      </section>

      <section id="about" className="py-24 md:py-32">
        <div className="container">
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-primary">
              {siteContent.about.eyebrow}
            </p>
            <h2 className="section-title whitespace-pre-line">{siteContent.about.title}</h2>
          </div>

          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start lg:gap-16">
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#1a1538] via-[#15122a] to-[#0d0b18] p-5 shadow-[0_40px_120px_-40px_rgba(110,75,220,0.5)] md:p-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(160,130,255,0.18),transparent_55%)]" />
                <div className="flex h-full items-center justify-center">
                  <AvatarClay />
                </div>
              </div>

              <div className="mt-5 text-center">
                <p className="font-display text-xl font-semibold">{siteContent.brandName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{siteContent.brandRole}</p>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-green-400">
                  {siteContent.about.availableLabel}
                </span>
              </div>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8">
                {siteContent.about.intro}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8">
                {siteContent.about.body}
              </p>

              <div className="mt-10">
                <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Tools I work with
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteContent.about.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-wide transition hover:border-primary/40 hover:bg-primary/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Core competencies
                </p>
                <div className="space-y-5">
                  {siteContent.about.skills.map((skill) => (
                    <div key={skill.label}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.label}</span>
                        <span className="font-display text-sm text-primary">{skill.value}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#8f72ff] via-[#b97aff] to-[#ff87c7]"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="py-24 md:py-32">
        <div className="container">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-primary">
                {siteContent.portfolio.eyebrow}
              </p>
              <h2 className="section-title">{siteContent.portfolio.title}</h2>
              <p className="section-subtitle mt-4">{siteContent.portfolio.description}</p>
            </div>
            <Magnetic>
              <Button asChild variant="secondary" size="lg">
                <Link href="/portfolio">
                  Full Portfolio <ArrowUpRight size={15} />
                </Link>
              </Button>
            </Magnetic>
          </div>

          <PortfolioGrid projects={featuredProjects} columns="two" />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-primary">
              {siteContent.logoShowcase.eyebrow}
            </p>
            <h2 className="section-title">{siteContent.logoShowcase.title}</h2>
            <p className="section-subtitle mt-4">{siteContent.logoShowcase.description}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {siteContent.logoShowcase.items.map((item) => (
              <article
                key={item.name}
                className="group relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-gradient-to-br from-white/[0.06] to-transparent shadow-[0_16px_50px_-20px_rgba(100,75,200,0.3)] transition hover:border-white/20"
              >
                <div className="overflow-hidden">
                  <Image
                    src={item.src}
                    alt={`${item.name} logo design`}
                    width={1200}
                    height={700}
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary/70">
                    Logo Design
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="py-24 md:py-32">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-primary">
              {siteContent.socialGallery.eyebrow}
            </p>
            <h2 className="section-title">{siteContent.socialGallery.title}</h2>
            <p className="section-subtitle mt-4">{siteContent.socialGallery.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteContent.socialGallery.images.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveSocialImage(src)}
                className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] text-left shadow-[0_16px_50px_-20px_rgba(100,75,200,0.3)] transition hover:border-white/20"
              >
                <Image
                  src={src}
                  alt={`Social media creative ${index + 1}`}
                  width={700}
                  height={700}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="pb-24 pt-16 md:pb-32">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-border bg-gradient-to-br from-[#f2ecff] via-[#ecebff] to-[#ffeef8] p-8 shadow-[0_40px_120px_-40px_rgba(120,80,220,0.25)] md:p-14 dark:border-white/12 dark:from-[#3b2d72]/65 dark:via-[#2d2451]/55 dark:to-[#5a2d4b]/50 dark:shadow-[0_40px_120px_-40px_rgba(120,80,220,0.5)]">
            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#ff82c8]/15 blur-[80px] dark:bg-[#ff82c8]/20" />
            <div className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-[#8a6dff]/12 blur-[80px] dark:bg-[#8a6dff]/20" />

            <div className="relative grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {siteContent.contact.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl xl:text-6xl">
                  {siteContent.contact.title}
                  <br />
                  <span className="bg-gradient-to-r from-[#8f72ff] to-[#ff87c7] bg-clip-text text-transparent">
                    {siteContent.contact.accent}
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
                  {siteContent.contact.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {siteContent.contact.links.map((link) => {
                    const Icon = linkIcons[link.kind] ?? ArrowUpRight;

                    return (
                      <a
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/60 px-4 py-2 text-sm text-foreground transition hover:border-primary/40 hover:bg-white/90 dark:bg-white/5 dark:hover:bg-white/10"
                      >
                        <Icon size={15} />
                        {link.label}
                      </a>
                    );
                  })}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-5 rounded-2xl border border-border bg-background/70 px-6 py-5 dark:border-white/10 dark:bg-white/5">
                  {siteContent.contact.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-border bg-background/80 p-6 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25d366]/15">
                    <MessageCircle size={18} className="text-[#25d366]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Message on WhatsApp</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Opens directly in WhatsApp
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${siteContent.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1fba59]"
                >
                  <MessageCircle size={15} />
                  Start WhatsApp chat
                </a>

                <p className="text-center text-[10px] text-muted-foreground">
                  You can change this number, links, and all homepage copy from `/admin`.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter brandName={siteContent.brandName} />
      <Lightbox
        src={activeSocialImage}
        alt="Social media preview"
        onClose={() => setActiveSocialImage(null)}
      />
    </main>
  );
}
