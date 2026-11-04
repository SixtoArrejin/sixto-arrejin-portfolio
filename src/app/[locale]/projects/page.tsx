import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ProjectsCatalog } from "@/components/sections/ProjectsCatalog";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "es" | "en")) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "projects" });

  const title =
    locale === "es"
      ? "Catálogo de Proyectos y Sistemas — Sixto Feliciano Arrejin"
      : "Projects & Systems Catalog — Sixto Feliciano Arrejin";

  return {
    title,
    description: t("catalog_subtitle"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsCatalog />;
}
