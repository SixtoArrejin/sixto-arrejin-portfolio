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
      "React Native",
      "Expo",
      "TypeScript",
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
      "React.js",
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "ChakraUI",
      "TanStack Query",
      "JWT",
      "Render",
    ],
    type: "professional",
    links: {
      github:
        "https://github.com/SixtoArrejin/frre-scyt-research-manager",
    },
  },
  {
    slug: "devops-kubernetes",
    tags: [
      "Kubernetes",
      "K3d",
      "Docker",
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
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Azure",
      "Next.js",
      "Flask",
      "Redis",
    ],
    type: "academic",
    links: {},
  },
  {
    slug: "data-warehouse",
    tags: ["Power BI", "SQL Server", "SSIS", "SSAS", "ETL", "OLAP"],
    type: "academic",
    links: {},
  },
  {
    slug: "play-finder",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Azure",
      "JWT",
      "Google OAuth",
    ],
    type: "academic",
    team: 7,
    links: {
      github: "https://github.com/agustinbravop/utn-seminario",
    },
  },
];
