"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Trophy, Award, Flag } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Awards() {
  const t = useTranslations("awards");

  const awards = [
    {
      icon: Trophy,
      title: t("rally_title"),
      description: t("rally_description"),
      accent: "var(--accent-blue)",
    },
    {
      icon: Award,
      title: t("scrum_title"),
      description: t("scrum_description"),
      accent: "var(--accent-violet)",
    },
    {
      icon: Flag,
      title: t("flag_title"),
      description: t("flag_description"),
      accent: "var(--accent-blue)",
    },
  ];

  return (
    <section className="py-24" id="awards" style={{ background: "var(--bg-secondary)" }}>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              custom={idx + 1}
              whileHover={{ y: -3 }}
              className="glass-card p-6 text-center"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `${award.accent}15`,
                  border: `1px solid ${award.accent}30`,
                }}
              >
                <award.icon size={22} style={{ color: award.accent }} />
              </div>
              <h3
                className="text-sm font-bold mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sora)",
                }}
              >
                {award.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {award.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
