export type Project = {
  slug: string;
  tags: string[];
  type: "professional" | "academic" | "thesis";
  team?: number;
  links: {
    github?: string;
    live?: string;
    playStore?: string;
  };
  image?: string;
  media?: { type: "image" | "video"; url: string }[];
  documents?: { title: string; url: string; size?: string }[];
};

export const projects: Project[] = [
  {
    slug: "elepad",
    tags: [
      "TypeScript",
      "React Native",
      "Expo",
      "Cloudflare Workers",
      "Supabase",
      "PostgreSQL",
      "Turborepo",
      "GitHub Actions",
    ],
    type: "thesis",
    team: 5,
    links: {
      github: "https://github.com/elepad-org/Elepad",
      playStore:
        "https://play.google.com/store/apps/details?id=com.elepadorg.elepad",
    },
    media: Array.from({ length: 37 }, (_, i) => ({
      type: "image",
      url: `/projects/elepad/${i + 1}.jpg`,
    })),
    documents: [
      {
        title: "Escenario del Proyecto",
        url: "/projects/elepad/Elepad - Escenario Elepad.pdf",
      },
      {
        title: "Documentación Completa",
        url: "/projects/elepad/Elepad - Documentación Completa.pdf",
      },
      {
        title: "Descripción Técnica",
        url: "/projects/elepad/Elepad - Descripción Técnica.pdf",
      },
    ],
  },
  {
    slug: "scyt-utn",
    tags: [
      "JavaScript (ES6+)",
      "React.js",
      "ChakraUI",
      "TanStack Query",
      "Node.js",
      "Express",
      "JWT",
      "Prisma",
      "PostgreSQL",
      "Render",
    ],
    type: "professional",
    links: {
      github:
        "https://github.com/SixtoArrejin/frre-scyt-research-manager",
    },
    media: Array.from({ length: 36 }, (_, i) => ({
      type: "image",
      url: `/projects/scyt/${i + 1}.png`,
    })),
    documents: [
      {
        title: "Informe de Práctica Profesional Supervisada (PPS)",
        url: "/projects/scyt/Practica Supervisada - Informe Alumno - Sixto Feliciano Arrejin.pdf",
      },
    ],
  },
  {
    slug: "devops-kubernetes",
    tags: [
      "Docker",
      "K3d",
      "Kubernetes",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Tempo",
    ],
    type: "academic",
    links: {},
  },
  {
    slug: "devops-azure",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Python",
      "Flask",
      "Pytest",
      "Redis",
      "Docker",
      "Docker Compose",
      "Docker Buildx",
      "GitHub Actions",
      "Azure",
      "Azure ACR",
      "Azure ACI",
    ],
    type: "academic",
    team: 3,
    links: {
      github: "https://github.com/Andre-Leandro/Description-Evaluator/tree/docker",
    },
    media: Array.from({ length: 8 }, (_, i) => ({
      type: "image",
      url: `/projects/devops-azure/${i + 1}.png`,
    })),
    documents: [
      {
        title: "Consigna del Trabajo Práctico - App Web & Redis Contenerizados",
        url: "/projects/devops-azure/TP1-AppWebRedisContenerizados-DevOps-UTN-2025.pdf",
      },
      {
        title: "Informe Técnico de Entrega - Arrejín, Maciel & San Lorenzo",
        url: "/projects/devops-azure/devops-tp1-informe.pdf",
      },
    ],
  },
  {
    slug: "data-warehouse",
    tags: ["SQL Server", "ETL", "OLAP", "SSIS", "SSAS", "Power BI"],
    type: "academic",
    links: {},
  },
  {
    slug: "play-finder",
    tags: [
      "TypeScript",
      "React",
      "Node.js",
      "JWT",
      "Google OAuth",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Azure",
    ],
    type: "academic",
    team: 7,
    links: {
      github: "https://github.com/agustinbravop/utn-seminario",
    },
  },
];
