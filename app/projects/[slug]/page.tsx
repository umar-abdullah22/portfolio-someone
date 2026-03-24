import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

import { CaseStudyGallery } from "@/components/case-study-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const hasRealImages = project.images.some((img) => img.endsWith(".png") || img.endsWith(".jpg"));

  return (
    <main className="min-h-screen pb-20">
      <SiteHeader />
      <div className="container">
        <div className="pt-32" />
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/#work">
            <ArrowLeft size={16} /> Back to work
          </Link>
        </Button>

        {/* ── Hero ── */}
        <section className="overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-white/[0.06] to-transparent p-6 shadow-[0_30px_100px_-30px_rgba(100,75,200,0.35)] md:p-10">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={project.heroImage}
              alt={`${project.title} hero`}
              width={1600}
              height={1000}
              priority
              className="h-[320px] w-full object-cover md:h-[480px]"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {project.category}
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight md:text-5xl xl:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.description}
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 md:grid-cols-4">
            <Meta label="Client" value={project.overview.client} />
            <Meta label="Role" value={project.overview.role} />
            <Meta label="Timeline" value={project.overview.timeline} />
            <Meta label="Tools" value={project.overview.tools.join(", ")} />
          </div>
        </section>

        {/* ── Case study sections ── */}
        <section className="mt-12 space-y-5">
          {project.sections.map((section, i) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
                  Case study
                </p>
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </article>
          ))}
        </section>

        {/* ── Full image gallery (for projects with real images) ── */}
        {hasRealImages && (
          <section className="mt-12">
            <h3 className="mb-6 font-display text-2xl">Work Gallery</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.images.map((src, i) => (
                <div
                  key={`gallery-${i}`}
                  className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] transition hover:border-white/20"
                >
                  <Image
                    src={src}
                    alt={`${project.title} work ${i + 1}`}
                    width={800}
                    height={800}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Before / After + standard gallery ── */}
        <CaseStudyGallery
          images={hasRealImages ? [] : project.images}
          beforeAfter={project.beforeAfter}
          title={project.title}
        />

        {/* ── Results ── */}
        <section className="mt-12 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-[#6e58c9]/25 to-[#ff85cc]/15 p-7 md:p-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
            Impact
          </p>
          <h3 className="mt-2 font-display text-2xl md:text-3xl">Results</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {project.results.map((result, i) => (
              <div
                key={result}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed">{result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Next project ── */}
        <div className="mt-12 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Next project
            </p>
            <p className="mt-1 font-display text-lg">{nextProject.title}</p>
          </div>
          <Button asChild size="lg">
            <Link href={`/projects/${nextProject.slug}`}>
              View <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-16">
        <SiteFooter />
      </div>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}
