"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { featuredProjects } from "@/data/projects";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { Link } from "@/i18n/routing";

export function Projects() {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: `${t("filter_all")} (6)` },
    { id: "professional", label: t("type_professional") },
    { id: "thesis", label: t("type_thesis") },
    { id: "personal", label: t("type_personal") },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.type === activeFilter);

  return (
    <section
      className="py-24 sm:py-28"
      id="projects"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag mb-4">{t("tag")}</span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] mt-3"
              style={{ color: "var(--text-primary)" }}
            >
              {t("title")}{" "}
              <span
                className="font-serif-italic font-normal"
                style={{ color: "var(--accent-blue)" }}
              >
                {t("title_italic")}
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-sm sm:text-base max-w-md leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="px-4 py-2 rounded-full text-xs font-mono-tech transition-all duration-200 cursor-pointer active:scale-95"
                style={{
                  background: isActive ? "var(--bg-inverted)" : "var(--bg-card)",
                  color: isActive ? "var(--text-inverted)" : "var(--text-secondary)",
                  border: `1px solid ${
                    isActive ? "var(--bg-inverted)" : "var(--border-color)"
                  }`,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const coverUrl = project.media?.[0]?.url;
            const numStr = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="editorial-card rounded-2xl border shadow-sm flex flex-col overflow-hidden group"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Top Index & Badge Bar */}
                <div
                  className="px-5 py-3.5 border-b flex items-center justify-between gap-2"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <span
                    className="font-mono-tech text-xs font-semibold"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {numStr} // {t(`${project.slug}.dateRange`)}
                  </span>
                  <span className={`type-badge type-badge--${project.type}`}>
                    {t(`${project.slug}.badge`)}
                  </span>
                </div>

                {/* Cover Image Preview */}
                {coverUrl && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="relative aspect-[16/10] w-full overflow-hidden border-b block"
                    style={{
                      background: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <Image
                      src={coverUrl}
                      alt={t(`${project.slug}.title`)}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                        project.slug === "elepad" ? "object-contain p-2" : "object-cover object-top"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                )}

                {/* Card Body — Clean Asymmetric Style */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Context / Client */}
                    <p
                      className="font-mono-tech text-[11px] uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t(`${project.slug}.clientOrContext`)}
                    </p>

                    {/* Title */}
                    <Link href={`/projects/${project.slug}`} className="block group/title">
                      <h3
                        className="text-xl font-bold tracking-tight mb-1 transition-colors group-hover/title:text-[var(--accent-blue)]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t(`${project.slug}.title`)}
                      </h3>
                    </Link>

                    {/* Subtitle */}
                    <p
                      className="text-xs font-medium mb-3"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      {t(`${project.slug}.subtitle`)}
                    </p>

                    {/* Concise Narrative Description */}
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t(`${project.slug}.description`)}
                    </p>
                  </div>

                  {/* Card Actions: Asymmetric-Style Clean Bar */}
                  <div
                    className="pt-4 border-t flex items-center justify-between gap-3 mt-auto"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center gap-2">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono-tech font-medium border transition-colors hover:bg-[var(--bg-secondary)]"
                          style={{
                            color: "var(--text-secondary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <span>{project.links.liveAsWeb ? "Web" : "En vivo"}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.links.playStore && (
                        <a
                          href={project.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono-tech font-medium border transition-colors hover:bg-[var(--bg-secondary)]"
                          style={{
                            color: "var(--text-secondary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <span>Play Store</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.links.github && !project.links.live && !project.links.playStore && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono-tech font-medium border transition-colors hover:bg-[var(--bg-secondary)]"
                          style={{
                            color: "var(--text-secondary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <span>GitHub</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-mono-tech font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 ml-auto"
                      style={{
                        background: "var(--bg-inverted)",
                        color: "var(--text-inverted)",
                      }}
                    >
                      <span>{t("view_more")}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Projects Discreet Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-mono-tech font-semibold tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-blue)] group shadow-sm cursor-pointer"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <FolderGit2
              size={14}
              style={{ color: "var(--accent-blue)" }}
              className="transition-transform group-hover:scale-110"
            />
            <span>{t("archive_cta")}</span>
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: "var(--text-secondary)" }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
