"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { iconMap } from "@/utils/iconMap";

type SkillElement = {
  num: string;
  symbol: string;
  name: string;
  iconKey: string;
  cat: "languages" | "frontend" | "backend" | "devops" | "data" | "tools";
  descEs: string;
  descEn: string;
  projects: { slug: string; label: string }[];
};

const skillElements: SkillElement[] = [
  // Languages
  {
    num: "01",
    symbol: "Ts",
    name: "TypeScript",
    iconKey: "TypeScript",
    cat: "languages",
    descEs: "Tipado estático de extremo a extremo para aplicaciones web, móviles y APIs serverless.",
    descEn: "End-to-end static typing across web applications, mobile apps, and serverless APIs.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "dosel", label: "Dosel" },
      { slug: "duo-propiedades", label: "DÚO Propiedades" },
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "02",
    symbol: "Js",
    name: "JavaScript",
    iconKey: "JavaScript (ES6+)",
    cat: "languages",
    descEs: "Desarrollo de interfaces reactivas, procesamiento asíncrono y Web Workers.",
    descEn: "Reactive UI development, asynchronous workflows, and background Web Workers.",
    projects: [
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "chess-study", label: "Chess Study" },
    ],
  },
  {
    num: "03",
    symbol: "Py",
    name: "Python",
    iconKey: "Python",
    cat: "languages",
    descEs: "APIs REST con Flask, agentes de recomendación con IA y oráculo satelital Sentinel-2.",
    descEn: "REST APIs with Flask, AI recommendation agents, and Sentinel-2 satellite oracle.",
    projects: [
      { slug: "dosel", label: "Dosel" },
      { slug: "datebox", label: "Datebox" },
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
      { slug: "devops-azure", label: "CI/CD Azure" },
    ],
  },
  {
    num: "04",
    symbol: "Rs",
    name: "Rust",
    iconKey: "Rust",
    cat: "languages",
    descEs: "Desarrollo de contratos inteligentes en Soroban (Stellar), manejo seguro de memoria y compilación a WebAssembly.",
    descEn: "Smart contracts development on Soroban (Stellar), memory safety, and WebAssembly compilation.",
    projects: [
      { slug: "dosel", label: "Dosel" },
    ],
  },
  {
    num: "05",
    symbol: "Sq",
    name: "SQL",
    iconKey: "SQL",
    cat: "languages",
    descEs: "Modelado relacional normalizado, consultas complejas y almacenes dimensionales.",
    descEn: "Normalized relational modeling, complex queries, and dimensional data warehouses.",
    projects: [
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "data-warehouse", label: "Data Warehouse & BI" },
      { slug: "elepad", label: "Elepad" },
    ],
  },

  // Frontend & Mobile
  {
    num: "06",
    symbol: "Re",
    name: "React",
    iconKey: "React",
    cat: "frontend",
    descEs: "Arquitectura de componentes reutilizables, hooks personalizados y estado sincronizado.",
    descEn: "Reusable component architecture, custom hooks, and synchronized client state.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "dosel", label: "Dosel" },
      { slug: "duo-propiedades", label: "DÚO Propiedades" },
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "chess-study", label: "Chess Study" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "07",
    symbol: "Nx",
    name: "Next.js",
    iconKey: "Next.js",
    cat: "frontend",
    descEs: "Plataformas web optimizadas para SEO, App Router y renderizado híbrido en servidor.",
    descEn: "SEO-optimized web platforms, App Router, and hybrid server rendering.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "duo-propiedades", label: "DÚO Propiedades" },
      { slug: "devops-azure", label: "CI/CD Azure" },
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
    ],
  },
  {
    num: "08",
    symbol: "Rn",
    name: "React Native",
    iconKey: "React Native",
    cat: "frontend",
    descEs: "Aplicaciones móviles nativas multiplataforma (Android e iOS) publicadas en tiendas.",
    descEn: "Cross-platform native mobile apps (Android & iOS) published on app stores.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "09",
    symbol: "Ex",
    name: "Expo",
    iconKey: "Expo",
    cat: "frontend",
    descEs: "Ecosistema móvil, builds en la nube con EAS, notificaciones push y autenticación.",
    descEn: "Mobile ecosystem, cloud builds with EAS, push notifications, and native auth.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "10",
    symbol: "Tw",
    name: "Tailwind CSS",
    iconKey: "Tailwind CSS",
    cat: "frontend",
    descEs: "Sistemas de diseño consistentes, layouts mobile-first y temas claro/oscuro.",
    descEn: "Consistent design systems, mobile-first layouts, and light/dark theming.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "dosel", label: "Dosel" },
      { slug: "duo-propiedades", label: "DÚO Propiedades" },
      { slug: "chess-study", label: "Chess Study" },
      { slug: "devops-azure", label: "CI/CD Azure" },
    ],
  },
  {
    num: "11",
    symbol: "Tq",
    name: "TanStack Query",
    iconKey: "TanStack Query",
    cat: "frontend",
    descEs: "Caché inteligente de peticiones asíncronas, sincronización y reducción de carga al servidor.",
    descEn: "Smart async request caching, state synchronization, and reduced server load.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "12",
    symbol: "Ck",
    name: "Chakra UI",
    iconKey: "ChakraUI",
    cat: "frontend",
    descEs: "Componentes accesibles para sistemas de gestión administrativa y portales complejos.",
    descEn: "Accessible UI components for administrative systems and complex web portals.",
    projects: [
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "13",
    symbol: "Vt",
    name: "Vite & Web Apps",
    iconKey: "Vite",
    cat: "frontend",
    descEs: "Empaquetado ultrarrápido con Vite, renderizado con PDF.js a 60 FPS y aplicaciones web interactivas.",
    descEn: "Lightning-fast Vite bundling, 60 FPS PDF.js rendering, and interactive web applications.",
    projects: [
      { slug: "dosel", label: "Dosel" },
      { slug: "chess-study", label: "Chess Study" },
      { slug: "datebox", label: "Datebox" },
    ],
  },

  // Backend & Databases
  {
    num: "14",
    symbol: "No",
    name: "Node.js",
    iconKey: "Node.js",
    cat: "backend",
    descEs: "Construcción de servicios backend escalables con arquitectura en capas (Controller-Service-Repository).",
    descEn: "Scalable backend services built with layered architecture (Controller-Service-Repository).",
    projects: [
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "15",
    symbol: "Ep",
    name: "Express.js",
    iconKey: "Express.js",
    cat: "backend",
    descEs: "APIs RESTful seguras con validación de esquemas, middlewares y control de acceso.",
    descEn: "Secure RESTful APIs with schema validation, custom middleware, and access control.",
    projects: [
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "16",
    symbol: "Ho",
    name: "Hono",
    iconKey: "Hono",
    cat: "backend",
    descEs: "APIs serverless ultralivianas en el Edge con validación OpenAPI.",
    descEn: "Ultra-lightweight Edge serverless APIs with OpenAPI validation.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "17",
    symbol: "Fl",
    name: "Flask",
    iconKey: "Flask",
    cat: "backend",
    descEs: "Microservicios en Python instrumentados con métricas y trazas distribuidas.",
    descEn: "Python microservices instrumented with metrics and distributed tracing.",
    projects: [
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
      { slug: "devops-azure", label: "CI/CD Azure" },
    ],
  },
  {
    num: "18",
    symbol: "Pg",
    name: "PostgreSQL",
    iconKey: "PostgreSQL",
    cat: "backend",
    descEs: "Motor relacional principal para sistemas transaccionales con integridad referencial estricta.",
    descEn: "Primary relational engine for transactional systems with strict referential integrity.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "duo-propiedades", label: "DÚO Propiedades" },
      { slug: "elepad", label: "Elepad" },
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "19",
    symbol: "Sb",
    name: "Supabase",
    iconKey: "Supabase",
    cat: "backend",
    descEs: "Base de datos PostgreSQL, autenticación OAuth, Storage en la nube y sincronización Realtime.",
    descEn: "PostgreSQL database, OAuth authentication, cloud storage, and Realtime sync.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "duo-propiedades", label: "DÚO Propiedades" },
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "20",
    symbol: "Pr",
    name: "Prisma ORM",
    iconKey: "Prisma ORM",
    cat: "backend",
    descEs: "Modelado declarativo de esquemas, migraciones seguras y consultas tipadas.",
    descEn: "Declarative schema modeling, safe migrations, and type-safe database queries.",
    projects: [
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "21",
    symbol: "Rd",
    name: "Redis",
    iconKey: "Redis",
    cat: "backend",
    descEs: "Almacenamiento en memoria de baja latencia y persistencia AOF en contenedores.",
    descEn: "Low-latency in-memory store and AOF persistence across containerized environments.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
      { slug: "devops-azure", label: "CI/CD Azure" },
    ],
  },
  {
    num: "22",
    symbol: "Jw",
    name: "JWT & OAuth",
    iconKey: "JWT/OAuth",
    cat: "backend",
    descEs: "Autenticación segura con tokens firmados, Google OAuth y protección de rutas por rol.",
    descEn: "Secure authentication with signed tokens, Google OAuth, and role-based route guards.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "elepad", label: "Elepad" },
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "23",
    symbol: "St",
    name: "Stellar / Soroban",
    iconKey: "Stellar",
    cat: "backend",
    descEs: "Smart contracts en Soroban (Rust), tokenización de activos ecológicos y oráculos criptográficos on-chain.",
    descEn: "Soroban (Rust) smart contracts, eco-asset tokenization, and cryptographic on-chain oracles.",
    projects: [
      { slug: "dosel", label: "Dosel" },
    ],
  },

  // DevOps & Cloud
  {
    num: "24",
    symbol: "Dk",
    name: "Docker",
    iconKey: "Docker",
    cat: "devops",
    descEs: "Contenerización multi-stage y entornos locales reproducibles con Docker Compose.",
    descEn: "Multi-stage containerization and reproducible local environments with Docker Compose.",
    projects: [
      { slug: "devops-azure", label: "CI/CD Azure" },
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "25",
    symbol: "K8",
    name: "Kubernetes",
    iconKey: "Kubernetes",
    cat: "devops",
    descEs: "Orquestación de clusters multi-nodo (K3d), alta disponibilidad (podAntiAffinity) y auto-healing.",
    descEn: "Multi-node cluster orchestration (K3d), high availability (podAntiAffinity), and self-healing.",
    projects: [
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
    ],
  },
  {
    num: "26",
    symbol: "Ga",
    name: "GitHub Actions",
    iconKey: "GitHub Actions",
    cat: "devops",
    descEs: "Pipelines automatizados de testing continuo (CI) y despliegue en la nube (CD).",
    descEn: "Automated Continuous Integration (CI) testing and Cloud Deployment (CD) pipelines.",
    projects: [
      { slug: "devops-azure", label: "CI/CD Azure" },
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "27",
    symbol: "Az",
    name: "Azure Cloud",
    iconKey: "Azure",
    cat: "devops",
    descEs: "Despliegue en Azure Container Instances (ACI), Container Apps y registro privado ACR.",
    descEn: "Cloud deployment on Azure Container Instances (ACI), Container Apps, and private ACR.",
    projects: [
      { slug: "devops-azure", label: "CI/CD Azure" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "28",
    symbol: "Cf",
    name: "Cloudflare",
    iconKey: "Cloudflare Workers",
    cat: "devops",
    descEs: "Ejecución serverless distribuida globalmente con latencia mínima en Cloudflare Workers.",
    descEn: "Globally distributed serverless execution with minimal cold-start latency.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "29",
    symbol: "Vc",
    name: "Vercel & Render",
    iconKey: "Vercel",
    cat: "devops",
    descEs: "Despliegue continuo de plataformas web en producción con dominios personalizados y SSL.",
    descEn: "Continuous production deployment of web platforms with custom domains and SSL.",
    projects: [
      { slug: "mandadito", label: "Mandadito" },
      { slug: "duo-propiedades", label: "DÚO Propiedades" },
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "chess-study", label: "Chess Study" },
    ],
  },
  {
    num: "30",
    symbol: "Ot",
    name: "OpenTelemetry",
    iconKey: "OpenTelemetry",
    cat: "devops",
    descEs: "Instrumentación de trazas distribuidas y colección de telemetría hacia Grafana Tempo.",
    descEn: "Distributed trace instrumentation and telemetry collection piped into Grafana Tempo.",
    projects: [
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
    ],
  },
  {
    num: "31",
    symbol: "Gf",
    name: "Grafana & Prom",
    iconKey: "Grafana",
    cat: "devops",
    descEs: "Monitoreo en tiempo real de métricas de negocio (RPS, latencia p95) y salud de pods.",
    descEn: "Real-time monitoring of business metrics (RPS, p95 latency) and cluster pod health.",
    projects: [
      { slug: "devops-kubernetes", label: "K8s & Observabilidad" },
    ],
  },

  // Data, BI & AI
  {
    num: "32",
    symbol: "Bi",
    name: "Power BI",
    iconKey: "Power BI",
    cat: "data",
    descEs: "Tableros ejecutivos interactivos con mapas geográficos, KPIs de ROI y navegación OLAP.",
    descEn: "Interactive executive dashboards with geographical maps, ROI KPIs, and OLAP navigation.",
    projects: [
      { slug: "data-warehouse", label: "Data Warehouse & BI" },
    ],
  },
  {
    num: "33",
    symbol: "Ss",
    name: "SSIS / SSAS",
    iconKey: "SSIS/SSAS",
    cat: "data",
    descEs: "Almacenes de datos dimensionales, flujos ETL con historización SCD y cubos OLAP.",
    descEn: "Dimensional data warehouses, ETL pipelines with SCD history, and OLAP cubes.",
    projects: [
      { slug: "data-warehouse", label: "Data Warehouse & BI" },
    ],
  },
  {
    num: "34",
    symbol: "Ai",
    name: "LangGraph & AI",
    iconKey: "LangGraph",
    cat: "data",
    descEs: "Integración de modelos generativos (Google Gemini) y agentes inteligentes en productos reales.",
    descEn: "Integration of generative AI models (Google Gemini) and smart agents into real products.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "35",
    symbol: "S2",
    name: "Sentinel-2 & GIS",
    iconKey: "Sentinel-2",
    cat: "data",
    descEs: "Procesamiento de imágenes multiespectrales Sentinel-2 (NDVI, teledetección) e inferencia ONNX en cliente.",
    descEn: "Sentinel-2 multispectral image processing (NDVI, remote sensing) and client-side ONNX inference.",
    projects: [
      { slug: "dosel", label: "Dosel" },
    ],
  },

  // Tools & Methodologies
  {
    num: "36",
    symbol: "Tb",
    name: "Turborepo",
    iconKey: "Turborepo",
    cat: "tools",
    descEs: "Orquestación de monorepos compartiendo código y tipos entre apps móviles, web y backend.",
    descEn: "Monorepo orchestration sharing code and types across mobile, web, and backend.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "datebox", label: "Datebox" },
    ],
  },
  {
    num: "37",
    symbol: "Gt",
    name: "Git & GitHub",
    iconKey: "Git",
    cat: "tools",
    descEs: "Flujos colaborativos por ramas, revisión de código y versionado semántico.",
    descEn: "Collaborative branching workflows, code reviews, and semantic versioning.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "scyt-utn", label: "Plataforma SCyT" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "38",
    symbol: "Sc",
    name: "Scrum & Jira",
    iconKey: "Jira",
    cat: "tools",
    descEs: "Planificación iterativa en sprints, entregas incrementales y certificación SFC.",
    descEn: "Iterative sprint planning, incremental releases, and SFC certification.",
    projects: [
      { slug: "elepad", label: "Elepad" },
      { slug: "play-finder", label: "Play Finder" },
    ],
  },
  {
    num: "39",
    symbol: "Pt",
    name: "Pytest & QA",
    iconKey: "Pytest",
    cat: "tools",
    descEs: "Pruebas unitarias y de integración automatizadas en pipelines antes de salir a producción.",
    descEn: "Automated unit and integration testing inside CI pipelines prior to production release.",
    projects: [
      { slug: "devops-azure", label: "CI/CD Azure" },
    ],
  },
];

export function Skills() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const [activeCat, setActiveCat] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillElement>(skillElements[0]);

  const categories = [
    { id: "all", label: t("filter_all") },
    { id: "languages", label: t("languages") },
    { id: "frontend", label: t("frontend") },
    { id: "backend", label: t("backend") },
    { id: "devops", label: t("devops") },
    { id: "data", label: t("data") },
    { id: "tools", label: t("tools") },
  ];

  const SelectedIcon = iconMap[selectedSkill.iconKey]?.icon;
  const selectedIconColor = iconMap[selectedSkill.iconKey]?.color;

  return (
    <section
      className="pt-20 sm:pt-24 pb-10 sm:pb-12"
      id="skills"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header + Category Filters Compact Top Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-[0.14em] mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="w-4 h-[1px] inline-block"
                style={{ background: "var(--accent-blue)" }}
              />
              {t("tag")}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] mt-1"
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
            className="text-xs sm:text-sm max-w-md leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {categories.map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono-tech transition-all duration-200 cursor-pointer active:scale-95"
                style={{
                  background: isActive ? "var(--bg-inverted)" : "var(--bg-card)",
                  color: isActive ? "var(--text-inverted)" : "var(--text-secondary)",
                  border: `1px solid ${
                    isActive ? "var(--bg-inverted)" : "var(--border-color)"
                  }`,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Compact Interactive Grid + Inspector Split (Fits on screen without scrolling) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Compact 6-Column Technology Matrix with Icons (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {skillElements.map((item) => {
              const isSelected = selectedSkill.num === item.num;
              const isDimmed = activeCat !== "all" && item.cat !== activeCat;
              const IconComp = iconMap[item.iconKey]?.icon;
              const iconColor = iconMap[item.iconKey]?.color;

              return (
                <button
                  key={item.num}
                  onClick={() => setSelectedSkill(item)}
                  className="relative px-2.5 py-2 rounded-xl text-left flex flex-col justify-between transition-all duration-150 cursor-pointer active:scale-95 border h-[66px]"
                  style={{
                    background: isSelected ? "var(--bg-inverted)" : "var(--bg-card)",
                    color: isSelected ? "var(--text-inverted)" : "var(--text-primary)",
                    borderColor: isSelected
                      ? "var(--bg-inverted)"
                      : "var(--border-color)",
                    opacity: isDimmed ? 0.25 : 1,
                  }}
                >
                  {/* Top Row: Index Number + Official Tech Icon */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className="font-mono-tech text-[10px] leading-none"
                      style={{
                        color: isSelected
                          ? "var(--text-inverted)"
                          : "var(--text-muted)",
                        opacity: isSelected ? 0.75 : 0.85,
                      }}
                    >
                      {item.num}
                    </span>
                    {IconComp ? (
                      <IconComp
                        size={15}
                        style={{
                          color: isSelected
                            ? "var(--text-inverted)"
                            : iconColor || "var(--accent-blue)",
                        }}
                      />
                    ) : (
                      <span
                        className="font-mono-tech text-[11px] font-bold"
                        style={{
                          color: isSelected
                            ? "var(--text-inverted)"
                            : "var(--accent-blue)",
                        }}
                      >
                        {item.symbol}
                      </span>
                    )}
                  </div>

                  {/* Bottom Row: Name */}
                  <span
                    className="text-[11.5px] font-semibold tracking-tight truncate block w-full leading-tight"
                    style={{
                      color: isSelected
                        ? "var(--text-inverted)"
                        : "var(--text-primary)",
                    }}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Technology Specimen Inspector Panel (4 cols) */}
          <div className="lg:col-span-4">
            <motion.div
              key={selectedSkill.num}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-6 border shadow-sm"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              {/* Top Tag */}
              <div
                className="flex items-center justify-between pb-3 mb-4 border-b font-mono-tech text-[11px]"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--accent-blue)",
                }}
              >
                <span>{t("inspector_tag")}</span>
                <span>
                  #{selectedSkill.num} · {selectedSkill.symbol}
                </span>
              </div>

              {/* Specimen Box with Icon */}
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border"
                  style={{
                    background: "var(--bg-inverted)",
                    color: "var(--text-inverted)",
                    borderColor: "var(--bg-inverted)",
                  }}
                >
                  {SelectedIcon ? (
                    <SelectedIcon
                      size={26}
                      style={{
                        color:
                          selectedIconColor &&
                          !selectedIconColor.startsWith("var(")
                            ? selectedIconColor
                            : "var(--text-inverted)",
                      }}
                    />
                  ) : (
                    <span className="text-xl font-bold tracking-tight">
                      {selectedSkill.symbol}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <span
                    className="font-mono-tech text-[11px] uppercase tracking-wider block mb-0.5"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    {t(selectedSkill.cat)}
                  </span>
                  <h3
                    className="text-xl font-bold tracking-tight truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedSkill.name}
                  </h3>
                </div>
              </div>

              {/* Practical Description */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                {locale === "es" ? selectedSkill.descEs : selectedSkill.descEn}
              </p>

              {/* Related Projects */}
              <div
                className="pt-4 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <p
                  className="font-mono-tech text-[11px] uppercase tracking-wider mb-2.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t("inspector_used_in")}
                </p>

                {selectedSkill.projects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.projects.map((proj) => (
                      <Link
                        key={proj.slug}
                        href={`/projects/${proj.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border hover:opacity-85"
                        style={{
                          background: "var(--bg-primary)",
                          borderColor: "var(--border-color)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <span>{proj.label}</span>
                        <ArrowUpRight
                          size={12}
                          style={{ color: "var(--accent-blue)" }}
                        />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("inspector_no_projects")}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
