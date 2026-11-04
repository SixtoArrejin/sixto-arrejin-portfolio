"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

type Media = {
  type: "image" | "video";
  url: string;
};

interface ProjectGalleryProps {
  media: Media[];
  onOpenLightbox: (idx: number) => void;
  isDesktop?: boolean;
  projectTitle?: string;
}

export function ProjectGallery({
  media,
  onOpenLightbox,
  isDesktop,
  projectTitle,
}: ProjectGalleryProps) {
  const t = useTranslations("projects");
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="editorial-card rounded-2xl border shadow-sm overflow-hidden"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Top Dossier Bar */}
      <div
        className="px-5 py-3.5 border-b flex items-center justify-between flex-wrap gap-2 font-mono-tech text-xs"
        style={{ borderColor: "var(--border-color)" }}
      >
        <span
          className="font-semibold uppercase tracking-wider"
          style={{ color: "var(--accent-blue)" }}
        >
          [{t("gallery_tag")}{projectTitle ? ` // ${projectTitle}` : ""}]
        </span>
        <span style={{ color: "var(--text-muted)" }}>
          {activeIndex + 1} / {media.length}
        </span>
      </div>

      {/* Main Stage Viewer */}
      <div
        className="relative w-full aspect-[16/9] max-h-[540px] flex items-center justify-center overflow-hidden group cursor-pointer"
        style={{ background: "var(--bg-secondary)" }}
        onClick={() => onOpenLightbox(activeIndex)}
      >
        {media[activeIndex].type === "image" ? (
          <Image
            src={media[activeIndex].url}
            alt={`Capture ${activeIndex + 1}`}
            fill
            className={`${
              isDesktop ? "object-cover object-top" : "object-contain p-3"
            } transition-transform duration-500 group-hover:scale-[1.01]`}
            sizes="(max-width: 1024px) 100vw, 1100px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-mono-tech">
            Video
          </div>
        )}

        {/* Expand Button Pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(activeIndex);
          }}
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono-tech font-medium transition-transform duration-200 hover:scale-105 cursor-pointer"
          style={{
            background: "var(--bg-inverted)",
            color: "var(--text-inverted)",
          }}
        >
          <Maximize2 size={13} />
          <span>{t("expand_image")}</span>
        </button>

        {/* Prev / Next Controls */}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer z-10"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color-hover)",
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer z-10"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color-hover)",
              }}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Horizontal Thumbnail Filmstrip */}
      {media.length > 1 && (
        <div
          className="p-4 border-t overflow-x-auto"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex gap-2.5 min-w-max">
            {media.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveIndex(idx)}
                  className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all"
                  style={{
                    border: isSelected
                      ? "2px solid var(--accent-blue)"
                      : "1px solid var(--border-color)",
                    opacity: isSelected ? 1 : 0.55,
                  }}
                >
                  <Image
                    src={item.url}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="96px"
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
