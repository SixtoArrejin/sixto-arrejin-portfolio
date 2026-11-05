"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

type TimelineItem = {
  year: string;
  period: string;
  type: string;
  role: string;
  company: string;
  statusPill?: string;
  bullets: string[];
  projectSlug?: string;
  externalUrl?: string;
};

export function Experience() {
  const t = useTranslations("experience");
  const items = (t.raw("items") as TimelineItem[]) || [];

  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineBounds, setLineBounds] = useState<{ top: number; height: number } | null>(null);
  const [dotThresholds, setDotThresholds] = useState<number[]>([]);
  const [reachedDots, setReachedDots] = useState<boolean[]>([]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 55%", "end 55%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateLineBounds = () => {
      const firstDot = dotRefs.current[0];
      const lastDot = lastDotRef.current;
      if (timelineRef.current && firstDot && lastDot) {
        const containerRect = timelineRef.current.getBoundingClientRect();
        const firstRect = firstDot.getBoundingClientRect();
        const lastRect = lastDot.getBoundingClientRect();

        const top = firstRect.top + firstRect.height / 2 - containerRect.top;
        const bottom = lastRect.top + lastRect.height / 2 - containerRect.top;
        const height = Math.max(0, bottom - top);

        setLineBounds({ top, height });

        if (height > 0) {
          const thresholds = dotRefs.current.map((dotEl) => {
            if (!dotEl) return 0;
            const r = dotEl.getBoundingClientRect();
            const dotY = r.top + r.height / 2 - containerRect.top;
            // The drawn line touches the top edge of the 12px dot (dotY - 6px)
            const triggerY = dotY - 6;
            return Math.max(0, Math.min(1, (triggerY - top) / height));
          });
          setDotThresholds(thresholds);
          const currentP = smoothProgress.get();
          setReachedDots(thresholds.map((th) => currentP >= th));
        }
      }
    };

    updateLineBounds();
    window.addEventListener("resize", updateLineBounds);
    const timer = setTimeout(updateLineBounds, 120);
    return () => {
      window.removeEventListener("resize", updateLineBounds);
      clearTimeout(timer);
    };
  }, [items.length]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!dotThresholds.length) return;
    setReachedDots((prev) => {
      const next = dotThresholds.map((th) => latest >= th);
      if (prev.length === next.length && prev.every((v, i) => v === next[i])) {
        return prev;
      }
      return next;
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - triggerY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  return (
    <section
      className="pt-24 sm:pt-28 pb-12 sm:pb-16"
      id="experience"
      style={{
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header (dataconale style) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono-tech text-[11px] uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                03
              </span>
              <span
                className="w-6 h-[1px] inline-block"
                style={{ background: "var(--border-color-hover)" }}
              />
              <span
                className="font-mono-tech text-[11px] uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                {t("tag").replace(/^0[1-6]\s*—\s*/, "")}
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-[-0.04em] leading-[1.02]"
              style={{ color: "var(--text-primary)" }}
            >
              {t("title")}{" "}
              <span
                className="font-serif-italic font-normal"
                style={{ color: "var(--text-muted)" }}
              >
                {t("title_italic")}
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-sm sm:text-[15px] max-w-xs leading-relaxed lg:mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Scroll-Drawn Spine Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl">
          {/* Background Spine Track */}
          <div
            className="absolute w-[2px] -translate-x-1/2 left-[16px] sm:left-[148px]"
            style={{
              top: lineBounds ? `${lineBounds.top}px` : "16px",
              height: lineBounds ? `${lineBounds.height}px` : "calc(100% - 60px)",
              background: "var(--border-color)",
            }}
          />

          {/* Foreground Drawn Spine */}
          <motion.div
            className="absolute w-[2px] -translate-x-1/2 left-[16px] sm:left-[148px] origin-top"
            style={{
              top: lineBounds ? `${lineBounds.top}px` : "16px",
              height: lineBounds ? `${lineBounds.height}px` : "calc(100% - 60px)",
              background: "var(--text-primary)",
              scaleY: smoothProgress,
            }}
          />

          <div className="space-y-16 sm:space-y-20">
            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              const isReached =
                reachedDots[idx] ??
                (dotThresholds[idx] !== undefined
                  ? smoothProgress.get() >= dotThresholds[idx]
                  : idx === 0);

              return (
                <div
                  key={`${item.year}-${idx}`}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className="relative grid grid-cols-1 sm:grid-cols-[148px_1fr] gap-4 sm:gap-10 items-start pl-10 sm:pl-0 transition-opacity duration-300"
                >
                  {/* Left Column: Year & Date Range */}
                  <div className="sm:pr-7 sm:text-right pt-0.5">
                    <div
                      className="text-2xl sm:text-[26px] font-bold tracking-[-0.03em] leading-none transition-colors duration-300"
                      style={{
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-muted)",
                      }}
                    >
                      {item.year}
                    </div>
                    <div
                      className="font-mono-tech text-[11px] mt-1.5 tracking-tight"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.period}
                    </div>
                  </div>

                  {/* Spine Node Circle */}
                  <div
                    ref={(el) => {
                      dotRefs.current[idx] = el;
                    }}
                    className="absolute left-[16px] sm:left-[148px] top-2.5 -translate-x-1/2 z-10 flex items-center justify-center w-3 h-3"
                    aria-hidden="true"
                  >
                    <span
                      className="w-3 h-3 rounded-full transition-all duration-300 block"
                      style={{
                        background: isReached
                          ? "var(--text-primary)"
                          : "var(--bg-primary)",
                        border: isReached
                          ? "2px solid var(--text-primary)"
                          : "1.5px solid var(--border-color-hover)",
                        boxShadow: isActive
                          ? "0 0 0 4px var(--bg-primary)"
                          : "0 0 0 3px var(--bg-primary)",
                      }}
                    />
                  </div>

                  {/* Right Column: Badge, Role, Company, Status Pill, Bullets */}
                  <div className="pt-0.5">
                    {/* Category Badge (EDUCATION / EXPERIENCE) */}
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono-tech text-[10px] tracking-[0.12em] uppercase border mb-2.5"
                      style={{
                        color: "var(--text-secondary)",
                        borderColor: "var(--border-color-hover)",
                        background: "transparent",
                      }}
                    >
                      {item.type}
                    </span>

                    {/* Role Title */}
                    <h3
                      className="text-2xl sm:text-[28px] font-bold tracking-[-0.03em] leading-tight transition-colors duration-300"
                      style={{
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {item.role}
                    </h3>

                    {/* Company / Institution */}
                    <p
                      className="text-sm sm:text-[15px] mt-1 mb-3.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.company}
                    </p>

                    {/* Optional High-Contrast Status Pill (like dataconale's black status bar) */}
                    {item.statusPill && (
                      <div className="mb-4">
                        <span
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono-tech text-[10.5px] font-medium uppercase tracking-[0.1em]"
                          style={{
                            background: "var(--bg-inverted)",
                            color: "var(--text-inverted)",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {item.statusPill}
                        </span>
                      </div>
                    )}

                    {/* Dash Bullet List */}
                    <ul className="space-y-2.5 mt-3">
                      {item.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-sm sm:text-[14.5px] leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span
                            className="font-mono-tech select-none mt-[1px]"
                            style={{ color: "var(--text-muted)" }}
                          >
                            —
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Subtle Case Study / Live links */}
                    {(item.projectSlug || item.externalUrl) && (
                      <div className="flex flex-wrap items-center gap-4 mt-4 pt-1">
                        {item.projectSlug && (
                          <Link
                            href={`/projects/${item.projectSlug}`}
                            className="inline-flex items-center gap-1 text-xs font-mono-tech underline underline-offset-4 transition-opacity hover:opacity-75"
                            style={{ color: "var(--text-primary)" }}
                          >
                            <span>{t("case_study_cta")}</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        )}
                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono-tech underline underline-offset-4 transition-opacity hover:opacity-75"
                            style={{ color: "var(--text-muted)" }}
                          >
                            <span>{t("live_site_cta")}</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Final "Next — Your team?" Node (dataconale style) */}
            <div
              ref={(el) => {
                itemRefs.current[items.length] = el;
              }}
              className="relative grid grid-cols-1 sm:grid-cols-[148px_1fr] gap-4 sm:gap-10 items-center pl-10 sm:pl-0 pt-2"
            >
              {/* Left Column: Next */}
              <div className="sm:pr-7 sm:text-right">
                <div
                  className="text-xl sm:text-2xl font-bold tracking-[-0.03em]"
                  style={{
                    color:
                      activeIndex === items.length
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                  }}
                >
                  {t("next_year")}
                </div>
              </div>

              {/* Spine Hollow Node */}
              <div
                ref={lastDotRef}
                className="absolute left-[16px] sm:left-[148px] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-3 h-3"
                aria-hidden="true"
              >
                <span
                  className="w-3 h-3 rounded-full transition-all duration-300 block"
                  style={{
                    background: "var(--bg-primary)",
                    border: "1.5px solid var(--border-color-hover)",
                    boxShadow: "0 0 0 4px var(--bg-primary)",
                  }}
                />
              </div>

              {/* Dashed Callout Card */}
              <div
                className="rounded-2xl border border-dashed px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                style={{
                  borderColor: "var(--border-color-hover)",
                  background: "transparent",
                }}
              >
                <div>
                  <span
                    className="block font-mono-tech text-[10.5px] uppercase tracking-[0.14em] mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("next_badge")}
                  </span>
                  <div
                    className="text-2xl sm:text-3xl font-bold tracking-[-0.03em]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t("next_title_1")}{" "}
                    <span
                      className="font-serif-italic font-normal"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t("next_title_italic")}
                    </span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-transform hover:-translate-y-0.5 shrink-0"
                  style={{
                    background: "var(--bg-inverted)",
                    color: "var(--text-inverted)",
                  }}
                >
                  <span>{t("next_cta")}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
