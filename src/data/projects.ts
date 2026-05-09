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
    media: [
      ...Array.from({ length: 37 }, (_, i) => ({
        type: "image" as const,
        url: `/projects/elepad/${i + 1}.jpg`,
      })),
      {
        type: "image" as const,
        url: "/projects/elepad/system-architecture.png",
      },
      {
        type: "image" as const,
        url: "/projects/elepad/db-der-simplified.png",
      },
    ],
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
      "Flask",
      "Python",
      "Docker",
      "K3d",
      "Kubernetes",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Tempo",
    ],
    type: "academic",
    team: 3,
    links: {
      github: "https://github.com/Andre-Leandro/Description-Evaluator/tree/orchestration-and-observability",
    },
    media: Array.from({ length: 6 }, (_, i) => ({
      type: "image",
      url: `/projects/devops-kubernetes/${i + 1}-${["arquitectura-de-comunicacion", "flujo-de-datos-detallados", "alta-disponibilidad-estrategia", "metricas", "trazas", "vision-general-cluster"][i]}.png`,
    })),
    documents: [
      {
        title: "Consigna del Trabajo Práctico — Orquestación y Observabilidad",
        url: "/projects/devops-kubernetes/TP2-OrquestacionObservabilidad-DevOps-UTN-2025.pdf",
      },
      {
        title: "Slide Deck de Entrega — Arquitectura del Cluster K8s",
        url: "/projects/devops-kubernetes/TP2-Arquitectura-SlideDeck.pdf",
      },
    ],
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
    team: 5,
    links: {},
    media: [
      { type: "image", url: "/projects/data-warehouse/1-tp1-m-conceptual-diagrama-relacional-.png" },
      { type: "image", url: "/projects/data-warehouse/2-tp1-d-fisico-entidad-relacion.png" },
      { type: "image", url: "/projects/data-warehouse/3-tp1-diagrama-ing-inversa-ssms.png" },
      { type: "image", url: "/projects/data-warehouse/4-tp2-conexion-db-datawarehouse.png" },
      { type: "image", url: "/projects/data-warehouse/5-tp2-control-flow-carga-inicial.png" },
      { type: "image", url: "/projects/data-warehouse/6-tp2-configuración-execute-sql-task-trunca-data-warehouse.png" },
      { type: "image", url: "/projects/data-warehouse/7-tp2-configuración-insertar-registros-comodines.png" },
      { type: "image", url: "/projects/data-warehouse/8-tp2-data-flow-etl-dimTiempo.png" },
      { type: "image", url: "/projects/data-warehouse/9-tp2-data-flow-etl-dimensiones-hoja.png" },
      { type: "image", url: "/projects/data-warehouse/10-tp2-data-flow-completo-etl-dimTienda-y-DimBanda.png" },
      { type: "image", url: "/projects/data-warehouse/11-tp2-etl-dimArtista-y-DimDisco.png" },
      { type: "image", url: "/projects/data-warehouse/12-tp2-execute-sql-task-para-asignar-representantes-en-DimBanda.png" },
      { type: "image", url: "/projects/data-warehouse/13-tp2-data-flow-del-etl-hechos.png" },
      { type: "image", url: "/projects/data-warehouse/14-tp2-etl-hechoVentas-basico.png" },
      { type: "image", url: "/projects/data-warehouse/15-tp2-etl-HechoVentas-parte-1-cargando-en-DimTiempo-fechas-no-encontradas.png" },
      { type: "image", url: "/projects/data-warehouse/16-tp2-etl-HechoVentas-parte-2-con-logging-de-los-registros-sin-dwid_banda-o-dwid_disco.png" },
      { type: "image", url: "/projects/data-warehouse/17-tp2-etl-HechoProducciones-básico.png" },
      { type: "image", url: "/projects/data-warehouse/18-tp2-etl-HechoProducciones-cargando-en-DimTiempo-las-fechas-no-encontradas.png" },
      { type: "image", url: "/projects/data-warehouse/19-tp2-control-flow-de-la-carga-inicial.png" },
      { type: "image", url: "/projects/data-warehouse/20-tp2-etl-DimTiempo.png" },
      { type: "image", url: "/projects/data-warehouse/21-tp2-etl-dimensiones-hoja.png" },
      { type: "image", url: "/projects/data-warehouse/22-tp2-etl-DimTienda-y-DimBanda.png" },
      { type: "image", url: "/projects/data-warehouse/23-tp2-etl-DimArtista-y-DimDisco.png" },
      { type: "image", url: "/projects/data-warehouse/24-etl-hechos.png" },
      { type: "image", url: "/projects/data-warehouse/25-tp2-esquema-carga-incremental.png" },
      { type: "image", url: "/projects/data-warehouse/26-tp2-etl-incremental-HechoVentas-1.png" },
      { type: "image", url: "/projects/data-warehouse/27-tp2-etl-incremental-HechoVentas-2.png" },
      { type: "image", url: "/projects/data-warehouse/28-tp2-etl-incremento-HechoProducciones-1.png" },
      { type: "image", url: "/projects/data-warehouse/29-tp2-etl-incremento-HechoProducciones-2.png" },
      { type: "image", url: "/projects/data-warehouse/30-tp2-Slowly-Changing-Dimensions.png" },
      { type: "image", url: "/projects/data-warehouse/31-tp2-incrementar-DimArtista-SCD-1.png" },
      { type: "image", url: "/projects/data-warehouse/32-tp2-incrementar-DimArtista-SCD-2.png" },
      { type: "image", url: "/projects/data-warehouse/33-tp2-incrementar-DimBanda-SCD-1.png" },
      { type: "image", url: "/projects/data-warehouse/34-tp2-incrementar-DimBanda-SCD-2.png" },
      { type: "image", url: "/projects/data-warehouse/35-tp2-incrementar-DimDiscos.png" },
      { type: "image", url: "/projects/data-warehouse/36-tp2-ejecución-de-SCD.png" },
      { type: "image", url: "/projects/data-warehouse/37-tp2-DQS-pantalla-inicial-de-SQL-Server-2022-Data-Services-Client.png" },
      { type: "image", url: "/projects/data-warehouse/38-tp2-DQS-Cleansing-el-data-flow-de-DimUbicacion.png" },
      { type: "image", url: "/projects/data-warehouse/39-tp2-mensaje-de-prerrequisitos-en-el-Master-Data-Configuration-Manager.png" },
      { type: "image", url: "/projects/data-warehouse/40-tp3-vista-de-Origen-de-Datos.png" },
      { type: "image", url: "/projects/data-warehouse/41-tp3-nuevo-cubo.png" },
      { type: "image", url: "/projects/data-warehouse/42-tp3-seleccionar-medidas.png" },
      { type: "image", url: "/projects/data-warehouse/43-tp3-seleccionar-dimensiones.png" },
      { type: "image", url: "/projects/data-warehouse/44-tp3-cubo.png" },
      { type: "image", url: "/projects/data-warehouse/45-tp3-conf-DimTienda.png" },
      { type: "image", url: "/projects/data-warehouse/46-tp3-conf-DimTiempo.png" },
      { type: "image", url: "/projects/data-warehouse/47-tp3-conf-DimDisco.png" },
      { type: "image", url: "/projects/data-warehouse/48-tp3-med-calculada-demanda-insatisfecha.png" },
      { type: "image", url: "/projects/data-warehouse/49-tp3-med-calculada-kpi.png" },
      { type: "image", url: "/projects/data-warehouse/50-tp3-configuracion-db-power-bi.png" },
      { type: "image", url: "/projects/data-warehouse/51-tp3-power-bi-tablero-home.png" },
      { type: "image", url: "/projects/data-warehouse/52-tpi-power-bi-tablero-mapa.png" }
    ],
    documents: [
      {
        title: "Consigna General — Escenario Sello Discográfico",
        url: "/projects/data-warehouse/TPSellodiscográfico-ADE2025.pdf"
      },
      {
        title: "TPI Parte 1 — Modelo Relacional y Multidimensional",
        url: "/projects/data-warehouse/ADE - TPI Parte 1 - Modelo de la Discográfica.pdf"
      },
      {
        title: "TPI Parte 2 — Procesos ETL en SSIS",
        url: "/projects/data-warehouse/ADE - TPI Parte 2 - ETL.pdf"
      },
      {
        title: "TPI Parte 3 — Cubo OLAP (SSAS) y Power BI",
        url: "/projects/data-warehouse/ADE - TPI Parte 3 - Cubo OLAP y Power BI.pdf"
      },
      {
        title: "Fuentes de Datos y Mapeo de Atributos",
        url: "/projects/data-warehouse/ADE - TPI - Data Sources - Sheet1.pdf"
      }
    ]
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
      live: "https://playfinder-front.gentlesand-306ace58.brazilsouth.azurecontainerapps.io/",
    },
    media: [
      { type: "image", url: "/projects/play-finder/1-sprint1-planes.png" },
      { type: "image", url: "/projects/play-finder/2-sprint1-tarjeta-de-credito.png" },
      { type: "image", url: "/projects/play-finder/3-sprint1-inicio-sesion.png" },
      { type: "image", url: "/projects/play-finder/4-sprint1-mis-establecimientos.png" },
      { type: "image", url: "/projects/play-finder/5-sprint1-nuevo-establecimiento.png" },
      { type: "image", url: "/projects/play-finder/6-sprint1-primer-modelo-conceptual.png" },
      { type: "image", url: "/projects/play-finder/7-sprint2-mis-establecimientos.png" },
      { type: "image", url: "/projects/play-finder/8-sprint2-editar-establecimiento.png" },
      { type: "image", url: "/projects/play-finder/9-sprint2-canchas-establecimiento.png" },
      { type: "image", url: "/projects/play-finder/10-sprint2-nueva-cancha.png" },
      { type: "image", url: "/projects/play-finder/11-sprint2-disponibilidad-cancha.png" },
      { type: "image", url: "/projects/play-finder/12-sprint2-detalle-cancha.png" },
      { type: "image", url: "/projects/play-finder/13-sprint2-modificar-cancha.png" },
      { type: "image", url: "/projects/play-finder/14-sprint3-registro-jugador.png" },
      { type: "image", url: "/projects/play-finder/15-sprint3-inicio-sesion.png" },
      { type: "image", url: "/projects/play-finder/16-sprint3-perfil-jugador.png" },
      { type: "image", url: "/projects/play-finder/17-sprint3-establecimientos.png" },
      { type: "image", url: "/projects/play-finder/18-sprint3-canchas-establecimeinto.png" },
      { type: "image", url: "/projects/play-finder/19-sprint3-cancha-modificada.png" },
      { type: "image", url: "/projects/play-finder/20-sprint3-mejora-plan.png" },
      { type: "image", url: "/projects/play-finder/21-sprint4-perfil-dueño.png" },
      { type: "image", url: "/projects/play-finder/22-sprint4-disponibilidad-cancha.png" },
      { type: "image", url: "/projects/play-finder/23-sprint5-reservas.png" },
      { type: "image", url: "/projects/play-finder/24-sprint5-detalle-reserva.png" },
      { type: "image", url: "/projects/play-finder/25-sprint5-pago-reserva.png" },
      { type: "image", url: "/projects/play-finder/26-sprint5-informes.png" },
      { type: "image", url: "/projects/play-finder/27-sprint5-mis-reservas.png" },
      { type: "image", url: "/projects/play-finder/28-sprint6-reservas-activas.png" },
      { type: "image", url: "/projects/play-finder/29-sprint7-google.png" },
      { type: "image", url: "/projects/play-finder/30-sprint7-mis-reservas.png" },
      { type: "image", url: "/projects/play-finder/31-sprint7-horarios-disponibles.png" },
      { type: "image", url: "/projects/play-finder/32-sprint7-reservas.png" },
      { type: "image", url: "/projects/play-finder/33-sprint8-recuperar.png" },
      { type: "image", url: "/projects/play-finder/34-sprint8-correo-recuperacion.png" },
      { type: "image", url: "/projects/play-finder/35-sprint8-cambio-contrasena.png" },
      { type: "image", url: "/projects/play-finder/36-sprint8-home-post-cambio.png" },
      { type: "image", url: "/projects/play-finder/37-sprint8-informes-select.png" },
      { type: "image", url: "/projects/play-finder/38-sprint8-horarios-populares.png" },
      { type: "image", url: "/projects/play-finder/39-sprint8-horarios-populares.png" },
      { type: "image", url: "/projects/play-finder/40-sprint8-reservas-por-periodo.png" },
      { type: "image", url: "/projects/play-finder/41-sprint8-detalle-reserva.png" },
      { type: "image", url: "/projects/play-finder/42-sprint8-detalle-reserva.png" },
      { type: "image", url: "/projects/play-finder/43-sprint8-modelo-conceptual-final.png" },
    ],
    documents: [
      {
        title: "Carpeta de Sprints Completa",
        url: "/projects/play-finder/Carpeta Sprints Play Finder.pdf",
      },
      {
        title: "Diccionario de Datos",
        url: "/projects/play-finder/DIccionario de Datos.pdf",
      },
      {
        title: "Glosario de Términos",
        url: "/projects/play-finder/Glosario de Términos.pdf",
      },
    ],
  },
];
