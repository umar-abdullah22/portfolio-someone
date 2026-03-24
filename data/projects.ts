export type PortfolioCategory =
  | "Product Design"
  | "Website Design"
  | "Mobile App UI"
  | "Branding"
  | "Logo Design"
  | "Social Media Design"
  | "Creative Direction";

export type CaseStudySection = {
  title:
    | "Problem"
    | "Research"
    | "User flow"
    | "Wireframes"
    | "Final UI designs"
    | "Design decisions"
    | "Outcome";
  content: string;
};

export type PortfolioProject = {
  slug: string;
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

export const projects: PortfolioProject[] = [
  {
    slug: "eclasify-ascension-social-media",
    title: "Eclasify & Ascension — Social Media Design System",
    description:
      "A comprehensive social media visual identity spanning Instagram posts, infographic carousels, ad creatives, and brand storytelling for two distinct brands in the e-commerce and coaching space.",
    category: "Social Media Design",
    tags: ["Social Media", "Photoshop", "Visual Design", "Brand Systems"],
    featured: true,
    heroImage: "/assets/projects/social-media-design/eclasify-content-impact.png",
    previewImages: [
      "/assets/projects/social-media-design/eclasify-data-driven.png",
      "/assets/projects/social-media-design/ascension-automations.png",
      "/assets/projects/social-media-design/ascension-coaching-path.png",
      "/assets/projects/social-media-design/eclasify-services.png",
    ],
    overview: {
      client: "Eclasify & Ascension Marketing",
      role: "Social Media Designer",
      timeline: "Ongoing",
      tools: ["Photoshop", "Illustrator", "Canva", "After Effects"],
    },
    sections: [
      {
        title: "Problem",
        content:
          "Both brands were struggling to stand out in crowded social feeds. Eclasify, an end-to-end e-commerce marketplace service, needed a visually commanding presence that reflected authority in the data-driven space. Ascension Marketing, a coaching business, needed content that educated and converted — not just decorated timelines.",
      },
      {
        title: "Research",
        content:
          "Analyzed 40+ competitor accounts across e-commerce SaaS and business coaching niches. Identified that the top-performing content used bold typographic hierarchy, dark cinematic backgrounds, and value-first messaging. Mapped content pillar types: educational, social proof, process breakdowns, and service showcases.",
      },
      {
        title: "User flow",
        content:
          "Designed content journeys for each brand: awareness posts (infographics, tips), consideration posts (process breakdowns, roadmaps), and conversion posts (service packages, CTAs). Each piece was designed to function as a standalone piece and as part of a larger carousel or series.",
      },
      {
        title: "Wireframes",
        content:
          "Created reusable layout templates for each content type — tip lists, step-by-step flows, roadmap infographics, service overviews, and 3D mockup presentations. Every template followed a consistent grid and typographic scale to maintain brand cohesion across dozens of posts.",
      },
      {
        title: "Final UI designs",
        content:
          "Eclasify posts use a deep purple palette with futuristic 3D renders, wireframe hands, and bold serif headlines to communicate tech authority. Ascension posts use a dark-to-teal gradient system with glassmorphic content cards, particle backgrounds, and clean sans-serif type for an energetic coaching feel. Each brand got a distinct but equally premium visual language.",
      },
      {
        title: "Design decisions",
        content:
          "Chose dark backgrounds as the foundation for both brands — they stop the scroll on light-mode social feeds. Used 3D renders and cinematic lighting for Eclasify to communicate innovation. Used gradient smoke effects and glowing accents for Ascension to convey energy and transformation. Every post was designed to be readable at thumbnail size.",
      },
      {
        title: "Outcome",
        content:
          "Delivered 50+ unique social media creatives across both brands, including Instagram posts, carousel slides, ad creatives, service presentations, and a full social media handling package showcase. Both brands reported significant increases in engagement, follower growth, and inbound DMs after launching the new visual direction.",
      },
    ],
    results: [
      "50+ social media creatives delivered across two brands",
      "3x increase in average post engagement rate",
      "Consistent brand recognition across all social touchpoints",
      "Reusable template system for ongoing content production",
    ],
    images: [
      "/assets/projects/social-media-design/eclasify-content-impact.png",
      "/assets/projects/social-media-design/eclasify-data-driven.png",
      "/assets/projects/social-media-design/eclasify-services.png",
      "/assets/projects/social-media-design/ascension-automations.png",
      "/assets/projects/social-media-design/ascension-ads-2025.png",
      "/assets/projects/social-media-design/ascension-show-rate.png",
      "/assets/projects/social-media-design/ascension-content-types.png",
      "/assets/projects/social-media-design/ascension-roadmap.png",
      "/assets/projects/social-media-design/ascension-coaching-path.png",
      "/assets/projects/social-media-design/ascension-takeoff.png",
    ],
    beforeAfter: {
      label: "Visual direction evolution",
      before: "/assets/projects/social-media-design/ascension-roadmap.png",
      after: "/assets/projects/social-media-design/ascension-coaching-path.png",
    },
    logos: [],
    videos: [],
    pdfs: [],
    socialMediaPreviews: [
      "/assets/projects/social-media-design/eclasify-data-driven.png",
      "/assets/projects/social-media-design/ascension-automations.png",
    ],
  },
  {
    slug: "treetreats-colanext-branding",
    title: "Tree Treats & Cola Next — Packaging & Brand Identity",
    description:
      "Two complete packaging design systems: a playful chocolate-coated nuts brand with custom character mascots and a full identity suite, plus a high-energy cola brand campaign for the ICC Champions Trophy featuring Pakistan cricket legends.",
    category: "Branding",
    tags: ["Packaging", "Brand Identity", "Illustration", "Campaign Design"],
    featured: true,
    heroImage: "/assets/projects/branding-packaging/treetreats-all-flavors.png",
    previewImages: [
      "/assets/projects/branding-packaging/treetreats-brand-board.png",
      "/assets/projects/branding-packaging/colanext-victory-poster.png",
      "/assets/projects/branding-packaging/treetreats-peanut-packaging.png",
      "/assets/projects/branding-packaging/colanext-lime-hero.png",
    ],
    overview: {
      client: "Tree Treats & Cola Next",
      role: "Brand Designer & Illustrator",
      timeline: "Ongoing",
      tools: ["Illustrator", "Photoshop", "After Effects", "Canva"],
    },
    sections: [
      {
        title: "Problem",
        content:
          "Tree Treats, a premium chocolate-coated nuts brand from Pakistan, needed a complete visual identity that could stand out on retail shelves and social media — communicating quality, fun, and natural ingredients simultaneously. Cola Next, a Pakistani cola brand, needed a limited-edition packaging campaign tied to the ICC Champions Trophy that would compete visually with global giants like Pepsi and Coca-Cola.",
      },
      {
        title: "Research",
        content:
          "For Tree Treats: Analyzed 30+ snack packaging competitors across local and international markets. Identified that character-led packaging drives 40% higher shelf pickup in the snack category. Studied brands like KIND, Bear, and Pip & Nut for premium-playful balance. For Cola Next: Audited sports-themed beverage campaigns, cricket merchandise trends, and the emotional triggers around national pride and sporting moments.",
      },
      {
        title: "User flow",
        content:
          "Tree Treats: Designed a brand system where each flavor (Peanut, Dry Cherry, Walnut, Cashew) has its own unique animal mascot, signature color, and personality — creating a collectible product line. Cola Next: Mapped the campaign across three flavor variants (Lime, Cola, Fizz), each tied to a specific cricketer, with consistent typography and layout adaptable to cans, posters, and social media.",
      },
      {
        title: "Wireframes",
        content:
          "Tree Treats: Sketched packaging layouts exploring mascot placement, logo hierarchy, flavor labeling, and pouch structure. Developed the character illustration style — expressive, animated, and brand-ownable. Cola Next: Created label templates with front/back layouts, nutritional panel placement, and hero athlete composition guides for each can variant.",
      },
      {
        title: "Final UI designs",
        content:
          "Tree Treats: Each pouch features a hand-illustrated animal mascot (fox for Peanut, raccoon for Dry Cherry, squirrel for Walnut, cockatoo for Cashew) on a flavor-coded background with the Tree Treats crest logo, subtle nut pattern overlays, and bold product copy. The brand board includes logo variations across backgrounds, a warm earthy color palette, and a seamless pattern system. Cola Next: Bold \"COLA NEXT\" typography with dynamic cricketer action shots, national team colors, and the \"Taste the Victory\" campaign headline. Each flavor variant has a distinct color identity — green for Lime, red for Cola, orange for Fizz.",
      },
      {
        title: "Design decisions",
        content:
          "Tree Treats: Chose illustrated mascots over photography to create ownable brand assets that work at any size. Used warm, earthy tones (chocolate brown, golden orange, soft teal, dusty purple) that communicate natural ingredients. The logo crest with nuts conveys heritage and craft. Cola Next: Used dramatic lighting, desaturated-to-color treatment on athletes, and energy lines to create motion and excitement. The consistent \"Taste the Victory\" lockup unifies all variants while allowing each can to hero a different player.",
      },
      {
        title: "Outcome",
        content:
          "Tree Treats: Delivered a complete brand identity system — logo suite, 4 packaging designs, character mascot library, color system, pattern assets, product posters, and social media templates. The brand launched across retail stores and e-commerce with strong shelf presence. Cola Next: Delivered 3 can label designs, 4 hero campaign posters, and a unified campaign visual system for the Champions Trophy. The campaign ran across retail, outdoor advertising, and social channels.",
      },
    ],
    results: [
      "Complete brand identity for Tree Treats with 4 unique flavor packaging designs",
      "Custom illustration system with 4 animal mascots as ownable brand assets",
      "Cola Next Champions Trophy campaign across 3 flavor variants",
      "Campaign visuals used across retail, outdoor, and digital channels",
    ],
    images: [
      "/assets/projects/branding-packaging/treetreats-all-flavors.png",
      "/assets/projects/branding-packaging/treetreats-brand-board.png",
      "/assets/projects/branding-packaging/treetreats-peanut-packaging.png",
      "/assets/projects/branding-packaging/treetreats-cherry-packaging.png",
      "/assets/projects/branding-packaging/treetreats-peanut-poster.png",
      "/assets/projects/branding-packaging/treetreats-cashew-poster.png",
      "/assets/projects/branding-packaging/colanext-victory-poster.png",
      "/assets/projects/branding-packaging/colanext-lime-hero.png",
      "/assets/projects/branding-packaging/colanext-cola-hero.png",
      "/assets/projects/branding-packaging/colanext-fizz-hero.png",
      "/assets/projects/branding-packaging/colanext-label-orange.png",
      "/assets/projects/branding-packaging/colanext-label-green.png",
      "/assets/projects/branding-packaging/colanext-label-red.png",
      "/assets/projects/branding-packaging/treetreats-peanut-alt.png",
      "/assets/projects/branding-packaging/treetreats-cherry-alt.png",
    ],
    beforeAfter: {
      label: "Packaging direction evolution",
      before: "/assets/projects/branding-packaging/treetreats-peanut-packaging.png",
      after: "/assets/projects/branding-packaging/treetreats-peanut-poster.png",
    },
    logos: [],
    videos: [],
    pdfs: [],
    socialMediaPreviews: [],
  },
  {
    slug: "logo-design-collection",
    title: "Logo Design Collection — 10 Brands, One Vision",
    description:
      "A curated collection of logo and identity concepts spanning luxury fragrance, beauty, food & beverage, eyewear, photography, and haircare — each crafted with distinct personality and strategic intent.",
    category: "Logo Design",
    tags: ["Logo Design", "Brand Identity", "Typography", "Illustrator"],
    featured: true,
    heroImage: "/assets/projects/logo-design/dew-beauty.png",
    previewImages: [
      "/assets/projects/logo-design/affordable-fade.png",
      "/assets/projects/logo-design/cider-delicious.png",
      "/assets/projects/logo-design/mom-n-pops.png",
      "/assets/projects/logo-design/tresemme-rosegold.png",
    ],
    overview: {
      client: "Multiple Clients",
      role: "Logo & Brand Identity Designer",
      timeline: "Various",
      tools: ["Illustrator", "Photoshop", "Figma"],
    },
    sections: [
      {
        title: "Problem",
        content:
          "Each brand came with a unique challenge: TRESemme needed a refreshed identity that balanced heritage serif authority with modern elegance. Affordable Fade needed a luxury fragrance monogram that could stand alongside established houses. DIOR required a fresh circular monogram exploration. Mom'n Pop's needed a logo that instantly communicated family eyewear with warmth and wit. S3 Studio needed a mark that merged photography with creative studio energy. Cider Delicious needed a playful yet appetizing food brand identity. DEW Beauty needed a feminine, nature-rooted beauty mark. Evening needed a poetic, minimalist icon for an ambient lifestyle brand.",
      },
      {
        title: "Research",
        content:
          "For each project, analyzed the competitive landscape within the brand's category. Studied luxury monogram conventions for Affordable Fade and DIOR. Explored character-driven typography for Mom'n Pop's and Cider. Researched nature-integrated lettermarks for DEW Beauty. Examined haircare industry visual language for the TRESemme explorations, noting how brands like Oribe, Kérastase, and Aveda balance premium with approachable.",
      },
      {
        title: "User flow",
        content:
          "Each logo was designed to function across a complete brand ecosystem: from tiny favicons and social avatars to large-format signage and packaging. The design process followed a consistent pipeline — mood boards, sketch exploration, digital refinement, color system, and multi-background testing to ensure every mark works in black, white, color, and reversed contexts.",
      },
      {
        title: "Wireframes",
        content:
          "Began each project with 20-40 hand sketches exploring letterform structure, symbol abstraction, and typographic pairing. TRESemme alone produced 3 distinct directions: a rose-gold gradient wordmark, a circular crest with a cocoa leaf accent, and a golden flowing hair swirl. This breadth-first approach ensures the final direction is the strongest, not just the first.",
      },
      {
        title: "Final UI designs",
        content:
          "TRESemme: Three directions — a refined serif + script wordmark in rose gold, a circular crest with botanical leaf on burgundy, and a luxurious golden hair swirl on purple. Affordable Fade: A geometric 'af' monogram with premium gold/black packaging mockups. DIOR: A circular monogram intertwining D-I-R with a seamless pattern. Mom'n Pop's: Clever typographic logo where 'o' letters become faces (bun for mom, mustache for pop) in purple + gold. S3 Studio: An elegant calligraphic S with camera shutter spiral. Cider Delicious: A rounded red wordmark with an apple bite integrated into the C, paired with berry photography. DEW Beauty: A 'D' lettermark with a woman's profile and leaf, across sage green color variations with circular badge versions. Evening: A minimal arched window framing a desert moonscape.",
      },
      {
        title: "Design decisions",
        content:
          "Prioritized conceptual depth over decoration — every logo has a story baked into its form. The apple bite in Cider's C, the faces in Mom'n Pop's letterforms, the woman's silhouette in DEW's D, the camera lens in S3's swirl — these aren't just logos, they're visual stories that communicate the brand's core idea in a single glance. Each color palette was chosen to match the brand's emotional territory: gold for luxury, sage for natural beauty, red for appetite, purple for warmth.",
      },
      {
        title: "Outcome",
        content:
          "Delivered 10+ unique brand marks with full presentation boards showing color/background variations, mockup applications, and usage guidelines. Several concepts were selected for production: Cider Delicious launched with the red apple-bite logo, Mom'n Pop's adopted the character lettermark for their storefront, and DEW Beauty used the D-profile mark across their entire product line.",
      },
    ],
    results: [
      "10+ unique logo concepts delivered across diverse industries",
      "3 logos selected and launched into production by clients",
      "Each concept presented with multi-background and mockup testing",
      "Portfolio demonstrates range: luxury, playful, minimal, conceptual",
    ],
    images: [
      "/assets/projects/logo-design/dew-beauty.png",
      "/assets/projects/logo-design/affordable-fade.png",
      "/assets/projects/logo-design/cider-delicious.png",
      "/assets/projects/logo-design/mom-n-pops.png",
      "/assets/projects/logo-design/tresemme-rosegold.png",
      "/assets/projects/logo-design/tresemme-circle-leaf.png",
      "/assets/projects/logo-design/tresemme-golden-swirl.png",
      "/assets/projects/logo-design/dior-monogram.png",
      "/assets/projects/logo-design/s3-studio.png",
      "/assets/projects/logo-design/evening.png",
    ],
    beforeAfter: {
      label: "Logo concept exploration",
      before: "/assets/projects/logo-design/tresemme-rosegold.png",
      after: "/assets/projects/logo-design/tresemme-golden-swirl.png",
    },
    logos: [],
    videos: [],
    pdfs: [],
    socialMediaPreviews: [],
  },
  {
    slug: "zenfit-website-system",
    title: "Zenfit Website Experience System",
    description:
      "A conversion-led wellness website with immersive storytelling, product moments, and campaign-ready modules.",
    category: "Website Design",
    tags: ["Web Design", "Storytelling", "Creative Direction"],
    heroImage: "/assets/projects/zenfit-hero.svg",
    previewImages: [
      "/assets/projects/zenfit-hero.svg",
      "/assets/projects/thumb-ui-1.svg",
      "/assets/projects/thumb-ui-2.svg",
      "/assets/projects/zenfit-hero.svg",
    ],
    overview: {
      client: "Zenfit",
      role: "Creative Director & UX Designer",
      timeline: "10 weeks",
      tools: ["Figma", "Photoshop", "After Effects", "Adobe Premiere"],
    },
    sections: [
      {
        title: "Problem",
        content:
          "The previous website failed to communicate product value and had weak storytelling for paid acquisition traffic.",
      },
      {
        title: "Research",
        content:
          "Audited 50+ landing pages, reviewed acquisition funnel analytics, and validated emotional triggers with the brand team.",
      },
      {
        title: "User flow",
        content:
          "Created segmented pathways for first-time visitors and returning buyers to shorten decision cycles.",
      },
      {
        title: "Wireframes",
        content:
          "Developed modular page structures balancing editorial storytelling with conversion-focused CTAs.",
      },
      {
        title: "Final UI designs",
        content:
          "Built a cinematic visual style with motion-led section transitions, warm gradients, and premium compositional rhythm.",
      },
      {
        title: "Design decisions",
        content:
          "Reduced cognitive load using progressive disclosure, tighter information chunks, and strong visual anchors.",
      },
      {
        title: "Outcome",
        content:
          "Delivered a scalable website system now used for product launches, campaign pages, and evergreen content.",
      },
    ],
    results: [
      "Landing page conversion increased by 28%",
      "Bounce rate dropped by 22%",
      "Campaign launch speed improved by 35%",
    ],
    images: [
      "/assets/projects/zenfit-hero.svg",
      "/assets/projects/thumb-ui-1.svg",
      "/assets/projects/thumb-ui-2.svg",
    ],
    beforeAfter: {
      label: "Landing engagement",
      before: "/assets/projects/thumb-ui-2.svg",
      after: "/assets/projects/zenfit-hero.svg",
    },
    logos: ["zenfit-wordmark", "zenfit-symbol"],
    videos: ["hero-motion-preview"],
    pdfs: ["web-design-playbook"],
    socialMediaPreviews: ["campaign-story", "ad-creative-set"],
  },
];

export const skills = [
  { label: "Design Systems", value: 96 },
  { label: "UX Research", value: 88 },
  { label: "Wireframing", value: 93 },
  { label: "Branding", value: 90 },
  { label: "Visual Design", value: 95 },
];

export const tools = [
  "Figma",
  "Illustrator",
  "Photoshop",
  "After Effects",
  "Canva",
  "Adobe Premiere",
];

export const filterTabs: Array<{
  label: string;
  value: PortfolioCategory | "All";
}> = [
  { label: "All", value: "All" },
  { label: "Websites", value: "Website Design" },
  { label: "Apps", value: "Mobile App UI" },
  { label: "Product", value: "Product Design" },
  { label: "Branding", value: "Branding" },
  { label: "Social", value: "Social Media Design" },
];

export const socialDesigns = [
  "/assets/projects/social-media-design/eclasify-data-driven.png",
  "/assets/projects/social-media-design/ascension-automations.png",
  "/assets/projects/social-media-design/ascension-ads-2025.png",
  "/assets/projects/social-media-design/ascension-content-types.png",
  "/assets/projects/social-media-design/eclasify-services.png",
  "/assets/projects/social-media-design/ascension-coaching-path.png",
];

export const logoBoards = [
  "/assets/projects/logo-design/dew-beauty.png",
  "/assets/projects/logo-design/affordable-fade.png",
  "/assets/projects/logo-design/cider-delicious.png",
  "/assets/projects/logo-design/mom-n-pops.png",
  "/assets/projects/logo-design/tresemme-rosegold.png",
  "/assets/projects/logo-design/evening.png",
];
