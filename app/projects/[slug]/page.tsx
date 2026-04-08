import { ProjectPageClient } from "@/components/pages/project-page-client";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectPageClient slug={slug} />;
}
