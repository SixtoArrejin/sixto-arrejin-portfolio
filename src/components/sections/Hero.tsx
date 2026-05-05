"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Download } from "lucide-react";
import { SiReact, SiNodedotjs, SiTypescript } from "react-icons/si";
import { FaCloud } from "react-icons/fa";

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
      className="relative min-h-screen flex items-center justify-center aurora-bg noise-overlay"
      id="hero"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--accent-blue)", fontFamily: "var(--font-sora)" }}
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            <span className="gradient-text">{t("name")}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-sora)" }}
          >
            {t("title")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 mb-6 text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            <div className="flex items-center gap-1.5">
              <SiReact size={16} color="#61DAFB" /> React
            </div>
            <span className="opacity-30">·</span>
            <div className="flex items-center gap-1.5">
              <SiNodedotjs size={16} color="#339933" /> Node.js
            </div>
            <span className="opacity-30">·</span>
            <div className="flex items-center gap-1.5">
              <SiTypescript size={15} color="#3178C6" /> TypeScript
            </div>
            <span className="opacity-30">·</span>
            <div className="flex items-center gap-1.5">
              <FaCloud size={16} color="#0078D4" /> Cloud & DevOps
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-base max-w-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "var(--accent-gradient)" }}
              id="cta-projects"
            >
              {t("cta_projects")}
              <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
              id="cta-contact"
            >
              <Mail size={16} />
              {t("cta_contact")}
            </a>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
                id="cta-resume"
              >
                <Download size={16} />
                {t("cta_resume")}
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 lg:left-1/2 lg:-translate-x-1/2 mt-2 w-full min-w-[120px] rounded-xl overflow-hidden shadow-lg z-50 flex flex-col backdrop-blur-md"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <a
                    href="/cv/Sixto_Feliciano_Arrejin_CV_FullStack_ES.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--border-color)]"
                    style={{ color: "var(--text-primary)" }}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Español
                  </a>
                  <div style={{ height: "1px", background: "var(--border-color)" }} />
                  <a
                    href="/cv/Sixto_Feliciano_Arrejin_CV_FullStack_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--border-color)]"
                    style={{ color: "var(--text-primary)" }}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    English
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden glow-ring">
            <Image
              src="/images/profile.jpg"
              alt="Sixto Feliciano Arrejin"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
            />
          </div>
          {/* Decorative ring */}
          <div
            className="absolute -inset-4 rounded-full opacity-20 animate-spin"
            style={{
              border: "1px dashed var(--accent-blue)",
              animationDuration: "30s",
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
