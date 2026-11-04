"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { featuredProjects, otherProjects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, FolderGit2, Layers, Terminal } from "lucide-react";
import { Link } from "@/i18n/routing";

export function ProjectsCatalog() {
  const t = useTranslations("projects");

  return (
    <div
      className="min-h-screen py-16 sm:py-24"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Breadcrumb & Return to Home */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between gap-4 pb-6 mb-12 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-tech font-medium transition-all duration-200 hover:-translate-x-0.5 cursor-pointer"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <ArrowLeft size={14} />
            <span>{t("back_to_home")}</span>
          </Link>

          <span
            className="font-mono-tech text-xs tracking-wider uppercase font-semibold"
            style={{ color: "var(--accent-blue)" }}
          >
            11 // {t("catalog_kicker")}
          </span>
        </motion.div>

        {/* Page Hero Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag mb-4">{t("catalog_kicker")}</span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] mt-3 max-w-3xl"
              style={{ color: "var(--text-primary)" }}
            >
              {t("catalog_title")}{" "}
              <span
                className="font-serif-italic font-normal"
                style={{ color: "var(--accent-blue)" }}
              >
                {t("catalog_title_italic")}
              </span>
            </h1>
            <p
              className="text-base sm:text-lg max-w-2xl mt-4 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("catalog_subtitle")}
            </p>
          </motion.div>
        </div>

        {/* ========================================================
            SECTION 1: PROYECTOS DESTACADOS (6 STAR PROJECTS)
        ======================================================== */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b" style={{ borderColor: "var(--border-color)" }}>
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ background: "var(--accent-blue)" }}
            />
            <div>
              <p className="font-mono-tech text-xs uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
                {t("catalog_featured_tag")}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {t("catalog_featured_title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => {
              const coverUrl = project.media?.[0]?.url;
              const numStr = String(index + 1).padStart(2, "0");

              return (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="editorial-card rounded-2xl border shadow-sm flex flex-col overflow-hidden group"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {/* Top Bar */}
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

                  {/* Cover Image */}
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

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p
                        className="font-mono-tech text-[11px] uppercase tracking-wider mb-1.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {t(`${project.slug}.clientOrContext`)}
                      </p>

                      <Link href={`/projects/${project.slug}`} className="block group/title">
                        <h3
                          className="text-xl font-bold tracking-tight mb-1 transition-colors group-hover/title:text-[var(--accent-blue)]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {t(`${project.slug}.title`)}
                        </h3>
                      </Link>

                      <p
                        className="text-xs font-medium mb-3"
                        style={{ color: "var(--accent-blue)" }}
                      >
                        {t(`${project.slug}.subtitle`)}
                      </p>

                      <p
                        className="text-sm leading-relaxed mb-4 line-clamp-3"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {t(`${project.slug}.description`)}
                      </p>
                    </div>

                    {/* Actions */}
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
        </section>

        {/* ========================================================
            SECTION 2: OTROS PROYECTOS E INFRAESTRUCTURA (5 PROJECTS)
        ======================================================== */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b" style={{ borderColor: "var(--border-color)" }}>
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ background: "var(--text-muted)" }}
            />
            <div>
              <p className="font-mono-tech text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {t("catalog_other_tag")}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {t("catalog_other_title")}
              </h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                {t("catalog_other_sub")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project, index) => {
              const numStr = String(featuredProjects.length + index + 1).padStart(2, "0");

              return (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="editorial-card rounded-2xl border p-5 flex flex-col justify-between group transition-all duration-200 hover:shadow-md"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="font-mono-tech text-[11px] font-semibold"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {numStr} // {t(`${project.slug}.dateRange`)}
                      </span>
                      <span className={`type-badge type-badge--${project.type}`}>
                        {t(`${project.slug}.badge`)}
                      </span>
                    </div>

                    {/* Context / Department */}
                    <p
                      className="font-mono-tech text-[10.5px] uppercase tracking-wider mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t(`${project.slug}.clientOrContext`)}
                    </p>

                    {/* Title */}
                    <Link href={`/projects/${project.slug}`} className="block group/title">
                      <h3
                        className="text-lg font-bold tracking-tight mb-1 transition-colors group-hover/title:text-[var(--accent-blue)]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t(`${project.slug}.title`)}
                      </h3>
                    </Link>

                    {/* Subtitle */}
                    <p
                      className="text-xs font-medium mb-3 line-clamp-1"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      {t(`${project.slug}.subtitle`)}
                    </p>

                    {/* Description */}
                    <p
                      className="text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t(`${project.slug}.description`)}
                    </p>

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10.5px] font-mono-tech border"
                          style={{
                            background: "var(--bg-secondary)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span
                          className="px-1.5 py-0.5 text-[10.5px] font-mono-tech"
                          style={{ color: "var(--text-muted)" }}
                        >
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div
                    className="pt-3.5 border-t flex items-center justify-between gap-2 mt-auto"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center gap-1.5">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-mono-tech border transition-colors hover:bg-[var(--bg-secondary)]"
                          style={{
                            color: "var(--text-secondary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <span>GitHub</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                      {project.links.playStore && (
                        <a
                          href={project.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-mono-tech border transition-colors hover:bg-[var(--bg-secondary)]"
                          style={{
                            color: "var(--text-secondary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <span>Play Store</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-mono-tech font-semibold transition-colors hover:text-[var(--accent-blue)] ml-auto"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span>{t("view_more")}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Bottom Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <div>
            <h3
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {t("cta_banner_title")}
            </h3>
            <p
              className="text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("cta_banner_sub")}
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shadow-md"
            style={{
              background: "var(--bg-inverted)",
              color: "var(--text-inverted)",
            }}
          >
            <span>{t("cta_banner_btn")}</span>
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
