"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, ChevronDown } from "lucide-react";

const CV_CACHE_VERSION = "20261104-v3";

export function Hero() {
  const t = useTranslations("hero");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-between pt-20 sm:pt-24 pb-8 overflow-hidden"
      id="hero"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      {/* Subtle Giant Ghost Wordmark in Background (dataconale.com inspired, fully readable) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 bottom-20 sm:bottom-24 flex justify-center lg:justify-start max-w-6xl mx-auto px-6 overflow-visible z-0"
      >
        <span
          className="font-bold tracking-[-0.055em] leading-[1.02] whitespace-nowrap py-3"
          style={{
            fontSize: "clamp(6rem, 15.5vw, 15.5rem)",
            color: "var(--text-primary)",
            opacity: 0.045,
          }}
        >
          ARREJIN
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 max-w-6xl w-full mx-auto px-6 pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 xl:col-span-8"
          >
            {/* Kicker Tag */}
            <div className="mb-6">
              <span
                className="inline-flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="w-4 h-[1px] inline-block"
                  style={{ background: "var(--accent-blue)" }}
                />
                {t("greeting")}
              </span>
            </div>

            {/* Editorial Headline with Serif Italic Accent */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.55rem] font-semibold tracking-[-0.035em] leading-[1.05] mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              {t("headline_1")}{" "}
              <span
                className="font-serif-italic font-normal px-1"
                style={{ color: "var(--accent-blue)" }}
              >
                {t("headline_italic")}
              </span>{" "}
              {t("headline_2")}
            </h1>

            {/* Subtitle Role */}
            <p
              className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.12em] mb-4"
              style={{ color: "var(--accent-blue)" }}
            >
              {t("title")}
            </p>

            {/* Human-Friendly Description */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mb-9"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("description")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                id="cta-projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "var(--bg-inverted)",
                  color: "var(--text-inverted)",
                  border: "1px solid var(--bg-inverted)",
                }}
              >
                <span>{t("cta_projects")}</span>
                <ArrowDown size={15} className="shrink-0" />
              </a>

              {/* CV Dropdown */}
              <div className="relative z-40" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  style={{
                    background: "transparent",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-color-hover)",
                  }}
                  id="cta-resume"
                >
                  <Download size={15} className="shrink-0" />
                  <span>{t("cta_resume")}</span>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 min-w-[175px] rounded-xl overflow-hidden z-50 flex flex-col border shadow-xl"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--border-color-hover)",
                    }}
                  >
                    <a
                      href={`/cv/Sixto_Feliciano_Arrejin_CV_FullStack.pdf?v=${CV_CACHE_VERSION}`}
                      download="Sixto_Feliciano_Arrejin_CV_FullStack.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-xs font-mono-tech font-medium transition-colors flex items-center justify-between hover:bg-[var(--bg-secondary)]"
                      style={{ color: "var(--text-primary)" }}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span>CV Español</span>
                      <ArrowUpRight size={13} style={{ color: "var(--accent-blue)" }} />
                    </a>
                    <div style={{ height: "1px", background: "var(--border-color)" }} />
                    <a
                      href={`/cv/Sixto_Feliciano_Arrejin_Resume_FullStack.pdf?v=${CV_CACHE_VERSION}`}
                      download="Sixto_Feliciano_Arrejin_Resume_FullStack.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-xs font-mono-tech font-medium transition-colors flex items-center justify-between hover:bg-[var(--bg-secondary)]"
                      style={{ color: "var(--text-primary)" }}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span>Resume English</span>
                      <ArrowUpRight size={13} style={{ color: "var(--accent-blue)" }} />
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Editorial Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end"
          >
            <div
              className="w-full max-w-[330px] rounded-2xl p-4 border shadow-sm"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              {/* Top Meta Strip */}
              <div
                className="flex items-center justify-between pb-2.5 mb-3 border-b font-mono-tech text-[11px]"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-muted)",
                }}
              >
                <span>PORTRAIT // SFA</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                />
              </div>

              {/* Portrait Image */}
              <div
                className="relative aspect-[4/4.6] w-full rounded-xl overflow-hidden border"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <Image
                  src="/images/profile.webp"
                  alt="Sixto Feliciano Arrejin"
                  fill
                  className="object-cover object-top scale-105 transition-transform duration-500 hover:scale-110"
                  priority
                  sizes="(max-width: 640px) 300px, 340px"
                />
              </div>

              {/* Bottom Caption Strip */}
              <div className="pt-3.5 flex items-center justify-between">
                <div>
                  <p
                    className="text-xs font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Sixto F. Arrejin
                  </p>
                  <p
                    className="text-[11px] font-mono-tech mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("subtitle")}
                  </p>
                </div>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                  title="Active"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Editorial Metrics & Scroll Strip */}
      <div
        className="relative z-10 max-w-6xl w-full mx-auto px-6 pt-8 mt-6 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
          <div>
            <p
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              8.55
              <span
                className="text-sm font-mono-tech font-normal"
                style={{ color: "var(--text-muted)" }}
              >
                /10
              </span>
            </p>
            <p
              className="text-xs font-mono-tech mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {t("stat_gpa_label")}
            </p>
          </div>

          <div>
            <p
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              9+
            </p>
            <p
              className="text-xs font-mono-tech mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {t("stat_projects_label")}
            </p>
          </div>

          <div>
            <p
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: "var(--accent-blue)" }}
            >
              3° Puesto
            </p>
            <p
              className="text-xs font-mono-tech mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {t("stat_award_label")}
            </p>
          </div>

          <div className="hidden sm:flex justify-end">
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <span>{t("scroll_hint")}</span>
              <ArrowDown size={14} style={{ color: "var(--accent-blue)" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
