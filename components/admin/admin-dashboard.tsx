"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  Link2,
  LogOut,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { uploadImageFile } from "@/lib/storage-upload";
import {
  deleteProject,
  saveProject,
  saveSiteContent,
  seedPortfolioData,
} from "@/lib/portfolio-store";
import type {
  CaseStudySection,
  ContactLink,
  ContactStat,
  PortfolioProject,
  ProjectLink,
  ShowcaseItem,
  SiteContent,
  SkillLevel,
} from "@/lib/portfolio-types";

const sectionTitles: CaseStudySection["title"][] = [
  "Problem",
  "Research",
  "User flow",
  "Wireframes",
  "Final UI designs",
  "Design decisions",
  "Outcome",
];

type Toast = {
  id: number;
  tone: "success" | "error";
  message: string;
};

function newProjectTemplate(order: number): PortfolioProject {
  return {
    slug: `new-project-${order}`,
    sortOrder: order,
    title: "New Project",
    description: "Describe the project here.",
    category: "Website Design",
    tags: ["Design"],
    featured: false,
    heroImage: "",
    previewImages: [],
    overview: {
      client: "",
      role: "",
      timeline: "",
      tools: [],
    },
    links: [],
    sections: [
      {
        id: `section-${Date.now()}`,
        title: "Problem",
        content: "",
      },
    ],
    results: [],
    images: [],
    beforeAfter: {
      label: "",
      before: "",
      after: "",
    },
    logos: [],
    videos: [],
    pdfs: [],
    socialMediaPreviews: [],
  };
}

