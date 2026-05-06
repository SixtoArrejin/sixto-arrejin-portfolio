"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type Media = {
  type: "image" | "video";
  url: string;
};

interface ProjectHeaderCarouselProps {
  media: Media[];
  onOpenLightbox: (idx: number) => void;
}

export function ProjectHeaderCarousel({ media, onOpenLightbox }: ProjectHeaderCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play opcional (opcional: podés quitar el useEffect si no querés que se mueva solo)
  useEffect(() => {
    if (media.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [media.length]);

  if (!media || media.length === 0) return null;

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="relative w-full max-w-[230px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden glass-card group cursor-pointer shadow-2xl"
      onClick={() => onOpenLightbox(currentIndex)}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {media[currentIndex].type === "image" ? (
            <Image
              src={media[currentIndex].url}
              alt={`Media ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-black/10 flex items-center justify-center">
              Video Player
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay al hacer hover para indicar que se puede ampliar */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
          <Maximize2 className="text-white" size={24} />
        </div>
      </div>

      {media.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicadores (Dots) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {media.slice(0, 10).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
            {media.length > 10 && (
              <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            )}
          </div>
        </>
      )}
    </div>
  );
}
