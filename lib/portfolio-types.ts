export type PortfolioCategory =
  | "Product Design"
  | "Website Design"
  | "Mobile App UI"
  | "Branding"
  | "Logo Design"
  | "Social Media Design"
  | "Creative Direction";

export type CaseStudySectionTitle =
  | "Problem"
  | "Research"
  | "User flow"
  | "Wireframes"
  | "Final UI designs"
  | "Design decisions"
  | "Outcome";

export type CaseStudySection = {
  id: string;
  title: CaseStudySectionTitle;
  content: string;
};

export type PortfolioProject = {
  slug: string;
  sortOrder: number;
  title: string;
  description: string;
  category: PortfolioCategory;
  tags: string[];
  featured?: boolean;
  heroImage: string;
  previewImages: string[];
  overview: {
    client: string;
    role: string;
    timeline: string;
    tools: string[];
  };
  links: ProjectLink[];
  sections: CaseStudySection[];
  results: string[];
  images: string[];
  beforeAfter: {
    label: string;
    before: string;
    after: string;
  };
  logos: string[];
  videos: string[];
  pdfs: string[];
  socialMediaPreviews: string[];
};

export type SkillLevel = {
  label: string;
  value: number;
};

export type ShowcaseItem = {
  src: string;
  name: string;
  desc: string;
};

export type ContactLink = {
  label: string;
  href: string;
  kind: "email" | "linkedin" | "behance" | "instagram" | "website";
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "case-study" | "behance" | "dribbble" | "instagram" | "other";
};

export type ContactStat = {
  label: string;
  value: string;
};

export type SiteContent = {
  brandName: string;
  brandRole: string;
  hero: {
    eyebrow: string;
    firstName: string;
    lastName: string;
    intro: string;
    backgroundImages: string[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    tertiaryCtaLabel: string;
    tertiaryCtaHref: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string;
    tools: string[];
    skills: SkillLevel[];
    availableLabel: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
  };
  logoShowcase: {
    eyebrow: string;
    title: string;
    description: string;
    items: ShowcaseItem[];
  };
  socialGallery: {
    eyebrow: string;
    title: string;
    description: string;
    images: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    whatsappNumber: string;
    links: ContactLink[];
    stats: ContactStat[];
  };
};