export function AdminDashboard() {
  const router = useRouter();
  const { siteContent, projects, setProjects, setSiteContent } = usePortfolioData();
  const [siteDraft, setSiteDraft] = useState<SiteContent>(siteContent);
  const [projectDrafts, setProjectDrafts] = useState<PortfolioProject[]>(projects);
  const [selectedSlug, setSelectedSlug] = useState<string>(projects[0]?.slug ?? "");
  const [activeTab, setActiveTab] = useState<"site" | "projects">("site");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  useEffect(() => {
    setSiteDraft(siteContent);
  }, [siteContent]);

  useEffect(() => {
    setProjectDrafts(projects);
    if (!selectedSlug && projects[0]?.slug) {
      setSelectedSlug(projects[0].slug);
    }
  }, [projects, selectedSlug]);

  function pushToast(tone: Toast["tone"], message: string) {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, tone, message }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }

  const selectedProject = useMemo(
    () => projectDrafts.find((project) => project.slug === selectedSlug),
    [projectDrafts, selectedSlug]
  );

  function updateSiteContent(updater: (current: SiteContent) => SiteContent) {
    setSiteDraft((current) => updater(current));
  }

  function updateProject(updater: (current: PortfolioProject) => PortfolioProject) {
    setProjectDrafts((current) =>
      current.map((project) =>
        project.slug === selectedSlug ? updater(project) : project
      )
    );
  }

  async function runAction<T>(key: string, action: () => Promise<T>) {
    try {
      setBusyAction(key);
      return await action();
    } finally {
      setBusyAction(null);
    }
  }

  async function handleSaveSite() {
    try {
      await runAction("save-site", () => saveSiteContent(siteDraft));
      setSiteContent(siteDraft);
      pushToast("success", "Homepage content saved.");
    } catch {
      pushToast("error", "Could not save homepage content.");
    }
  }

  async function handleSaveProject() {
    if (!selectedProject) return;

    try {
      await runAction("save-project", () => saveProject(selectedProject));
      setProjects(projectDrafts);
      pushToast("success", `${selectedProject.title} saved.`);
    } catch {
      pushToast("error", `Could not save ${selectedProject.title}.`);
    }
  }

  async function handleDeleteProject() {
    if (!selectedProject) return;
    if (!window.confirm(`Delete ${selectedProject.title}?`)) return;

    try {
      await runAction("delete-project", () => deleteProject(selectedProject.slug));
      const nextProjects = projectDrafts.filter(
        (project) => project.slug !== selectedProject.slug
      );
      setProjectDrafts(nextProjects);
      setProjects(nextProjects);
      setSelectedSlug(nextProjects[0]?.slug ?? "");
      pushToast("success", `${selectedProject.title} deleted.`);
    } catch {
      pushToast("error", `Could not delete ${selectedProject.title}.`);
    }
  }

  async function handleSeed() {
    try {
      await runAction("seed", () => seedPortfolioData());
      router.refresh();
      pushToast("success", "Firebase seeded with the current portfolio.");
    } catch {
      pushToast("error", "Could not seed Firebase.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  function addProject() {
    const nextProject = newProjectTemplate(projectDrafts.length + 1);
    const nextProjects = [...projectDrafts, nextProject];
    setProjectDrafts(nextProjects);
    setSelectedSlug(nextProject.slug);
    setActiveTab("projects");
    pushToast("success", "New project draft created.");
  }

  return (
    <main className="min-h-screen pb-16">
      <div className="container pt-10">
        <div className="rounded-[2rem] border border-white/12 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
                <ShieldCheck size={14} />
                Hidden admin portal
              </p>
              <h1 className="mt-3 font-display text-4xl">Portfolio control center</h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
                Edit the homepage, manage projects, upload or replace images from the
                device gallery, and add optional live links for each case study.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant={activeTab === "site" ? "default" : "secondary"}
                onClick={() => setActiveTab("site")}
              >
                Homepage content
              </Button>
              <Button
                type="button"
                variant={activeTab === "projects" ? "default" : "secondary"}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSeed}
                disabled={busyAction === "seed"}
              >
                <ImagePlus size={15} />
                {busyAction === "seed" ? "Seeding..." : "Seed current content"}
              </Button>
              <Button type="button" variant="ghost" onClick={handleLogout}>
                <LogOut size={15} />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "site" ? (
          <section className="mt-8 rounded-[2rem] border border-white/12 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-primary">
                  Site settings
                </p>
                <h2 className="mt-2 font-display text-2xl">Homepage content</h2>
              </div>
              <Button
                type="button"
                onClick={handleSaveSite}
                disabled={busyAction === "save-site"}
              >
                <Save size={15} />
                {busyAction === "save-site" ? "Saving..." : "Save site"}
              </Button>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <EditorCard title="Brand">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Brand name"
                    value={siteDraft.brandName}
                    onChange={(value) =>
                      updateSiteContent((current) => ({ ...current, brandName: value }))
                    }
                  />
                  <InputField
                    label="Brand role"
                    value={siteDraft.brandRole}
                    onChange={(value) =>
                      updateSiteContent((current) => ({ ...current, brandRole: value }))
                    }
                  />
                </div>
              </EditorCard>

              <EditorCard title="Hero">
                <div className="space-y-4">
                  <InputField
                    label="Eyebrow"
                    value={siteDraft.hero.eyebrow}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        hero: { ...current.hero, eyebrow: value },
                      }))
                    }
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                      label="First line"
                      value={siteDraft.hero.firstName}
                      onChange={(value) =>
                        updateSiteContent((current) => ({
                          ...current,
                          hero: { ...current.hero, firstName: value },
                        }))
                      }
                    />
                    <InputField
                      label="Second line"
                      value={siteDraft.hero.lastName}
                      onChange={(value) =>
                        updateSiteContent((current) => ({
                          ...current,
                          hero: { ...current.hero, lastName: value },
                        }))
                      }
                    />
                  </div>
                  <TextareaField
                    label="Intro"
                    value={siteDraft.hero.intro}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        hero: { ...current.hero, intro: value },
                      }))
                    }
                  />
                  <ImageListEditor
                    label="Hero background images"
                    items={siteDraft.hero.backgroundImages}
                    onChange={(items) =>
                      updateSiteContent((current) => ({
                        ...current,
                        hero: { ...current.hero, backgroundImages: items },
                      }))
                    }
                    folder="site/hero"
                    onToast={pushToast}
                  />
                </div>
              </EditorCard>

              <EditorCard title="About">
                <div className="space-y-4">
                  <InputField
                    label="Section title"
                    value={siteDraft.about.title}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        about: { ...current.about, title: value },
                      }))
                    }
                  />
                  <TextareaField
                    label="About intro"
                    value={siteDraft.about.intro}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        about: { ...current.about, intro: value },
                      }))
                    }
                  />
                  <TextareaField
                    label="About body"
                    value={siteDraft.about.body}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        about: { ...current.about, body: value },
                      }))
                    }
                  />
                  <StringListEditor
                    label="Tools"
                    items={siteDraft.about.tools}
                    onChange={(items) =>
                      updateSiteContent((current) => ({
                        ...current,
                        about: { ...current.about, tools: items },
                      }))
                    }
                  />
                  <SkillEditor
                    items={siteDraft.about.skills}
                    onChange={(items) =>
                      updateSiteContent((current) => ({
                        ...current,
                        about: { ...current.about, skills: items },
                      }))
                    }
                  />
                </div>
              </EditorCard>

              <EditorCard title="Logo showcase">
                <div className="space-y-4">
                  <InputField
                    label="Title"
                    value={siteDraft.logoShowcase.title}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        logoShowcase: { ...current.logoShowcase, title: value },
                      }))
                    }
                  />
                  <TextareaField
                    label="Description"
                    value={siteDraft.logoShowcase.description}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        logoShowcase: { ...current.logoShowcase, description: value },
                      }))
                    }
                  />
                  <ShowcaseEditor
                    items={siteDraft.logoShowcase.items}
                    onChange={(items) =>
                      updateSiteContent((current) => ({
                        ...current,
                        logoShowcase: { ...current.logoShowcase, items },
                      }))
                    }
                    onToast={pushToast}
                  />
                </div>
              </EditorCard>

              <EditorCard title="Social gallery">
                <div className="space-y-4">
                  <InputField
                    label="Title"
                    value={siteDraft.socialGallery.title}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        socialGallery: { ...current.socialGallery, title: value },
                      }))
                    }
                  />
                  <TextareaField
                    label="Description"
                    value={siteDraft.socialGallery.description}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        socialGallery: { ...current.socialGallery, description: value },
                      }))
                    }
                  />
                  <ImageListEditor
                    label="Social gallery images"
                    items={siteDraft.socialGallery.images}
                    onChange={(items) =>
                      updateSiteContent((current) => ({
                        ...current,
                        socialGallery: { ...current.socialGallery, images: items },
                      }))
                    }
                    folder="site/social-gallery"
                    onToast={pushToast}
                  />
                </div>
              </EditorCard>

              <EditorCard title="Contact">
                <div className="space-y-4">
                  <InputField
                    label="WhatsApp number"
                    value={siteDraft.contact.whatsappNumber}
                    onChange={(value) =>
                      updateSiteContent((current) => ({
                        ...current,
                        contact: { ...current.contact, whatsappNumber: value },
                      }))
                    }
                  />
                  <ContactLinksEditor
                    items={siteDraft.contact.links}
                    onChange={(items) =>
                      updateSiteContent((current) => ({
                        ...current,
                        contact: { ...current.contact, links: items },
                      }))
                    }
                  />
                  <StatsEditor
                    items={siteDraft.contact.stats}
                    onChange={(items) =>
                      updateSiteContent((current) => ({
                        ...current,
                        contact: { ...current.contact, stats: items },
                      }))
                    }
                  />
                </div>
              </EditorCard>
            </div>
          </section>
        ) : (
          <section className="mt-8 rounded-[2rem] border border-white/12 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-primary">
                  Projects
                </p>
                <h2 className="mt-2 font-display text-2xl">Case-study editor</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={addProject}>
                  <Plus size={15} />
                  New project
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveProject}
                  disabled={!selectedProject || busyAction === "save-project"}
                >
                  <Save size={15} />
                  {busyAction === "save-project" ? "Saving..." : "Save project"}
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-3">
                <div className="space-y-2">
                  {projectDrafts
                    .slice()
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((project) => (
                      <button
                        key={project.slug}
                        type="button"
                        onClick={() => setSelectedSlug(project.slug)}
                        className={`w-full rounded-2xl px-4 py-4 text-left transition ${
                          selectedSlug === project.slug
                            ? "bg-primary text-primary-foreground"
                            : "bg-white/[0.03] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
                        }`}
                      >
                        <p className="font-medium">{project.title}</p>
                        <p className="mt-1 text-xs opacity-80">{project.slug}</p>
                      </button>
                    ))}
                </div>
              </div>

              {selectedProject ? (
                <div className="space-y-6">
                  <EditorCard title="Overview">
                    <div className="space-y-4">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <InputField
                          label="Slug"
                          value={selectedProject.slug}
                          onChange={(value) => {
                            const nextSlug = slugify(value);
                            setProjectDrafts((current) =>
                              current.map((project) =>
                                project.slug === selectedSlug
                                  ? { ...project, slug: nextSlug }
                                  : project
                              )
                            );
                            setSelectedSlug(nextSlug);
                          }}
                        />
                        <InputField
                          label="Title"
                          value={selectedProject.title}
                          onChange={(value) =>
                            updateProject((current) => ({ ...current, title: value }))
                          }
                        />
                      </div>

                      <div className="grid gap-4 lg:grid-cols-4">
                        <InputField
                          label="Category"
                          value={selectedProject.category}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              category: value as PortfolioProject["category"],
                            }))
                          }
                        />
                        <InputField
                          label="Sort order"
                          value={String(selectedProject.sortOrder)}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              sortOrder: Number(value) || current.sortOrder,
                            }))
                          }
                        />
                        <InputField
                          label="Client"
                          value={selectedProject.overview.client}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              overview: { ...current.overview, client: value },
                            }))
                          }
                        />
                        <ToggleField
                          label="Featured on homepage"
                          checked={Boolean(selectedProject.featured)}
                          onChange={(checked) =>
                            updateProject((current) => ({ ...current, featured: checked }))
                          }
                        />
                      </div>

                      <TextareaField
                        label="Description"
                        value={selectedProject.description}
                        onChange={(value) =>
                          updateProject((current) => ({ ...current, description: value }))
                        }
                      />

                      <div className="grid gap-4 lg:grid-cols-2">
                        <InputField
                          label="Role"
                          value={selectedProject.overview.role}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              overview: { ...current.overview, role: value },
                            }))
                          }
                        />
                        <InputField
                          label="Timeline"
                          value={selectedProject.overview.timeline}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              overview: { ...current.overview, timeline: value },
                            }))
                          }
                        />
                      </div>

                      <StringListEditor
                        label="Tags"
                        items={selectedProject.tags}
                        onChange={(items) =>
                          updateProject((current) => ({ ...current, tags: items }))
                        }
                      />
                      <StringListEditor
                        label="Overview tools"
                        items={selectedProject.overview.tools}
                        onChange={(items) =>
                          updateProject((current) => ({
                            ...current,
                            overview: { ...current.overview, tools: items },
                          }))
                        }
                      />
                    </div>
                  </EditorCard>

                  <EditorCard title="Main media">
                    <div className="space-y-4">
                      <ImageField
                        label="Hero image"
                        value={selectedProject.heroImage}
                        onChange={(value) =>
                          updateProject((current) => ({ ...current, heroImage: value }))
                        }
                        folder={`projects/${selectedProject.slug}/hero`}
                        onToast={pushToast}
                      />
                      <ImageListEditor
                        label="Preview images"
                        items={selectedProject.previewImages}
                        onChange={(items) =>
                          updateProject((current) => ({ ...current, previewImages: items }))
                        }
                        folder={`projects/${selectedProject.slug}/previews`}
                        onToast={pushToast}
                      />
                      <ImageListEditor
                        label="Gallery images"
                        items={selectedProject.images}
                        onChange={(items) =>
                          updateProject((current) => ({ ...current, images: items }))
                        }
                        folder={`projects/${selectedProject.slug}/gallery`}
                        onToast={pushToast}
                      />
                    </div>
                  </EditorCard>

                  <EditorCard title="Live links">
                    <p className="mb-4 text-sm text-muted-foreground">
                      Add any optional live URLs, Behance links, social links, or hosted
                      examples you want to show on the case-study page.
                    </p>
                    <ProjectLinksEditor
                      items={selectedProject.links}
                      onChange={(items) =>
                        updateProject((current) => ({ ...current, links: items }))
                      }
                    />
                  </EditorCard>

                  <EditorCard title="Case-study sections">
                    <CaseStudySectionsEditor
                      items={selectedProject.sections}
                      onChange={(items) =>
                        updateProject((current) => ({ ...current, sections: items }))
                      }
                    />
                  </EditorCard>

                  <EditorCard title="Results and comparison">
                    <div className="space-y-4">
                      <StringListEditor
                        label="Result bullets"
                        items={selectedProject.results}
                        onChange={(items) =>
                          updateProject((current) => ({ ...current, results: items }))
                        }
                      />
                      <div className="grid gap-4 lg:grid-cols-3">
                        <InputField
                          label="Before/after label"
                          value={selectedProject.beforeAfter.label}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              beforeAfter: { ...current.beforeAfter, label: value },
                            }))
                          }
                        />
                        <ImageField
                          label="Before image"
                          value={selectedProject.beforeAfter.before}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              beforeAfter: { ...current.beforeAfter, before: value },
                            }))
                          }
                          folder={`projects/${selectedProject.slug}/before-after`}
                          onToast={pushToast}
                        />
                        <ImageField
                          label="After image"
                          value={selectedProject.beforeAfter.after}
                          onChange={(value) =>
                            updateProject((current) => ({
                              ...current,
                              beforeAfter: { ...current.beforeAfter, after: value },
                            }))
                          }
                          folder={`projects/${selectedProject.slug}/before-after`}
                          onToast={pushToast}
                        />
                      </div>
                    </div>
                  </EditorCard>

                  <EditorCard title="Extra assets">
                    <div className="space-y-4">
                      <StringListEditor
                        label="Logo assets"
                        items={selectedProject.logos}
                        onChange={(items) =>
                          updateProject((current) => ({ ...current, logos: items }))
                        }
                      />
                      <StringListEditor
                        label="Video assets"
                        items={selectedProject.videos}
                        onChange={(items) =>
                          updateProject((current) => ({ ...current, videos: items }))
                        }
                      />
                      <StringListEditor
                        label="PDF assets"
                        items={selectedProject.pdfs}
                        onChange={(items) =>
                          updateProject((current) => ({ ...current, pdfs: items }))
                        }
                      />
                      <ImageListEditor
                        label="Social media previews"
                        items={selectedProject.socialMediaPreviews}
                        onChange={(items) =>
                          updateProject((current) => ({
                            ...current,
                            socialMediaPreviews: items,
                          }))
                        }
                        folder={`projects/${selectedProject.slug}/social-previews`}
                        onToast={pushToast}
                      />
                    </div>
                  </EditorCard>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleDeleteProject}
                      disabled={busyAction === "delete-project"}
                    >
                      <Trash2 size={15} />
                      {busyAction === "delete-project" ? "Deleting..." : "Delete project"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/12 p-6 text-sm text-muted-foreground">
                  Create a project or select one from the list.
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <ToastStack toasts={toasts} />
    </main>
  );
}

function EditorCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
      <h3 className="font-display text-xl">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted-foreground">{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
      />
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex h-full items-center justify-between rounded-xl border border-white/12 bg-black/20 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4"
      />
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  folder,
  onToast,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
  onToast: (tone: "success" | "error", message: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadedUrl = await uploadImageFile(file, folder);
      onChange(uploadedUrl);
      onToast("success", `${label} uploaded.`);
    } catch {
      onToast("error", `Could not upload ${label.toLowerCase()}.`);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="h-48 w-full object-cover" />
          ) : (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              No image yet
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/12 bg-black/20 px-4 py-2 text-sm transition hover:border-primary/40 hover:bg-primary/10">
            <Upload size={15} />
            {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        <div className="mt-4">
          <InputField
            label="Saved image URL"
            value={value}
            onChange={onChange}
            placeholder="Optional advanced field"
          />
        </div>
      </div>
    </div>
  );
}

function ImageListEditor({
  label,
  items,
  onChange,
  folder,
  onToast,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  folder: string;
  onToast: (tone: "success" | "error", message: string) => void;
}) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  async function handleReplace(index: number, file: File) {
    try {
      setUploadingIndex(index);
      const uploadedUrl = await uploadImageFile(file, folder);
      const nextItems = [...items];
      nextItems[index] = uploadedUrl;
      onChange(nextItems);
      onToast("success", "Image updated.");
    } catch {
      onToast("error", "Could not upload image.");
    } finally {
      setUploadingIndex(null);
    }
  }

  async function handleAdd(file: File) {
    try {
      setAdding(true);
      const uploadedUrl = await uploadImageFile(file, folder);
      onChange([...items, uploadedUrl]);
      onToast("success", "Image added.");
    } catch {
      onToast("error", "Could not upload image.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/12 bg-black/20 px-4 py-2 text-sm transition hover:border-primary/40 hover:bg-primary/10">
          <Upload size={15} />
          {adding ? "Uploading..." : "Add image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={adding}
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (file) {
                await handleAdd(file);
              }
              event.target.value = "";
            }}
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="mb-3 overflow-hidden rounded-xl border border-white/10 bg-black/20">
              {item ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item}
                  alt={`${label} ${index + 1}`}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">
                  No image yet
                </div>
              )}
            </div>

            <InputField
              label={`Image ${index + 1}`}
              value={item}
              onChange={(value) => {
                const nextItems = [...items];
                nextItems[index] = value;
                onChange(nextItems);
              }}
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/12 bg-black/20 px-4 py-2 text-sm transition hover:border-primary/40 hover:bg-primary/10">
                <Upload size={15} />
                {uploadingIndex === index ? "Uploading..." : "Replace"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingIndex === index}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      await handleReplace(index, file);
                    }
                    event.target.value = "";
                  }}
                />
              </label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              >
                <Trash2 size={15} />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="flex gap-2">
            <input
              value={item}
              onChange={(event) => {
                const nextItems = [...items];
                nextItems[index] = event.target.value;
                onChange(nextItems);
              }}
              className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            >
              <Trash2 size={15} />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="secondary" onClick={() => onChange([...items, ""])}>
        <Plus size={15} />
        Add item
      </Button>
    </div>
  );
}

