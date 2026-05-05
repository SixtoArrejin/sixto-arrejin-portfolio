"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowRight, ExternalLink, Smartphone, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Link } from "@/i18n/routing";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function TypeBadge({ type, t }: { type: string; t: (key: string) => string }) {
  return (
    <span className={`type-badge type-badge--${type}`}>
      {t(`type_${type}`)}
    </span>
  );
}

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section className="py-24" id="projects" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            {t("title")}
          </motion.h2>
          <motion.div variants={fadeInUp} custom={0} className="section-divider mb-12" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug}
              variants={fadeInUp}
              custom={idx + 1}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-5 flex flex-col group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <TypeBadge type={project.type} t={t} />
                <div className="flex items-center gap-1.5 text-xs opacity-80" style={{ color: "var(--text-muted)" }}>
                  <Calendar size={13} />
                  <span>{t(`${project.slug}.dateRange`)}</span>
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold mb-2 group-hover:text-transparent transition-all duration-300"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sora)",
                }}
              >
                <span className="group-hover:gradient-text">
                  {t(`${project.slug}.title`)}
                </span>
              </h3>

              {/* Description */}
              <p
                className="text-sm mb-4 flex-1"
                style={{ color: "var(--text-muted)" }}
              >
                {t(`${project.slug}.description`)}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="tech-badge" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span
                    className="tech-badge"
                    style={{ fontSize: "0.65rem", padding: "2px 8px" }}
                  >
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>

              {/* Footer: Links + View More */}
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border-color)" }}>
                <div className="flex gap-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-200 hover:scale-110"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-200 hover:scale-110"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.links.playStore && (
                    <a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-200 hover:scale-110"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-blue)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <Smartphone size={16} />
                    </a>
                  )}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold transition-all duration-200 hover:gap-2"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {t("view_more")}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
