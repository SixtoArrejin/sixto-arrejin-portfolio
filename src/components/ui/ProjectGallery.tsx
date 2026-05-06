"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

type Media = {
  type: "image" | "video";
  url: string;
};

interface ProjectGalleryProps {
  media: Media[];
  onOpenLightbox: (idx: number) => void;
  isDesktop?: boolean;
}

export function ProjectGallery({ media, onOpenLightbox, isDesktop }: ProjectGalleryProps) {
  // Mostramos 5 elementos inicialmente (aproximadamente una fila en escritorio).
  // Si en el futuro querés que sean múltiplos de la cantidad de columnas, podés usar un custom hook para leer el ancho de ventana, pero 5 es un estándar seguro.
  const CHUNK_SIZE = isDesktop ? 3 : 5;
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  if (!media || media.length === 0) return null;

  const visibleMedia = media.slice(0, visibleCount);
  const remainingCount = media.length - visibleCount;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE * 3, media.length));
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-sora)" }}>
        Galería del Proyecto
      </h3>
      
      {/* Grid of Thumbnails */}
      <div className={`grid gap-4 ${isDesktop ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'}`}>
        {visibleMedia.map((item, idx) => {
          // Si es el último elemento visible y todavía hay más por mostrar, le ponemos el overlay
          const isLastVisible = idx === visibleMedia.length - 1;
          const showOverlay = isLastVisible && remainingCount > 0;

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (showOverlay ? handleShowMore() : onOpenLightbox(idx))}
              className={`relative ${isDesktop ? 'aspect-video' : 'aspect-square'} rounded-xl overflow-hidden cursor-pointer group glass-card`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={`Media ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
              ) : (
                <div className="w-full h-full bg-black/10 flex items-center justify-center">
                  <span className="text-xs">Video</span>
                </div>
              )}

              {/* Overlay estándar (hover) */}
              {!showOverlay && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
              )}

              {/* Overlay de "+X elementos" */}
              {showOverlay && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center transition-colors hover:bg-black/70">
                  <span className="text-white text-2xl font-bold">+{remainingCount}</span>
                  <span className="text-white/80 text-xs mt-1">Ver más</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