function SkillEditor({
  items,
  onChange,
}: {
  items: SkillLevel[];
  onChange: (items: SkillLevel[]) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Skills</p>
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="grid gap-2 md:grid-cols-[1fr_120px_48px]">
          <input
            value={item.label}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, label: event.target.value };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="Skill"
          />
          <input
            type="number"
            value={item.value}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = {
                ...item,
                value: Number(event.target.value) || 0,
              };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="90"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => onChange([...items, { label: "", value: 80 }])}
      >
        <Plus size={15} />
        Add skill
      </Button>
    </div>
  );
}

function ShowcaseEditor({
  items,
  onChange,
  onToast,
}: {
  items: ShowcaseItem[];
  onChange: (items: ShowcaseItem[]) => void;
  onToast: (tone: "success" | "error", message: string) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item.name}-${index}`} className="rounded-2xl border border-white/10 p-4">
          <div className="space-y-4">
            <InputField
              label="Name"
              value={item.name}
              onChange={(value) => {
                const nextItems = [...items];
                nextItems[index] = { ...item, name: value };
                onChange(nextItems);
              }}
            />
            <ImageField
              label="Card image"
              value={item.src}
              onChange={(value) => {
                const nextItems = [...items];
                nextItems[index] = { ...item, src: value };
                onChange(nextItems);
              }}
              folder="site/logo-showcase"
              onToast={onToast}
            />
            <TextareaField
              label="Description"
              value={item.desc}
              onChange={(value) => {
                const nextItems = [...items];
                nextItems[index] = { ...item, desc: value };
                onChange(nextItems);
              }}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            >
              <Trash2 size={15} />
              Remove card
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => onChange([...items, { src: "", name: "", desc: "" }])}
      >
        <Plus size={15} />
        Add card
      </Button>
    </div>
  );
}

function ContactLinksEditor({
  items,
  onChange,
}: {
  items: ContactLink[];
  onChange: (items: ContactLink[]) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Contact links</p>
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="grid gap-2 rounded-2xl border border-white/10 p-4 md:grid-cols-[1fr_1.3fr_170px_48px]"
        >
          <input
            value={item.label}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, label: event.target.value };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="Label"
          />
          <input
            value={item.href}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, href: event.target.value };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="URL"
          />
          <select
            value={item.kind}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = {
                ...item,
                kind: event.target.value as ContactLink["kind"],
              };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
          >
            <option value="email">Email</option>
            <option value="linkedin">LinkedIn</option>
            <option value="behance">Behance</option>
            <option value="instagram">Instagram</option>
            <option value="website">Website</option>
          </select>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          onChange([...items, { label: "", href: "", kind: "website" }])
        }
      >
        <Plus size={15} />
        Add link
      </Button>
    </div>
  );
}

function ProjectLinksEditor({
  items,
  onChange,
}: {
  items: ProjectLink[];
  onChange: (items: ProjectLink[]) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="grid gap-2 rounded-2xl border border-white/10 p-4 lg:grid-cols-[1fr_1.6fr_170px_48px]"
        >
          <input
            value={item.label}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, label: event.target.value };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="Label"
          />
          <input
            value={item.href}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, href: event.target.value };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="https://..."
          />
          <select
            value={item.kind}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = {
                ...item,
                kind: event.target.value as ProjectLink["kind"],
              };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
          >
            <option value="live">Live site</option>
            <option value="case-study">Case study</option>
            <option value="behance">Behance</option>
            <option value="dribbble">Dribbble</option>
            <option value="instagram">Instagram</option>
            <option value="other">Other</option>
          </select>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => onChange([...items, { label: "", href: "", kind: "live" }])}
      >
        <Link2 size={15} />
        Add project link
      </Button>
    </div>
  );
}

function StatsEditor({
  items,
  onChange,
}: {
  items: ContactStat[];
  onChange: (items: ContactStat[]) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Contact stats</p>
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="grid gap-2 md:grid-cols-[1fr_120px_48px]">
          <input
            value={item.label}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, label: event.target.value };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="Label"
          />
          <input
            value={item.value}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, value: event.target.value };
              onChange(nextItems);
            }}
            className="rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="10+"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => onChange([...items, { label: "", value: "" }])}
      >
        <Plus size={15} />
        Add stat
      </Button>
    </div>
  );
}

function CaseStudySectionsEditor({
  items,
  onChange,
}: {
  items: CaseStudySection[];
  onChange: (items: CaseStudySection[]) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="space-y-3 rounded-2xl border border-white/10 p-4">
          <select
            value={item.title}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = {
                ...item,
                title: event.target.value as CaseStudySection["title"],
              };
              onChange(nextItems);
            }}
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
          >
            {sectionTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          <textarea
            rows={5}
            value={item.content}
            onChange={(event) => {
              const nextItems = [...items];
              nextItems[index] = { ...item, content: event.target.value };
              onChange(nextItems);
            }}
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Trash2 size={15} />
            Remove section
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          onChange([
            ...items,
            {
              id: `section-${Date.now()}`,
              title: "Problem",
              content: "",
            },
          ])
        }
      >
        <Plus size={15} />
        Add section
      </Button>
    </div>
  );
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed left-1/2 top-5 z-[60] flex w-[360px] max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-xl backdrop-blur ${
            toast.tone === "success"
              ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-50"
              : "border-rose-400/30 bg-rose-500/15 text-rose-50"
          }`}
        >
          {toast.tone === "success" ? (
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
          )}
          <p>{toast.message}</p>
        </div>
      ))}
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
