"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  const t = useTranslations("about");
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const paragraphs = t("bio").split("\n\n");
  const languages = t.raw("languages") as string[];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Number((-relY * 14).toFixed(2)),
      y: Number((relX * 14).toFixed(2)),
    });
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    setFlipped(true);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    setFlipped(false);
    setTilt({ x: 0, y: 0 });
  };

  const barcodeBars = [
    2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2,
  ];

  return (
    <section
      className="pt-24 sm:pt-28 pb-12 sm:pb-14"
      id="about"
      style={{ borderBottom: "1px solid var(--border-color)" }}
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
          <span
            className="inline-flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="w-4 h-[1px] inline-block"
              style={{ background: "var(--accent-blue)" }}
            />
            {t("tag")}
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] mt-2"
            style={{ color: "var(--text-primary)" }}
          >
            {t("title_1")}{" "}
            <span
              className="font-serif-italic font-normal"
              style={{ color: "var(--accent-blue)" }}
            >
              {t("title_italic")}
            </span>
          </h2>
        </motion.div>

        {/* 3-Column Editorial Layout (dataconale.com inspired) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Narrative Bio (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 space-y-5"
          >
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-[15px] sm:text-base leading-[1.72]"
                style={{
                  color: idx === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: idx === 0 ? 500 : 400,
                }}
              >
                {p}
              </p>
            ))}

            {/* Academic & Distinction Highlight Strip */}
            <div
              className="pt-5 mt-6 border-t grid grid-cols-2 gap-4"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div
                className="p-4 rounded-xl border"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <p
                  className="font-mono-tech text-[11px] uppercase tracking-wider mb-1"
                  style={{ color: "var(--accent-blue)" }}
                >
                  UTN · FRRe
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("gpa")}
                </p>
              </div>
              <div
                className="p-4 rounded-xl border"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <p
                  className="font-mono-tech text-[11px] uppercase tracking-wider mb-1"
                  style={{ color: "var(--accent-blue)" }}
                >
                  HONOR 2025
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("flag_bearer")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Premium Developer ID Pass (Hover-to-flip + 3D tilt + pendulum sway like dataconale.com) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="lg:col-span-3 flex flex-col items-center"
          >
            <motion.div
              animate={{
                rotateZ: flipped ? 0 : [-1.1, 1.1, -1.1],
                y: flipped ? -4 : [0, 3, 0],
              }}
              transition={{
                rotateZ: flipped
                  ? { duration: 0.3 }
                  : { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                y: flipped
                  ? { duration: 0.3 }
                  : { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "top center" }}
              className="flex flex-col items-center w-full"
            >
              {/* Lanyard Strap + Metal Clip (dataconale.com exact implementation) */}
              <div className="flex flex-col items-center mb-[-8px] z-20 pointer-events-none">
                <div
                  className="relative w-[32px] h-[96px] overflow-hidden rounded-t-sm shadow-md"
                  style={{
                    background: "#141414",
                    boxShadow:
                      "inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Left and right stitched ribbon edge threads */}
                  <div
                    className="absolute top-0 bottom-0 left-[3px] w-[1px]"
                    style={{
                      background:
                        "repeating-linear-gradient(180deg, rgba(255,255,255,0.22) 0 3px, transparent 3px 6px)",
                    }}
                  />
                  <div
                    className="absolute top-0 bottom-0 right-[3px] w-[1px]"
                    style={{
                      background:
                        "repeating-linear-gradient(180deg, rgba(255,255,255,0.22) 0 3px, transparent 3px 6px)",
                    }}
                  />

                  {/* Vertical infinite looping ticker */}
                  <motion.div
                    className="absolute inset-x-0 top-0 flex flex-col items-center select-none"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{
                      duration: 16,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="font-mono-tech"
                        style={{
                          writingMode: "vertical-rl",
                          font: "600 10.5px/32px var(--font-mono, monospace)",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(255, 255, 255, 0.9)",
                          whiteSpace: "nowrap",
                          padding: "10px 0",
                        }}
                      >
                        Systems Engineer · Sixto Arrejin · 
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Metal clasp hardware */}
                <div className="relative w-[36px] h-[36px] -mt-[2px]">
                  <div
                    className="absolute left-[4px] right-[4px] top-0 h-[14px] rounded-b-[4px] shadow-sm"
                    style={{
                      background:
                        "linear-gradient(90deg, #8d8d8d, #e9e9e9 35%, #bdbdbd 60%, #7a7a7a)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-[11px] w-[16px] h-[22px] -ml-[8px] rounded-[8px] border-[2.5px]"
                    style={{
                      borderColor: "#a4a4a4",
                      borderTopColor: "#d8d8d8",
                      boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </div>

              {/* 3D Interactive Pass Container */}
              <div
                ref={cardRef}
                className="w-full max-w-[272px] h-[395px] cursor-pointer select-none"
                style={{ perspective: "1500px" }}
                onPointerEnter={handlePointerEnter}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onClick={() => setFlipped((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFlipped((prev) => !prev);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Developer ID Pass"
                id="developer-id-card"
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    transition:
                      "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                    transform: `rotateX(${tilt.x}deg) rotateY(${
                      (flipped ? 180 : 0) + tilt.y
                    }deg)`,
                  }}
                >
                  {/* FRONT FACE — Premium White Corporate Credential Pass (dataconale.com style) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[20px] overflow-hidden flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      background: "#FDFCFB",
                      color: "#0D0D0D",
                      border: "1px solid rgba(13, 13, 13, 0.16)",
                      boxShadow:
                        "0 26px 55px -18px rgba(0, 0, 0, 0.32), 0 4px 12px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    {/* Top Black Header Band */}
                    <div
                      className="px-4 pt-3 pb-2.5 flex flex-col items-center"
                      style={{ background: "#0D0D0D", color: "#F4F2EE" }}
                    >
                      {/* Slot Hole */}
                      <div
                        className="w-11 h-2 rounded-full mb-2.5"
                        style={{
                          background: "#262629",
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
                        }}
                      />
                      <div className="w-full flex items-center justify-between text-[10px] font-mono-tech tracking-[0.2em] font-semibold">
                        <span>DEVELOPER ID</span>
                        <span className="opacity-80">SFA</span>
                      </div>
                    </div>

                    {/* Framed Photo + Name */}
                    <div className="px-5 pt-3 flex flex-col items-center text-center">
                      <div
                        className="relative w-[122px] h-[132px] rounded-xl overflow-hidden p-1"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid rgba(13,13,13,0.12)",
                          boxShadow: "0 6px 16px -6px rgba(0,0,0,0.14)",
                        }}
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src="/images/profile.webp"
                            alt="Sixto Feliciano Arrejin"
                            fill
                            className="object-cover object-top"
                            sizes="150px"
                          />
                        </div>
                      </div>

                      <p
                        className="text-[15px] font-bold tracking-[-0.02em] mt-2.5 leading-tight"
                        style={{ color: "#0D0D0D" }}
                      >
                        Sixto Feliciano Arrejin
                      </p>
                      <p
                        className="text-[11px] font-medium mt-0.5"
                        style={{ color: "#52525B" }}
                      >
                        Systems Engineer · Full Stack
                      </p>
                    </div>

                    {/* Structured ID Metadata Table */}
                    <div className="px-5 text-[9.5px] font-mono-tech">
                      <div
                        className="flex items-center justify-between py-1.5 border-t"
                        style={{ borderColor: "rgba(13,13,13,0.09)" }}
                      >
                        <span style={{ color: "#71717A" }}>ID NO.</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#0D0D0D" }}
                        >
                          SFA-2026
                        </span>
                      </div>
                      <div
                        className="flex items-center justify-between py-1.5 border-t"
                        style={{ borderColor: "rgba(13,13,13,0.09)" }}
                      >
                        <span style={{ color: "#71717A" }}>DEPT.</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#0D0D0D" }}
                        >
                          SOFTWARE ENGINEERING
                        </span>
                      </div>
                      <div
                        className="flex items-center justify-between py-1.5 border-t border-b"
                        style={{ borderColor: "rgba(13,13,13,0.09)" }}
                      >
                        <span style={{ color: "#71717A" }}>EXPERIENCE</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#0D0D0D" }}
                        >
                          3+ YEARS
                        </span>
                      </div>
                    </div>

                    {/* Bottom Barcode + Metallic Hologram Seal */}
                    <div className="px-5 pb-3.5 pt-1 flex items-center justify-between">
                      <div>
                        <div className="flex items-end gap-[2px] h-6">
                          {barcodeBars.map((w, i) => (
                            <span
                              key={i}
                              className="inline-block h-full"
                              style={{
                                width: `${w * 1.6}px`,
                                background: "#0D0D0D",
                                opacity: i % 4 === 0 ? 0.75 : 0.95,
                              }}
                            />
                          ))}
                        </div>
                        <p
                          className="text-[7.5px] font-mono-tech tracking-[0.22em] mt-0.5"
                          style={{ color: "#71717A" }}
                        >
                          SFA · UTN · AR
                        </p>
                      </div>

                      {/* Metallic Security Seal */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center border"
                        style={{
                          background:
                            "conic-gradient(from 45deg, #E4E4E7, #A1A1AA, #F4F4F5, #71717A, #E4E4E7)",
                          borderColor: "rgba(13,13,13,0.2)",
                          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8)",
                        }}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full border"
                          style={{
                            borderColor: "rgba(13,13,13,0.3)",
                            background: "rgba(255,255,255,0.45)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE — Dark Executive Dossier Back Pass */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[20px] overflow-hidden flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "#0D0D0D",
                      color: "#F4F2EE",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      boxShadow:
                        "0 26px 55px -18px rgba(0, 0, 0, 0.42), 0 4px 12px rgba(0, 0, 0, 0.14)",
                    }}
                  >
                    <div>
                      {/* Top Slot & Header */}
                      <div
                        className="px-5 pt-3 pb-3 border-b flex flex-col items-center"
                        style={{ borderColor: "rgba(255,255,255,0.12)" }}
                      >
                        <div
                          className="w-11 h-2 rounded-full mb-2.5"
                          style={{ background: "rgba(255,255,255,0.2)" }}
                        />
                        <div className="w-full flex items-center justify-between text-[10px] font-mono-tech tracking-[0.18em]">
                          <span style={{ color: "#60A5FA" }}>
                            {t("id_summary_title").toUpperCase()}
                          </span>
                          <span className="opacity-70">SFA // 01</span>
                        </div>
                      </div>

                      {/* Magnetic Stripe */}
                      <div
                        className="w-full h-6 my-2.5"
                        style={{ background: "#1C1C21" }}
                      />

                      {/* 4 Core Points */}
                      <ol className="px-5 space-y-2.5 mt-2 text-[11.5px] leading-relaxed">
                        {[1, 2, 3, 4].map((n) => (
                          <li key={n} className="flex items-start gap-2.5">
                            <span
                              className="font-mono-tech text-[10px] font-semibold mt-0.5 shrink-0"
                              style={{ color: "#60A5FA" }}
                            >
                              0{n}
                            </span>
                            <span style={{ color: "#D4D4D8" }}>
                              {t(`id_summary_${n}` as "id_summary_1")}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Signature & Verification Footer */}
                    <div
                      className="px-5 py-3.5 border-t flex items-center justify-between"
                      style={{ borderColor: "rgba(255,255,255,0.12)" }}
                    >
                      <span
                        className="font-serif-italic text-lg"
                        style={{ color: "#F4F2EE" }}
                      >
                        Sixto Arrejin
                      </span>
                      <span
                        className="text-[9.5px] font-mono-tech tracking-widest uppercase"
                        style={{ color: "#60A5FA" }}
                      >
                        VERIFIED PASS
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle tap/click helper: only visible on mobile/touch screens */}
              <p
                className="mt-3 text-[11px] font-mono-tech flex items-center gap-1.5 transition-colors select-none md:hidden"
                style={{ color: "var(--text-muted)" }}
              >
                <span>↻</span>
                <span>{flipped ? t("id_tap_back") : t("id_tap_flip")}</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Column 3: Quick Facts & Editorial Pull Quote (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="lg:col-span-4 space-y-5"
          >
            <div
              className="rounded-2xl p-6 border shadow-sm"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <p
                className="font-mono-tech text-xs uppercase tracking-[0.12em] pb-3 mb-4 border-b"
                style={{
                  color: "var(--accent-blue)",
                  borderColor: "var(--border-color)",
                }}
              >
                {t("facts_title")}
              </p>

              <dl className="space-y-4 text-sm">
                <div
                  className="pb-3.5 border-b"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <dt
                    className="font-mono-tech text-[11px] uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("location_label")}
                  </dt>
                  <dd
                    className="font-medium flex items-center justify-between flex-wrap gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span>{t("location")}</span>
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "var(--accent-subtle)",
                        color: "var(--accent-blue)",
                        border: "1px solid var(--accent-border)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--accent-blue)" }}
                      />
                      Remoto
                    </span>
                  </dd>
                </div>

                <div
                  className="pb-3.5 border-b"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <dt
                    className="font-mono-tech text-[11px] uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("education_label")}
                  </dt>
                  <dd className="space-y-2">
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t("degree_engineer")}
                      </p>
                      <p
                        className="text-xs font-mono-tech"
                        style={{ color: "var(--text-muted)" }}
                      >
                        UTN-FRRe · {t("degree_engineer_date")}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-medium text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {t("degree_analyst")}
                      </p>
                      <p
                        className="text-xs font-mono-tech"
                        style={{ color: "var(--text-muted)" }}
                      >
                        UTN-FRRe · {t("degree_analyst_date")}
                      </p>
                    </div>
                  </dd>
                </div>

                <div>
                  <dt
                    className="font-mono-tech text-[11px] uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("languages_label")}
                  </dt>
                  <dd className="space-y-1">
                    {languages.map((lang, i) => (
                      <p
                        key={i}
                        className="text-xs sm:text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {lang}
                      </p>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Editorial Pull-Quote */}
            <blockquote
              className="p-6 rounded-2xl border border-l-4 font-serif-italic text-lg sm:text-xl leading-relaxed"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
                borderLeftColor: "var(--accent-blue)",
                color: "var(--text-primary)",
              }}
            >
              {t("quote")}
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
