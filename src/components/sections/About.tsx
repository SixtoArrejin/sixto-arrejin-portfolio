"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Languages } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function About() {
  const t = useTranslations("about");

  return (
    <section className="py-24" id="about">
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

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Bio — spans 2 columns */}
          <motion.div
            variants={fadeInUp}
            custom={1}
            className="glass-card p-6 md:col-span-2"
          >
            <p
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("bio")}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div variants={fadeInUp} custom={2} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} style={{ color: "var(--accent-blue)" }} />
              <span
                className="text-xs uppercase tracking-wider font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                {t("location_label")}
              </span>
            </div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>
              {t("location")}
            </p>
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" 
              style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", color: "#22c55e" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
              {t("remote")}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div variants={fadeInUp} custom={3} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Languages size={16} style={{ color: "var(--accent-violet)" }} />
              <span
                className="text-xs uppercase tracking-wider font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                {t("languages_label")}
              </span>
            </div>
            <ul className="space-y-2.5">
              {(t.raw("languages") as string[]).map((lang, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span className="w-1.5 h-1.5 rounded-sm rotate-45 flex-shrink-0" style={{ background: "var(--accent-violet)" }} />
                  {lang}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Education — spans 2 columns */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="glass-card p-6 md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={16} style={{ color: "var(--accent-blue)" }} />
              <span
                className="text-xs uppercase tracking-wider font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                {t("education_label")}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {t("degree_engineer")}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("university")} · {t("degree_engineer_date")}
                </p>
                <ul className="text-xs font-medium mt-2 space-y-1.5" style={{ color: "var(--accent-blue)" }}>
                  <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-current"></span>{t("gpa")}</li>
                  <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-current"></span>{t("flag_bearer")}</li>
                </ul>
              </div>
              <div
                className="pt-3"
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {t("degree_analyst")}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("university")} · {t("degree_analyst_date")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
