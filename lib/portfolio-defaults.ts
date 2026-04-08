import {
  filterTabs,
  logoBoards,
  projects,
  skills,
  socialDesigns,
  tools,
} from "../data/projects";
import type { PortfolioProject, SiteContent } from "./portfolio-types";

export const defaultSiteContent: SiteContent = {
  brandName: "Momna Zaheer",
  brandRole: "UI/UX Designer & Graphic Designer",
  hero: {
    eyebrow: "UI/UX Designer & Graphic Designer",
    firstName: "MOMNA",
    lastName: "ZAHEER",
    intro:
      "I craft interfaces where every pixel has a purpose, every transition tells a story, and every system scales beautifully.",
    backgroundImages: [
      "/assets/hero/momna-hero-01.jpg",
      "/assets/hero/momna-hero-02.jpg",
    ],
    primaryCtaLabel: "View Work",
    primaryCtaHref: "#work",
    secondaryCtaLabel: "Resume",
    secondaryCtaHref: "/assets/momna-zaheer-resume.pdf",
    tertiaryCtaLabel: "Hire Me",
    tertiaryCtaHref: "#contact",
  },
  about: {
    eyebrow: "About",
    title: "Design with strategy.\nCraft with emotion.",
    intro:
      "I'm Momna — a UI/UX and visual designer who builds intuitive products and distinctive brand experiences. My process combines research, systems thinking, and a sharp aesthetic point of view to create work that performs as beautifully as it looks.",
    body:
      "I believe great design isn't decoration — it's a strategic advantage. Every pixel, every transition, every system I build is intentional.",
    tools,
    skills,
    availableLabel: "Available for work",
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Selected Work",
    description:
      "Case studies built for design leaders, recruiters, and product teams evaluating craft, process, and measurable impact.",
  },
  logoShowcase: {
    eyebrow: "Brand Identity",
    title: "Logo & identity showcase",
    description:
      "Conceptual logo explorations across luxury, food, beauty, and lifestyle — each mark tells a story in a single glance.",
    items: [
      {
        src: logoBoards[0],
        name: "DEW Beauty",
        desc: "Nature-rooted beauty mark with woman's silhouette",
      },
      {
        src: logoBoards[1],
        name: "Affordable Fade",
        desc: "Luxury fragrance monogram with gold/black identity",
      },
      {
        src: logoBoards[2],
        name: "Cider Delicious",
        desc: "Playful food brand with apple-bite letterform",
      },
      {
        src: logoBoards[3],
        name: "Mom'n Pop's",
        desc: "Family eyewear with character-integrated typography",
      },
      {
        src: logoBoards[4],
        name: "TRESemme",
        desc: "Haircare rebrand with rose gold serif + script",
      },
      {
        src: logoBoards[5],
        name: "Evening",
        desc: "Minimalist desert moonscape in an arch",
      },
    ],
  },
  socialGallery: {
    eyebrow: "Visual Content",
    title: "Social media design direction",
    description:
      "Instagram posts, carousel systems, and ad creatives presented as a polished Dribbble-style gallery.",
    images: socialDesigns,
  },
  contact: {
    eyebrow: "Let's collaborate",
    title: "Let's create something",
    accent: "amazing together.",
    description:
      "I'm available for full-time roles, freelance collaborations, and design consulting for startups and product teams.",
    whatsappNumber: "923004888406",
    links: [
      { label: "Email", href: "mailto:momnazaheer456@gmail.com", kind: "email" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/momna-zaheer-607185351/",
        kind: "linkedin",
      },
      {
        label: "Behance",
        href: "https://www.behance.net/",
        kind: "behance",
      },
    ],
    stats: [
      { label: "Years exp", value: "1+" },
      { label: "Projects", value: "10+" },
      { label: "Brands", value: "5+" },
    ],
  },
};

export const defaultProjects: PortfolioProject[] = projects.map((project, index) => ({
  ...project,
  sortOrder: index + 1,
  links: [],
  sections: project.sections.map((section, sectionIndex) => ({
    id: `${project.slug}-${sectionIndex + 1}`,
    ...section,
  })),
}));

export const defaultFilterTabs = filterTabs;
