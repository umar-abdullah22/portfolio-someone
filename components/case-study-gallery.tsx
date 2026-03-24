"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/ui/lightbox";

export function CaseStudyGallery({
  images,
  beforeAfter,
  title
}: {
  images: string[];
  beforeAfter: { label: string; before: string; after: string };
  title: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActive(image)}
            className="group overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={image}
              alt={`${title} screenshot ${index + 1}`}
              width={1200}
              height={760}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Before
          </p>
          <h4 className="mt-2 font-display text-xl">{beforeAfter.label}</h4>
          <button
            type="button"
            onClick={() => setActive(beforeAfter.before)}
            className="mt-4 overflow-hidden rounded-xl border border-white/15"
          >
            <Image
              src={beforeAfter.before}
              alt={`${title} before visual`}
              width={1200}
              height={760}
              className="h-56 w-full object-cover"
            />
          </button>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            After
          </p>
          <h4 className="mt-2 font-display text-xl">Refined design direction</h4>
          <button
            type="button"
            onClick={() => setActive(beforeAfter.after)}
            className="mt-4 overflow-hidden rounded-xl border border-white/15"
          >
            <Image
              src={beforeAfter.after}
              alt={`${title} after visual`}
              width={1200}
              height={760}
              className="h-56 w-full object-cover"
            />
          </button>
        </article>
      </section>

      <Lightbox src={active} alt={`${title} zoom preview`} onClose={() => setActive(null)} />
    </>
  );
}
