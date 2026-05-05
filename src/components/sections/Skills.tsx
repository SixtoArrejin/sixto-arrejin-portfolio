"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { iconMap } from "@/utils/iconMap";

const skillCategories = [
  {
    key: "languages" as const,
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
  },
  {
    key: "frontend" as const,
    items: [
      "React.js",
      "Next.js",
      "React Native",
      "HTML5",
      "CSS3",
      "ChakraUI",
      "Tailwind CSS",
      "TanStack Query",
    ],
  },
  {
    key: "backend" as const,
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Prisma ORM",
      "Supabase",
      "Redis",
      "JWT/OAuth",
    ],
  },
  {
    key: "devops" as const,
    items: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "GitHub Actions",
      "Azure",
      "Cloudflare Workers",
      "Render",
    ],
  },
  {
    key: "data" as const,
    items: ["Power BI", "SQL Server", "SSIS/SSAS", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    key: "tools" as const,
    items: [
      "Git",
      "GitHub",
      "Scrum",
      "Jira",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section className="py-24" id="skills">
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
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.key}
              variants={fadeInUp}
              custom={idx + 1}
              className="glass-card p-5"
            >
              <h3
                className="text-xs uppercase tracking-wider font-semibold mb-4"
                style={{ color: "var(--accent-blue)" }}
              >
                {t(category.key)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => {
                  const IconConfig = iconMap[item];
                  return (
                    <span key={item} className="tech-badge">
                      {IconConfig && <IconConfig.icon size={14} style={{ color: IconConfig.color }} />}
                      {item}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
