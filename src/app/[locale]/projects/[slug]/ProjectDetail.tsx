"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { projects, type Project } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Globe,
  Smartphone,
  Users,
  Calendar,
  CheckCircle2,
  Layers,
  FileText,
  Download,
  Database,
  Server,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Cpu,
  GitBranch,
  BarChart3,
} from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { GithubIcon } from "@/components/ui/Icons";
import { iconMap } from "@/utils/iconMap";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { ProjectHeaderCarousel } from "@/components/ui/ProjectHeaderCarousel";
import { ProjectLightbox } from "@/components/ui/ProjectLightbox";
import { useState } from "react";

type HighlightItem = { metric: string; label: string };
type KeyFeatureItem = { title: string; description: string };

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
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
  "Vite": "frontend",
  "PDF.js": "frontend",
  "chess.js": "frontend",
  "react-chessboard": "frontend",
  "HTML5": "frontend",
  "CSS3": "frontend",
  "TanStack Query": "frontend",
  "Power BI": "frontend",
  "Material UI": "frontend",
  "MUI": "frontend",

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
  "Hono": "backend",
  "LangGraph": "backend",

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
  "IndexedDB": "database",

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
  "Vercel": "devops",
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
  const projectSubtitle = t(`${project.slug}.subtitle`);
  const projectClient = t(`${project.slug}.clientOrContext`);
  const projectBadge = t(`${project.slug}.badge`);
  const projectChallenge = t(`${project.slug}.challenge`);
  const projectSolution = t(`${project.slug}.solution`);

  const highlights = (t.raw(`${project.slug}.highlights`) as HighlightItem[]) || [];
  const keyFeatures = (t.raw(`${project.slug}.key_features`) as KeyFeatureItem[]) || [];

  const isTitleLong = projectTitle.length > 30;
  const descLimit = project.slug === "elepad" ? 800 : isTitleLong ? 360 : 520;
  const fullDescription = t(`${project.slug}.long_description`);
  const isTruncated = fullDescription.length > descLimit;
  const paragraphs = fullDescription.split("\n\n");
  const firstParagraph = paragraphs[0];

  const displayText = isDescExpanded
    ? fullDescription
    : isTruncated
      ? `${firstParagraph.substring(0, descLimit)}...`
      : firstParagraph;

  // Prev / Next navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

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
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* 1. Top Navigation & Status Bar (Asymmetric Style) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-tech font-medium transition-all duration-200 hover:-translate-x-0.5"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <ArrowLeft size={14} />
            <span>{t("back")}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-mono-tech uppercase tracking-wider"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              {t(`type_${project.type}`)}
            </span>
            <span
              className="px-3 py-1 rounded-full text-[11px] font-mono-tech font-semibold uppercase tracking-wider"
              style={{
                background: "var(--bg-inverted)",
                color: "var(--text-inverted)",
              }}
            >
              {projectBadge}
            </span>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" className="space-y-12">
          {/* 2. Header & Right-Floated Carousel Layout (Preserved per user request) */}
          <div className="flow-root">
            {/* Right: Featured Carousel (Floated Right on Desktop) */}
            {hasMedia && (
              <motion.div
                variants={fadeInUp}
                custom={0.4}
                className={`hidden lg:flex w-full ${
                  project.slug !== "elepad"
                    ? "lg:w-[44%] lg:max-w-[500px]"
                    : "lg:w-[35%] lg:max-w-[360px]"
                } lg:float-right lg:ml-10 lg:mb-6 mb-8 justify-center lg:justify-end`}
              >
                <ProjectHeaderCarousel
                  media={project.media!}
                  onOpenLightbox={(idx) => setLightboxIndex(idx)}
                  isDesktop={project.slug !== "elepad"}
                />
              </motion.div>
            )}

            {/* Left: Context, Title, Subtitle, Description & Action Buttons */}
            <motion.div variants={fadeInUp} custom={0}>
              {/* Context Kicker */}
              <div className="flex flex-wrap items-center gap-3 mb-3 font-mono-tech text-xs">
                <span
                  className="font-semibold uppercase tracking-wider"
                  style={{ color: "var(--accent-blue)" }}
                >
                  [{projectClient}]
                </span>
                <span style={{ color: "var(--text-muted)" }}>·</span>
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Calendar size={12} />
                  {t(`${project.slug}.dateRange`)}
                </span>
                {project.team && (
                  <>
                    <span style={{ color: "var(--text-muted)" }}>·</span>
                    <span
                      className="inline-flex items-center gap-1.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Users size={12} />
                      {t("team", { count: project.team })}
                    </span>
                  </>
                )}
              </div>

              {/* Main Title */}
              <h1
                className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.06] mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {projectTitle}
              </h1>

              {/* Human-Friendly Subtitle */}
              <p
                className="text-base sm:text-xl font-medium mb-5 leading-snug"
                style={{ color: "var(--accent-blue)" }}
              >
                {projectSubtitle}
              </p>

              {/* Expandable Narrative Description */}
              <p
                className="text-[15px] sm:text-base leading-[1.75] whitespace-pre-line"
                style={{ color: "var(--text-secondary)" }}
              >
                {displayText}
                {isTruncated && (
                  <button
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="ml-2 font-mono-tech font-semibold text-xs hover:underline focus:outline-none select-none cursor-pointer inline-block"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {isDescExpanded ? t("read_less") : t("read_more")}
                  </button>
                )}
              </p>

              {/* Mobile Featured Carousel (Below Description on small screens) */}
              {hasMedia && (
                <motion.div
                  variants={fadeInUp}
                  custom={0.5}
                  className="lg:hidden w-full my-6 flex justify-center"
                >
                  <ProjectHeaderCarousel
                    media={project.media!}
                    onOpenLightbox={(idx) => setLightboxIndex(idx)}
                    isDesktop={project.slug !== "elepad"}
                  />
                </motion.div>
              )}

              {/* External Action Buttons */}
              {(project.links.github ||
                project.links.live ||
                project.links.playStore ||
                project.links.instagram) && (
                <div className="flex flex-wrap gap-3 mt-7">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ink inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-transform hover:-translate-y-0.5 active:scale-95"
                      style={{
                        background: "var(--bg-inverted)",
                        color: "var(--text-inverted)",
                        border: "1px solid var(--bg-inverted)",
                      }}
                    >
                      {project.links.liveAsWeb ? (
                        <Globe size={15} className="shrink-0" />
                      ) : (
                        <ExternalLink size={15} className="shrink-0" />
                      )}
                      <span>
                        {t(project.links.liveAsWeb ? "links_web" : "links_live")}
                      </span>
                      <ArrowUpRight size={15} className="shrink-0" />
                    </a>
                  )}
                  {project.links.playStore && (
                    <a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${project.links.live ? "btn-outline" : "btn-ink"} inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-transform hover:-translate-y-0.5 active:scale-95`}
                      style={
                        project.links.live
                          ? {
                              background: "var(--bg-card)",
                              color: "var(--text-primary)",
                              border: "1px solid var(--border-color-hover)",
                            }
                          : {
                              background: "var(--bg-inverted)",
                              color: "var(--text-inverted)",
                              border: "1px solid var(--bg-inverted)",
                            }
                      }
                    >
                      <Smartphone size={15} className="shrink-0" />
                      <span>{t("links_playstore")}</span>
                      <ArrowUpRight size={15} className="shrink-0" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-transform hover:-translate-y-0.5 active:scale-95"
                      style={{
                        background: "var(--bg-card)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-color-hover)",
                      }}
                    >
                      <GithubIcon size={15} />
                      <span>{t("links_github")}</span>
                    </a>
                  )}
                  {project.links.instagram && (
                    <a
                      href={project.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-transform hover:-translate-y-0.5 active:scale-95"
                      style={{
                        background: "var(--bg-card)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-color-hover)",
                      }}
                    >
                      <SiInstagram size={15} />
                      <span>Instagram</span>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* 3. 4-Column Metric Highlights Bar (Asymmetric Style) */}
          {highlights.length > 0 && (
            <motion.div
              variants={fadeInUp}
              custom={1}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              {highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="p-6 flex flex-col justify-between border-b sm:border-b-0 sm:border-r last:border-r-0 last:border-b-0"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <span
                    className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider mb-2 block"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    [{t("metric_tag")} 0{idx + 1}]
                  </span>
                  <div>
                    <p
                      className="text-2xl sm:text-3xl font-bold tracking-tight mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {h.metric}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {h.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 4. Interactive Interface Gallery (Asymmetric Style Stage + Filmstrip) */}
          {hasMedia && (
            <motion.div variants={fadeInUp} custom={1.3}>
              <ProjectGallery
                media={project.media!}
                onOpenLightbox={(idx) => setLightboxIndex(idx)}
                isDesktop={project.slug !== "elepad"}
                projectTitle={projectTitle}
              />
            </motion.div>
          )}

          {/* 5. Dual Problem vs. Solution Dossier Block (Asymmetric Style) */}
          <motion.div
            variants={fadeInUp}
            custom={1.6}
            className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Left: The Problem / Need */}
            <div
              className="p-7 sm:p-9 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "var(--border-color)" }}
            >
              <span
                className="font-mono-tech text-xs font-semibold uppercase tracking-wider block mb-2"
                style={{ color: "var(--accent-blue)" }}
              >
                [{t("problem_tag")}]
              </span>
              <h2
                className="text-xl sm:text-2xl font-semibold tracking-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {t("problem_title")}
              </h2>
              <p
                className="text-sm sm:text-[15px] leading-[1.75]"
                style={{ color: "var(--text-secondary)" }}
              >
                {projectChallenge}
              </p>
            </div>

            {/* Right: The Implemented Solution */}
            <div
              className="p-7 sm:p-9"
              style={{ background: "var(--bg-secondary)" }}
            >
              <span
                className="font-mono-tech text-xs font-semibold uppercase tracking-wider block mb-2"
                style={{ color: "var(--accent-blue)" }}
              >
                [{t("solution_tag")}]
              </span>
              <h2
                className="text-xl sm:text-2xl font-semibold tracking-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {t("solution_title")}
              </h2>
              <p
                className="text-sm sm:text-[15px] leading-[1.75]"
                style={{ color: "var(--text-primary)" }}
              >
                {projectSolution}
              </p>
            </div>
          </motion.div>

          {/* 6. Key Functional Capabilities (01..04 Cards — What the system enables day-to-day) */}
          {keyFeatures.length > 0 && (
            <motion.div variants={fadeInUp} custom={1.9} className="space-y-6">
              <div>
                <span
                  className="font-mono-tech text-xs font-semibold uppercase tracking-wider block mb-1.5"
                  style={{ color: "var(--accent-blue)" }}
                >
                  [{t("capabilities_tag")}]
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("capabilities_title")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {keyFeatures.map((kf, idx) => (
                  <div key={idx} className="editorial-card p-6 sm:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-7 h-7 rounded-md font-mono-tech text-xs font-bold flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "var(--bg-inverted)",
                          color: "var(--text-inverted)",
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <h3
                        className="text-base sm:text-lg font-semibold tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {kf.title}
                      </h3>
                      <CheckCircle2
                        size={15}
                        className="ml-auto flex-shrink-0"
                        style={{ color: "var(--accent-blue)" }}
                      />
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {kf.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 7. Video Demo (if present) */}
          {project.videoEmbed && (
            <motion.div variants={fadeInUp} custom={2.1} className="space-y-4">
              <div>
                <span
                  className="font-mono-tech text-xs font-semibold uppercase tracking-wider block mb-1"
                  style={{ color: "var(--accent-blue)" }}
                >
                  [{t("video_tag")}]
                </span>
                <h2
                  className="text-xl sm:text-2xl font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("video_title")}
                </h2>
              </div>
              <div className="editorial-card p-3 sm:p-4 max-w-3xl">
                <div className="w-full rounded-xl overflow-hidden aspect-video">
                  <iframe
                    src={project.videoEmbed}
                    title={`${projectTitle} Demo Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
             8. TECHNICAL DEEP DIVE AT THE BOTTOM (Engineering & Architecture)
             Preserves 100% of existing stack, technical features, diagrams & PDFs
             ═══════════════════════════════════════════════════════════════════ */}
          <div
            className="pt-12 mt-12 border-t space-y-8"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div>
              <span
                className="font-mono-tech text-xs font-semibold uppercase tracking-wider block mb-2"
                style={{ color: "var(--accent-blue)" }}
              >
                [{t("technical_tag")}]
              </span>
              <h2
                className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t("technical_title")}
              </h2>
              <p
                className="text-sm max-w-2xl leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {t("technical_subtitle")}
              </p>
            </div>

            {/* Tech Stack by Layer */}
            <motion.div variants={fadeInUp} custom={2.2} className="editorial-card p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <Layers size={16} style={{ color: "var(--accent-blue)" }} />
                <h3
                  className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {t("stack_title")}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(() => {
                  const cats = [
                    { id: "frontend", title: t("cat_frontend") },
                    { id: "backend", title: t("cat_backend") },
                    { id: "database", title: t("cat_database") },
                    { id: "devops", title: t("cat_devops") },
                  ];
                  const visible = cats.filter((cat) =>
                    project.tags.some((tag) => tagCategories[tag] === cat.id)
                  );
                  return visible.map((cat, idx) => {
                    const catTags = project.tags.filter(
                      (tag) => tagCategories[tag] === cat.id
                    );
                    const isFullWidth =
                      visible.length % 2 !== 0 && idx === visible.length - 1;
                    return (
                      <div
                        key={cat.id}
                        className={`p-4 rounded-xl border flex flex-col gap-3${
                          isFullWidth ? " md:col-span-2" : ""
                        }`}
                        style={{
                          background: "var(--bg-secondary)",
                          borderColor: "var(--border-color)",
                        }}
                      >
                        <h4
                          className="text-xs font-mono-tech font-semibold uppercase tracking-wider flex items-center gap-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--accent-blue)" }}
                          />
                          {cat.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {catTags.map((tag) => {
                            const IconConfig = iconMap[tag];
                            return (
                              <span key={tag} className="tech-badge">
                                {IconConfig && (
                                  <IconConfig.icon
                                    size={13}
                                    style={{ color: IconConfig.color }}
                                  />
                                )}
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </motion.div>

            {/* Complete Engineering Features List */}
            <motion.div variants={fadeInUp} custom={2.4} className="editorial-card p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 size={16} style={{ color: "var(--accent-blue)" }} />
                <h3
                  className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {t("features_title")}
                </h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
                {(t.raw(`${project.slug}.features`) as string[]).map(
                  (feature: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="font-mono-tech text-[11px] font-semibold mt-0.5 flex-shrink-0"
                        style={{ color: "var(--accent-blue)" }}
                      >
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span>{feature}</span>
                    </li>
                  )
                )}
              </ul>
            </motion.div>

            {/* System Architecture Section (Specific to Elepad) */}
            {project.slug === "elepad" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("elepad.arch_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("elepad.arch_desc")}
                </p>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/elepad/system-architecture.png");
                      setActiveDiagramTitle(t("elepad.arch_title"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-xl overflow-hidden border group cursor-pointer text-left focus:outline-none"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
                  >
                    <img
                      src="/projects/elepad/system-architecture.png"
                      alt={t("elepad.arch_title")}
                      className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 group-hover:scale-[1.01] p-2 sm:p-4 mx-auto"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-mono-tech font-semibold px-3.5 py-1.5 rounded-full bg-black text-white">
                        {t("expand_image")}
                      </span>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Database Schema Section (Specific to Elepad) */}
            {project.slug === "elepad" && (
              <motion.div variants={fadeInUp} custom={3.2} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("elepad.db_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("elepad.db_desc")}
                </p>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/elepad/db-der-simplified.png");
                      setActiveDiagramTitle(t("elepad.db_title"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-xl overflow-hidden border group cursor-pointer text-left focus:outline-none"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
                  >
                    <img
                      src="/projects/elepad/db-der-simplified.png"
                      alt={t("elepad.db_title")}
                      className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 group-hover:scale-[1.01] p-2 sm:p-4 mx-auto"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-mono-tech font-semibold px-3.5 py-1.5 rounded-full bg-black text-white">
                        {t("expand_image")}
                      </span>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* System Architecture Section (Specific to Play Finder) */}
            {project.slug === "play-finder" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("play-finder.arch_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("play-finder.arch_desc")}
                </p>
              </motion.div>
            )}

            {/* Database Schema Section (Specific to Play Finder) */}
            {project.slug === "play-finder" && (
              <motion.div variants={fadeInUp} custom={3.2} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("play-finder.db_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("play-finder.db_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      Modelo Conceptual Inicial (Sprint 1)
                    </h4>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/play-finder/db-schema-initial.png");
                        setActiveDiagramTitle("Modelo Conceptual Inicial (Sprint 1)");
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)", background: "var(--bg-primary)" }}
                    >
                      <img
                        src="/projects/play-finder/db-schema-initial.png"
                        alt="Modelo Conceptual Inicial (Sprint 1)"
                        className="w-full h-44 object-contain transition-all duration-300 group-hover:scale-[1.02] p-2 mx-auto"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      Modelo Conceptual Final (Sprint 8)
                    </h4>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/play-finder/db-schema-conceptual.png");
                        setActiveDiagramTitle("Modelo Conceptual Final (Sprint 8)");
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)", background: "var(--bg-primary)" }}
                    >
                      <img
                        src="/projects/play-finder/db-schema-conceptual.png"
                        alt="Modelo Conceptual Final (Sprint 8)"
                        className="w-full h-44 object-contain transition-all duration-300 group-hover:scale-[1.02] p-2 mx-auto"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* System Architecture Section (Specific to SCyT) */}
            {project.slug === "scyt-utn" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("arch_title")}
                  </h3>
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
                      className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 group-hover:scale-[1.01] p-2 sm:p-4 mx-auto"
                    />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Database Schema Section (Specific to SCyT) */}
            {project.slug === "scyt-utn" && (
              <motion.div variants={fadeInUp} custom={3.2} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("db_schema_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("db_schema_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("db_der_title")}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
                        className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("db_physical_title")}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
                        className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Serverless Architecture Section (Specific to Duo Propiedades) */}
            {project.slug === "duo-propiedades" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("duo-propiedades.arch_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("duo-propiedades.arch_desc")}
                </p>
              </motion.div>
            )}

            {/* Front-End Architecture Section (Specific to Chess Study) */}
            {project.slug === "chess-study" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("chess-study.arch_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("chess-study.arch_desc")}
                </p>
              </motion.div>
            )}

            {/* Cloud Architecture Section (Specific to DevOps Azure) */}
            {project.slug === "devops-azure" && (
              <motion.div variants={fadeInUp} custom={3.0} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Layers size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("devops_arch_title")}
                  </h3>
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
                      className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 group-hover:scale-[1.01] p-2 sm:p-4 mx-auto"
                    />
                  </button>
                </div>
              </motion.div>
            )}

            {/* CI/CD Pipeline Section (Specific to DevOps Azure) */}
            {project.slug === "devops-azure" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("devops_pipeline_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("devops_pipeline_desc")}
                </p>

                <div className="space-y-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border w-full" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("devops_parallel_label")}
                    </h4>
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
                        className="w-full h-auto object-contain transition-all duration-300 group-hover:scale-[1.01]"
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("devops_success_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
                          className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105"
                        />
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("devops_detail_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
                          className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SmartCatalog Views Section (Specific to DevOps Azure) */}
            {project.slug === "devops-azure" && (
              <motion.div variants={fadeInUp} custom={3.3} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("devops_app_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("devops_app_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("devops_voting_label")}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
                        className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("devops_stats_label")}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
                        className="w-full h-48 object-cover object-center transition-all duration-300 group-hover:scale-105"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Kubernetes Cluster Architecture Section */}
            {project.slug === "devops-kubernetes" && (
              <motion.div variants={fadeInUp} custom={3.0} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Layers size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("k8s_cluster_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("k8s_cluster_desc")}
                </p>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setActiveDiagramUrl("/projects/devops-kubernetes/communication-architecture.png");
                      setActiveDiagramTitle(t("k8s_cluster_title"));
                      setZoomLevel(1);
                    }}
                    className="relative block w-full rounded-xl overflow-hidden border group cursor-pointer text-left focus:outline-none"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
                  >
                    <img
                      src="/projects/devops-kubernetes/communication-architecture.png"
                      alt={t("k8s_cluster_title")}
                      className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 group-hover:scale-[1.01] p-2 sm:p-4 mx-auto"
                    />
                  </button>
                </div>
              </motion.div>
            )}

            {/* K8s HA + Data Flow Section */}
            {project.slug === "devops-kubernetes" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("k8s_ha_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("k8s_ha_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("k8s_ha_title")}
                    </h4>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/devops-kubernetes/high-availability.png");
                        setActiveDiagramTitle(t("k8s_ha_title"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/devops-kubernetes/high-availability.png"
                        alt={t("k8s_ha_title")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("k8s_flow_label")}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {t("k8s_flow_desc")}
                    </p>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/devops-kubernetes/data-flow.png");
                        setActiveDiagramTitle(t("k8s_flow_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/devops-kubernetes/data-flow.png"
                        alt={t("k8s_flow_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* K8s Observability Stack Section */}
            {project.slug === "devops-kubernetes" && (
              <motion.div variants={fadeInUp} custom={3.3} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("k8s_observability_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("k8s_observability_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("k8s_metrics_label")}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {t("k8s_metrics_desc")}
                    </p>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/devops-kubernetes/metrics-stack.png");
                        setActiveDiagramTitle(t("k8s_metrics_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/devops-kubernetes/metrics-stack.png"
                        alt={t("k8s_metrics_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                      {t("k8s_tracing_label")}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {t("k8s_tracing_desc")}
                    </p>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/devops-kubernetes/tracing-stack.png");
                        setActiveDiagramTitle(t("k8s_tracing_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/devops-kubernetes/tracing-stack.png"
                        alt={t("k8s_tracing_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Part 1: Dimensional Modeling (Specific to Data Warehouse) */}
            {project.slug === "data-warehouse" && (
              <motion.div variants={fadeInUp} custom={3.1} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("bi_modeling_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("bi_modeling_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border h-full justify-between" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("bi_conceptual_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {t("bi_conceptual_desc")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/data-warehouse/conceptual-model.png");
                        setActiveDiagramTitle(t("bi_conceptual_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/data-warehouse/conceptual-model.png"
                        alt={t("bi_conceptual_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border h-full justify-between" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("bi_physical_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {t("bi_physical_desc")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/data-warehouse/physical-model.png");
                        setActiveDiagramTitle(t("bi_physical_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/data-warehouse/physical-model.png"
                        alt={t("bi_physical_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Part 2: SSIS ETL (Specific to Data Warehouse) */}
            {project.slug === "data-warehouse" && (
              <motion.div variants={fadeInUp} custom={3.2} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Server size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("bi_etl_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("bi_etl_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border h-full justify-between" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("bi_control_flow_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {t("bi_control_flow_desc")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/data-warehouse/etl-control-flow.png");
                        setActiveDiagramTitle(t("bi_control_flow_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/data-warehouse/etl-control-flow.png"
                        alt={t("bi_control_flow_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border h-full justify-between" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("bi_scd_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {t("bi_scd_desc")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/data-warehouse/scd-schema.png");
                        setActiveDiagramTitle(t("bi_scd_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/data-warehouse/scd-schema.png"
                        alt={t("bi_scd_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Part 3: SSAS & Power BI (Specific to Data Warehouse) */}
            {project.slug === "data-warehouse" && (
              <motion.div variants={fadeInUp} custom={3.3} className="editorial-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("bi_olap_title")}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t("bi_olap_desc")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-3 p-4 rounded-xl border h-full justify-between" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("bi_cube_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {t("bi_cube_desc")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/data-warehouse/olap-cube.png");
                        setActiveDiagramTitle(t("bi_cube_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/data-warehouse/olap-cube.png"
                        alt={t("bi_cube_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl border h-full justify-between" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                        {t("bi_powerbi_label")}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {t("bi_powerbi_desc")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDiagramUrl("/projects/data-warehouse/powerbi-dashboard.png");
                        setActiveDiagramTitle(t("bi_powerbi_label"));
                        setZoomLevel(1);
                      }}
                      className="relative block w-full rounded-lg overflow-hidden border group cursor-pointer mt-auto text-left focus:outline-none"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <img
                        src="/projects/data-warehouse/powerbi-dashboard.png"
                        alt={t("bi_powerbi_label")}
                        className="w-full h-48 object-contain object-center transition-all duration-300 group-hover:scale-105 p-2"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Documents (PDFs) */}
            {project.documents && project.documents.length > 0 && (
              <motion.div variants={fadeInUp} custom={3.5} className="editorial-card p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-5">
                  <FileText size={16} style={{ color: "var(--accent-blue)" }} />
                  <h3
                    className="text-xs font-mono-tech font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t("documents_title")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 group"
                      style={{
                        background: "var(--bg-secondary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="p-2.5 rounded-lg flex-shrink-0 border"
                          style={{
                            background: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <FileText size={18} style={{ color: "var(--accent-blue)" }} />
                        </div>
                        <span
                          className="text-xs sm:text-sm font-medium text-left leading-snug break-words"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {doc.title}
                        </span>
                      </div>
                      <Download
                        size={15}
                        className="flex-shrink-0 ml-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ color: "var(--accent-blue)" }}
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* 9. Prev / Next Project Navigation + Bottom CTA Banner (Asymmetric Style) */}
          <div
            className="pt-10 mt-12 border-t space-y-8"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/projects/${prevProject.slug}`}
                className="editorial-card p-5 flex items-center justify-between group"
              >
                <div>
                  <span
                    className="font-mono-tech text-[11px] uppercase tracking-wider block mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("prev_project")}
                  </span>
                  <span
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t(`${prevProject.slug}.title`)}
                  </span>
                </div>
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                  style={{ color: "var(--accent-blue)" }}
                />
              </Link>

              <Link
                href={`/projects/${nextProject.slug}`}
                className="editorial-card p-5 flex items-center justify-between text-right group"
              >
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--accent-blue)" }}
                />
                <div>
                  <span
                    className="font-mono-tech text-[11px] uppercase tracking-wider block mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("next_project")}
                  </span>
                  <span
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t(`${nextProject.slug}.title`)}
                  </span>
                </div>
              </Link>
            </div>

            {/* Bottom Contact Callout */}
            <div
              className="rounded-2xl p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              style={{
                background: "var(--bg-inverted)",
                color: "var(--text-inverted)",
              }}
            >
              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
                  {t("cta_banner_title")}
                </h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  {t("cta_banner_sub")}
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono-tech font-semibold uppercase tracking-wider flex-shrink-0 transition-transform hover:-translate-y-0.5"
                style={{
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                }}
              >
                <span>{t("cta_banner_btn")}</span>
                <ArrowUpRight size={15} style={{ color: "var(--accent-blue)" }} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox */}
        {hasMedia && (
          <ProjectLightbox
            media={project.media!}
            selectedIndex={lightboxIndex}
            setSelectedIndex={setLightboxIndex}
          />
        )}

        {/* Custom Zoomable Lightbox for Architecture & DB Diagrams */}
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
                  <span
                    className="text-[10px] sm:text-xs font-mono-tech font-semibold uppercase tracking-widest"
                    style={{ color: "#60A5FA" }}
                  >
                    {t("technical_tag")}
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
                    className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-40 transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-[11px] font-mono-tech font-semibold text-white px-1 min-w-[2.8rem] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-40 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <div className="w-px h-3.5 bg-white/20 mx-1" />
                  <button
                    onClick={handleZoomReset}
                    className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveDiagramUrl(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
                    dragConstraints={{
                      left: -300 * (zoomLevel - 1),
                      right: 300 * (zoomLevel - 1),
                      top: -200 * (zoomLevel - 1),
                      bottom: 200 * (zoomLevel - 1),
                    }}
                    style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
                    whileTap={{ cursor: zoomLevel > 1 ? "grabbing" : "default" }}
                  />
                </motion.div>
              </div>

              {/* Footer instruction */}
              <div className="text-center z-50 mb-2">
                <p className="text-xs font-mono-tech text-white/50">
                  {zoomLevel > 1
                    ? "Haz clic y arrastra para explorar el diagrama"
                    : "Usa los controles para hacer zoom en el diagrama"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
