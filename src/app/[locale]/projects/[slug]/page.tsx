import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDetail } from "./ProjectDetail";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const projectMessages = messages.projects[slug as keyof typeof messages.projects];

  if (!projectMessages || typeof projectMessages === "string") {
    return {};
  }

  return {
    title: `${projectMessages.title} — Sixto Feliciano Arrejin`,
    description: projectMessages.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
