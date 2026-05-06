"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Media = {
  type: "image" | "video";
  url: string;
};

interface ProjectLightboxProps {
  media: Media[];
  selectedIndex: number | null;
  setSelectedIndex: (idx: number | null) => void;
}

export function ProjectLightbox({ media, selectedIndex, setSelectedIndex }: ProjectLightboxProps) {
  if (!media || media.length === 0) return null;

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex(selectedIndex === null ? null : selectedIndex === 0 ? media.length - 1 : selectedIndex - 1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex(selectedIndex === null ? null : selectedIndex === media.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <X size={24} />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <ChevronRight size={32} />
          </button>

          {/* Main Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {media[selectedIndex].type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={media[selectedIndex].url}
                  alt={`Media ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                Video player coming soon...
              </div>
            )}
          </motion.div>

          {/* Pagination indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium backdrop-blur-md">
            {selectedIndex + 1} / {media.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
