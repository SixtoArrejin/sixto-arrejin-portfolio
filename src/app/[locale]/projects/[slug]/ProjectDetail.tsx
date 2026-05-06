"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { type Project } from "@/data/projects";
import {
  ArrowLeft,
  ExternalLink,
  Smartphone,
  Users,
  Calendar,
  CheckCircle2,
  Layers,
  FileText,
  Download,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { iconMap } from "@/utils/iconMap";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { ProjectHeaderCarousel } from "@/components/ui/ProjectHeaderCarousel";
import { ProjectLightbox } from "@/components/ui/ProjectLightbox";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasMedia = project.media && project.media.length > 0;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-all duration-200 hover:gap-3"
            style={{ color: "var(--accent-blue)" }}
          >
            <ArrowLeft size={16} />
            {t("back")}
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header & Carousel Grid */}
          {/* Header & Carousel Grid */}
          <div className={`grid grid-cols-1 ${project.slug !== 'elepad' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8 lg:gap-12 items-start`}>
            {/* Left: Text & Badges & Links */}
            <motion.div variants={fadeInUp} custom={0} className={project.slug !== 'elepad' ? 'lg:col-span-1' : 'lg:col-span-2'}>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`type-badge type-badge--${project.type}`}>
                  {t(`type_${project.type}`)}
                </span>
                <span
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Calendar size={13} />
                  {t(`${project.slug}.dateRange`)}
                </span>
                {project.team && (
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Users size={13} />
                    {t("team", { count: project.team })}
                  </span>
                )}
              </div>

              <h1
                className="text-3xl sm:text-4xl font-extrabold mb-4"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                <span className="gradient-text">
                  {t(`${project.slug}.title`)}
                </span>
              </h1>

              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {t(`${project.slug}.long_description`)}
              </p>
              {/* Links */}
              {(project.links.github || project.links.live || project.links.playStore) && (
                <div className="flex flex-wrap gap-3 mt-8">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <GithubIcon size={16} />
                      {t("links_github")}
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      <ExternalLink size={16} />
                      {t("links_live")}
                    </a>
                  )}
                  {project.links.playStore && (
                    <a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <Smartphone size={16} />
                      {t("links_playstore")}
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right: Featured Carousel */}
            {hasMedia && (
              <motion.div variants={fadeInUp} custom={0.5} className="lg:col-span-1 flex justify-center lg:justify-end">
                <ProjectHeaderCarousel 
                  media={project.media!} 
                  onOpenLightbox={(idx) => setLightboxIndex(idx)} 
                  isDesktop={project.slug !== "elepad"}
                />
              </motion.div>
            )}
          </div>

          {/* Tech Stack */}
          <motion.div variants={fadeInUp} custom={2} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={16} style={{ color: "var(--accent-blue)" }} />
              <h2
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: "var(--accent-blue)" }}
              >
                {t("stack_title")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => {
                const IconConfig = iconMap[tag];
                return (
                  <span key={tag} className="tech-badge">
                    {IconConfig && <IconConfig.icon size={14} style={{ color: IconConfig.color }} />}
                    {tag}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeInUp} custom={3} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} style={{ color: "var(--accent-violet)" }} />
              <h2
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: "var(--accent-violet)" }}
              >
                {t("features_title")}
              </h2>
            </div>
            <ul className="space-y-3">
              {(
                t.raw(`${project.slug}.features`) as string[]
              ).map((feature: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: "var(--accent-gradient)" }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Documents */}
          {project.documents && project.documents.length > 0 && (
            <motion.div variants={fadeInUp} custom={3.5} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} style={{ color: "var(--accent-orange, #f97316)" }} />
                <h2
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-orange, #f97316)" }}
                >
                  {t("documents_title")}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.documents.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] group"
                    style={{
                      background: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 rounded-lg" style={{ background: "var(--bg-card)" }}>
                        <FileText size={20} style={{ color: "var(--text-secondary)" }} />
                      </div>
                      <span className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                        {doc.title}
                      </span>
                    </div>
                    <Download size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent-blue)" }} />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Bottom Gallery Grid */}
          {hasMedia && (
            <div className="mt-16">
              <ProjectGallery
                media={project.media!}
                onOpenLightbox={(idx) => setLightboxIndex(idx)}
                isDesktop={project.slug !== "elepad"}
              />
            </div>
          )}
        </motion.div>
        
        {/* Fullscreen Lightbox */}
        {hasMedia && (
          <ProjectLightbox
            media={project.media!}
            selectedIndex={lightboxIndex}
            setSelectedIndex={setLightboxIndex}
          />
        )}
      </div>
    </div>
  );
}
