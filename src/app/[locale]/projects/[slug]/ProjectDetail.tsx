"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
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
  Database,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Cpu,
  GitBranch,
  BarChart3,
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

const tagCategories: Record<string, "frontend" | "backend" | "database" | "devops"> = {
  // Frontend
  "TypeScript": "frontend",
  "JavaScript (ES6+)": "frontend",
  "React.js": "frontend",
  "React": "frontend",
  "Next.js": "frontend",
  "React Native": "frontend",
  "Expo": "frontend",
  "ChakraUI": "frontend",
  "Tailwind CSS": "frontend",
  "HTML5": "frontend",
  "CSS3": "frontend",
  "TanStack Query": "frontend",
  "Power BI": "frontend",

  // Backend
  "Node.js": "backend",
  "Express.js": "backend",
  "Express": "backend",
  "Flask": "backend",
  "JWT/OAuth": "backend",
  "JWT": "backend",
  "Google OAuth": "backend",
  "Cloudflare Workers": "backend",
  "REST APIs": "backend",
  "Pytest": "backend",
  "Python": "backend",

  // Database
  "Supabase": "database",
  "PostgreSQL": "database",
  "MySQL": "database",
  "Prisma ORM": "database",
  "Prisma": "database",
  "Redis": "database",
  "SQL Server": "database",
  "SSIS": "database",
  "SSAS": "database",
  "ETL": "database",
  "OLAP": "database",

  // DevOps & Infra
  "Docker": "devops",
  "Docker Compose": "devops",
  "Docker Buildx": "devops",
  "Kubernetes": "devops",
  "K3d": "devops",
  "OpenTelemetry": "devops",
  "Prometheus": "devops",
  "Grafana": "devops",
  "Tempo": "devops",
  "Terraform": "devops",
  "CI/CD": "devops",
  "GitHub Actions": "devops",
  "Azure": "devops",
  "Azure ACR": "devops",
  "Azure ACI": "devops",
  "Render": "devops",
  "Turborepo": "devops",
};

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasMedia = project.media && project.media.length > 0;

  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [activeDiagramUrl, setActiveDiagramUrl] = useState<string | null>(null);
  const [activeDiagramTitle, setActiveDiagramTitle] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const projectTitle = t(`${project.slug}.title`);
  const isTitleLong = projectTitle.length > 30;

  const descLimit = project.slug === 'elepad'
    ? 800
    : (isTitleLong ? 320 : 500);
  const fullDescription = t(`${project.slug}.long_description`);
  const isTruncated = fullDescription.length > descLimit;
  const displayText = isDescExpanded
    ? fullDescription
    : (isTruncated ? `${fullDescription.substring(0, descLimit)}...` : fullDescription);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(3, prev + 0.25));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(0.75, prev - 0.25));
  };

  const handleZoomReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

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
          <div className={`grid grid-cols-1 ${project.slug !== 'elepad' ? 'lg:grid-cols-5' : 'lg:grid-cols-3'} gap-8 lg:gap-12 items-start`}>
            {/* Left: Text & Badges & Links */}
            <motion.div variants={fadeInUp} custom={0} className={project.slug !== 'elepad' ? 'lg:col-span-3' : 'lg:col-span-2'}>
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
                {displayText}
                {isTruncated && (
                  <button
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="ml-2 font-semibold text-xs sm:text-sm hover:underline focus:outline-none select-none transition-colors duration-200 inline-block"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {isDescExpanded ? t("read_less") : t("read_more")}
                  </button>
                )}
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
              <motion.div
                variants={fadeInUp}
                custom={0.5}
                className={project.slug !== 'elepad' ? 'lg:col-span-2 flex justify-center lg:justify-end' : 'lg:col-span-1 flex justify-center lg:justify-end'}
              >
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {[
                { id: "frontend", title: t("cat_frontend"), color: "var(--accent-blue)" },
                { id: "backend", title: t("cat_backend"), color: "var(--accent-violet)" },
                { id: "database", title: t("cat_database"), color: "var(--accent-orange)" },
                { id: "devops", title: t("cat_devops"), color: "#10b981" },
              ].map((cat) => {
                const catTags = project.tags.filter((tag) => tagCategories[tag] === cat.id);
                if (catTags.length === 0) return null;
                return (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl border flex flex-col gap-3"
                    style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: cat.color }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cat.color }} />
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {catTags.map((tag) => {
                        const IconConfig = iconMap[tag];
                        return (
                          <span key={tag} className="tech-badge">
                            {IconConfig && <IconConfig.icon size={14} style={{ color: IconConfig.color }} />}
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
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

          {/* System Architecture Section (Specific to SCyT) */}
          {project.slug === "scyt-utn" && (
            <motion.div variants={fadeInUp} custom={3.1} className="glass-card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={16} style={{ color: "var(--accent-violet)" }} />
                <h2
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-violet)" }}
                >
                  {t("arch_title")}
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t("arch_desc")}
              </p>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => {
                    setActiveDiagramUrl("/projects/scyt/system-architecture.png");
                    setActiveDiagramTitle(t("arch_title"));
                    setZoomLevel(1);
                  }}
                  className="relative block w-full rounded-xl overflow-hidden border group cursor-pointer text-left focus:outline-none"
                  style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
                >
                  <img
                    src="/projects/scyt/system-architecture.png"
                    alt={t("arch_title")}
                    className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 group-hover:scale-[1.01] group-hover:brightness-110 p-2 sm:p-4 mx-auto"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                      {t("view_more")}
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Database Schema Section (Specific to SCyT) */}
          {project.slug === "scyt-utn" && (
            <motion.div variants={fadeInUp} custom={3.2} className="glass-card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Database size={16} style={{ color: "var(--accent-blue)" }} />
                <h2
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {t("db_schema_title")}
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t("db_schema_desc")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* DER Diagram Card */}
                <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-blue)" }} />
                    {t("db_der_title")}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", minHeight: "2.5rem" }}>
                    {t("db_der_desc")}
                  </p>
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/scyt/db-der-conceptual.png");
                      setActiveDiagramTitle(t("db_der_title"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <img
                      src="/projects/scyt/db-der-conceptual.png"
                      alt={t("db_der_title")}
                      className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {t("view_more")}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Implemented Relational Model Card */}
                <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-violet)" }} />
                    {t("db_physical_title")}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", minHeight: "2.5rem" }}>
                    {t("db_physical_desc")}
                  </p>
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/scyt/db-relational-physical.png");
                      setActiveDiagramTitle(t("db_physical_title"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <img
                      src="/projects/scyt/db-relational-physical.png"
                      alt={t("db_physical_title")}
                      className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {t("view_more")}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cloud Architecture Section (Specific to DevOps Azure) */}
          {project.slug === "devops-azure" && (
            <motion.div variants={fadeInUp} custom={3.0} className="glass-card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Layers size={16} style={{ color: "var(--accent-blue)" }} />
                <h2
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {t("devops_arch_title")}
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t("devops_arch_desc")}
              </p>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => {
                    setActiveDiagramUrl("/projects/devops-azure/arquitectura.png");
                    setActiveDiagramTitle(t("devops_arch_title"));
                    setZoomLevel(1);
                  }}
                  className="relative block w-full rounded-xl overflow-hidden border group cursor-pointer text-left focus:outline-none"
                  style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
                >
                  <img
                    src="/projects/devops-azure/arquitectura.png"
                    alt={t("devops_arch_title")}
                    className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 group-hover:scale-[1.01] group-hover:brightness-110 p-2 sm:p-4 mx-auto"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                      {t("view_more")}
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* CI/CD Pipeline Section (Specific to DevOps Azure) */}
          {project.slug === "devops-azure" && (
            <motion.div variants={fadeInUp} custom={3.1} className="glass-card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch size={16} style={{ color: "var(--accent-violet)" }} />
                <h2
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-violet)" }}
                >
                  {t("devops_pipeline_title")}
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t("devops_pipeline_desc")}
              </p>

              <div className="space-y-6 mt-4">
                {/* Parallel Triggers Card (Full Width - Side to Side) */}
                <div className="flex flex-col gap-3 p-4 rounded-xl border w-full" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-violet)" }} />
                    {t("devops_parallel_label")}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {t("devops_parallel_desc")}
                  </p>
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/devops-azure/test-and-deploy.png");
                      setActiveDiagramTitle(t("devops_parallel_label"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer focus:outline-none"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <img
                      src="/projects/devops-azure/test-and-deploy.png"
                      alt={t("devops_parallel_label")}
                      className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-[1.01] group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {t("view_more")}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Grid for Success Deploy and Detailed Execution Sequence (2 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Success Deploy Card */}
                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-blue)" }} />
                      {t("devops_success_label")}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", minHeight: "2.5rem" }}>
                      {t("devops_success_desc")}
                    </p>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/devops-azure/deploy-succes.png");
                        setActiveDiagramTitle(t("devops_success_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/devops-azure/deploy-succes.png"
                        alt={t("devops_success_label")}
                        className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                          {t("view_more")}
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Detailed Sequence Card */}
                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-violet)" }} />
                      {t("devops_detail_label")}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", minHeight: "2.5rem" }}>
                      {t("devops_detail_desc")}
                    </p>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/devops-azure/pipeline-ci-cd.png");
                        setActiveDiagramTitle(t("devops_detail_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/devops-azure/pipeline-ci-cd.png"
                        alt={t("devops_detail_label")}
                        className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                          {t("view_more")}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SmartCatalog Views Section (Specific to DevOps Azure) */}
          {project.slug === "devops-azure" && (
            <motion.div variants={fadeInUp} custom={3.3} className="glass-card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={16} style={{ color: "var(--accent-blue)" }} />
                <h2
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {t("devops_app_title")}
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t("devops_app_desc")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Voting View Card */}
                <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-blue)" }} />
                    {t("devops_voting_label")}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", minHeight: "2.5rem" }}>
                    {t("devops_voting_desc")}
                  </p>
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/devops-azure/app-voting.png");
                      setActiveDiagramTitle(t("devops_voting_label"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <img
                      src="/projects/devops-azure/app-voting.png"
                      alt={t("devops_voting_label")}
                      className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {t("view_more")}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Statistics View Card */}
                <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-violet)" }} />
                    {t("devops_stats_label")}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", minHeight: "2.5rem" }}>
                    {t("devops_stats_desc")}
                  </p>
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/devops-azure/app-statistics.png");
                      setActiveDiagramTitle(t("devops_stats_label"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <img
                      src="/projects/devops-azure/app-statistics.png"
                      alt={t("devops_stats_label")}
                      className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {t("view_more")}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

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
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ background: "var(--bg-card)" }}>
                        <FileText size={20} style={{ color: "var(--text-secondary)" }} />
                      </div>
                      <span className="text-sm font-medium text-left leading-normal break-words" style={{ color: "var(--text-primary)" }}>
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

        {/* Custom Zoomable Lightbox for DB Diagrams */}
        <AnimatePresence>
          {activeDiagramUrl !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-6"
              onClick={() => setActiveDiagramUrl(null)}
            >
              {/* Header bar */}
              <div className="w-full flex justify-between items-center z-[120] max-w-6xl mt-4 sm:mt-0 gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex flex-col gap-1 max-w-[50%] sm:max-w-none">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
                    {t("db_schema_title")}
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold text-white leading-tight truncate sm:whitespace-normal">
                    {activeDiagramTitle}
                  </h3>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.75}
                    className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-40 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-[11px] font-semibold text-white px-1 min-w-[2.8rem] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-40 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <div className="w-px h-3.5 bg-white/20 mx-1" />
                  <button
                    onClick={handleZoomReset}
                    className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveDiagramUrl(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Content Area with Zoom & Drag */}
              <div
                className="relative w-full flex-grow flex items-center justify-center overflow-hidden my-4"
                onClick={() => setActiveDiagramUrl(null)}
              >
                <motion.div
                  key={activeDiagramUrl}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: zoomLevel, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 250 }}
                  className="relative flex items-center justify-center"
                  style={{ transformOrigin: "center center" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.img
                    src={activeDiagramUrl}
                    alt={activeDiagramTitle}
                    className="max-w-[90vw] max-h-[65vh] object-contain select-none"
                    drag={zoomLevel > 1}
                    dragElastic={0.05}
                    dragMomentum={true}
                    dragConstraints={{ left: -300 * (zoomLevel - 1), right: 300 * (zoomLevel - 1), top: -200 * (zoomLevel - 1), bottom: 200 * (zoomLevel - 1) }}
                    style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
                    whileTap={{ cursor: zoomLevel > 1 ? "grabbing" : "default" }}
                  />
                </motion.div>
              </div>

              {/* Footer instruction */}
              <div className="text-center z-50 mb-2">
                <p className="text-xs text-white/50">
                  {zoomLevel > 1 ? "Haz clic y arrastra para explorar el diagrama" : "Usa los controles para hacer zoom en el diagrama"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
