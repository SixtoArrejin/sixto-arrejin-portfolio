"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Trophy, Award, Flag } from "lucide-react";

export function Awards() {
  const t = useTranslations("awards");

  const awards = [
    {
      num: "01",
      icon: Trophy,
      badge: t("rally_badge"),
      title: t("rally_title"),
      description: t("rally_description"),
    },
    {
      num: "02",
      icon: Flag,
      badge: t("flag_badge"),
      title: t("flag_title"),
      description: t("flag_description"),
    },
    {
      num: "03",
      icon: Award,
      badge: t("scrum_badge"),
      title: t("scrum_title"),
      description: t("scrum_description"),
    },
  ];

  return (
    <section
      className="py-24 sm:py-28"
      id="awards"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="section-tag mb-4">{t("tag")}</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] mt-3"
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

        {/* Editorial 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, idx) => (
            <motion.div
              key={award.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="editorial-card rounded-2xl border shadow-sm p-6 flex flex-col justify-between"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <div>
                {/* Top Strip */}
                <div
                  className="flex items-center justify-between pb-4 mb-5 border-b"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <span
                    className="font-mono-tech text-xs font-semibold"
                    style={{ color: "var(--accent-blue)" }}
                  >
                    [{award.num}] // {award.badge}
                  </span>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--accent-subtle)",
                      border: "1px solid var(--accent-border)",
                    }}
                  >
                    <award.icon
                      size={16}
                      style={{ color: "var(--accent-blue)" }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold tracking-tight mb-3 leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {award.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
