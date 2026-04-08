"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";

import { defaultProjects, defaultSiteContent } from "@/lib/portfolio-defaults";
import { db } from "@/lib/firebase";
import type { PortfolioProject, SiteContent } from "@/lib/portfolio-types";

const SETTINGS_COLLECTION = "settings";
const SITE_CONTENT_DOC = "siteContent";
const PROJECTS_COLLECTION = "projects";

function mergeSiteContent(partial?: Partial<SiteContent>): SiteContent {
  return {
    ...defaultSiteContent,
    ...partial,
    hero: { ...defaultSiteContent.hero, ...partial?.hero },
    about: {
      ...defaultSiteContent.about,
      ...partial?.about,
      tools: partial?.about?.tools ?? defaultSiteContent.about.tools,
      skills: partial?.about?.skills ?? defaultSiteContent.about.skills,
    },
    portfolio: { ...defaultSiteContent.portfolio, ...partial?.portfolio },
    logoShowcase: {
      ...defaultSiteContent.logoShowcase,
      ...partial?.logoShowcase,
      items:
        partial?.logoShowcase?.items ?? defaultSiteContent.logoShowcase.items,
    },
    socialGallery: {
      ...defaultSiteContent.socialGallery,
      ...partial?.socialGallery,
      images:
        partial?.socialGallery?.images ?? defaultSiteContent.socialGallery.images,
    },
    contact: {
      ...defaultSiteContent.contact,
      ...partial?.contact,
      links: partial?.contact?.links ?? defaultSiteContent.contact.links,
      stats: partial?.contact?.stats ?? defaultSiteContent.contact.stats,
    },
  };
}

function normalizeProject(
  project: Partial<PortfolioProject>,
  index: number
): PortfolioProject {
  const fallback = defaultProjects[index] ?? defaultProjects[0];

  return {
    ...fallback,
    ...project,
    sortOrder: project.sortOrder ?? fallback.sortOrder ?? index + 1,
    tags: project.tags ?? fallback.tags,
    previewImages: project.previewImages ?? fallback.previewImages,
    sections: project.sections ?? fallback.sections,
    results: project.results ?? fallback.results,
    images: project.images ?? fallback.images,
    overview: {
      ...fallback.overview,
      ...project.overview,
      tools: project.overview?.tools ?? fallback.overview.tools,
    },
    links: project.links ?? fallback.links ?? [],
    beforeAfter: {
      ...fallback.beforeAfter,
      ...project.beforeAfter,
    },
    logos: project.logos ?? fallback.logos,
    videos: project.videos ?? fallback.videos,
    pdfs: project.pdfs ?? fallback.pdfs,
    socialMediaPreviews:
      project.socialMediaPreviews ?? fallback.socialMediaPreviews,
  };
}

export async function loadSiteContent(): Promise<SiteContent> {
  try {
    const snapshot = await getDoc(doc(db, SETTINGS_COLLECTION, SITE_CONTENT_DOC));

    if (!snapshot.exists()) {
      return defaultSiteContent;
    }

    return mergeSiteContent(snapshot.data() as Partial<SiteContent>);
  } catch {
    return defaultSiteContent;
  }
}

export async function loadProjects(): Promise<PortfolioProject[]> {
  try {
    const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));

    if (snapshot.empty) {
      return defaultProjects;
    }

    return snapshot.docs
      .map((documentSnapshot, index) =>
        normalizeProject(documentSnapshot.data() as PortfolioProject, index)
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return defaultProjects;
  }
}

export async function saveSiteContent(content: SiteContent) {
  await setDoc(doc(db, SETTINGS_COLLECTION, SITE_CONTENT_DOC), content, {
    merge: true,
  });
}

export async function saveProject(project: PortfolioProject) {
  await setDoc(doc(db, PROJECTS_COLLECTION, project.slug), project, {
    merge: true,
  });
}

export async function deleteProject(slug: string) {
  await deleteDoc(doc(db, PROJECTS_COLLECTION, slug));
}

export async function seedPortfolioData() {
  const batch = writeBatch(db);

  batch.set(doc(db, SETTINGS_COLLECTION, SITE_CONTENT_DOC), defaultSiteContent, {
    merge: true,
  });

  defaultProjects.forEach((project) => {
    batch.set(doc(db, PROJECTS_COLLECTION, project.slug), project, {
      merge: true,
    });
  });

  await batch.commit();
}
