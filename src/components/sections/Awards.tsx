"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Trophy, Award, Flag, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

type AwardItem = {
  num: string;
  icon: typeof Trophy;
  badge: string;
  title: string;
  description: string;
  link?: string;
  internal?: boolean;
};

export function Awards() {
  const t = useTranslations("awards");

  const featuredAwards: AwardItem[] = [
    {
      num: "01",
      icon: Trophy,
      badge: t("stellar_badge"),
      title: t("stellar_title"),
      description: t("stellar_description"),
      link: "/projects/dosel",
      internal: true,
    },
    {
      num: "02",
      icon: Sparkles,
      badge: t("rally_2026_badge"),
      title: t("rally_2026_title"),
      description: t("rally_2026_description"),
    },
  ];

  const standardAwards: AwardItem[] = [
    {
      num: "03",
      icon: Trophy,
      badge: t("rally_badge"),
      title: t("rally_title"),
      description: t("rally_description"),
      link: "/projects/elepad",
      internal: true,
    },
    {
      num: "04",
      icon: Flag,
      badge: t("flag_badge"),
      title: t("flag_title"),
      description: t("flag_description"),
    },
    {
      num: "05",
      icon: CheckCircle2,
      badge: t("scrum_badge"),
      title: t("scrum_title"),
      description: t("scrum_description"),
      link: "https://www.scrumstudy.com/certification/verify?type=SFC&number=1040148",
      internal: false,
    },
  ];

  return (
    <section
      className="pt-24 sm:pt-28 pb-12 sm:pb-14"
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

        {/* Featured 2026 Headline Awards (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featuredAwards.map((award, idx) => (
            <motion.div
              key={award.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="editorial-card rounded-2xl border shadow-sm p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent-blue)] relative overflow-hidden group"
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
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{
                      background: "var(--accent-subtle)",
                      border: "1px solid var(--accent-border)",
                    }}
                  >
                    <award.icon
                      size={18}
                      style={{ color: "var(--accent-blue)" }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {award.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm sm:text-[15px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {award.description}
                </p>
              </div>

              {award.link && (
                <div
                  className="pt-5 mt-5 border-t flex items-center justify-end"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {award.internal ? (
                    <Link
                      href={award.link}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-medium transition-colors hover:opacity-80"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      <span>{t("view_link")}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  ) : (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-medium transition-colors hover:opacity-80"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      <span>{t("view_link")}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Foundational Distinctions & Certifications (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standardAwards.map((award, idx) => (
            <motion.div
              key={award.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 2) * 0.08, duration: 0.55 }}
              className="editorial-card rounded-2xl border shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent-blue)] group"
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
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
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

              {award.link && (
                <div
                  className="pt-4 mt-4 border-t flex items-center justify-end"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {award.internal ? (
                    <Link
                      href={award.link}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-medium transition-colors hover:opacity-80"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      <span>{t("view_link")}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  ) : (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-medium transition-colors hover:opacity-80"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      <span>{t("view_link")}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
