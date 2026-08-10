import React, { useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import { galleryImages } from "@/lib/images";

// TODO-CODEX-ANIMATION: Replace basic lightbox transitions with premium directional image transitions and mobile swipe behavior.
export const GalleryLightbox = ({ index, onClose, onPrev, onNext }) => {
  const { t } = useLanguage();
  const open = index !== null && index >= 0;
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    const id = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      clearTimeout(id);
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [open, handleKey]);

  const img = open ? galleryImages[index] : null;

  return (
    <AnimatePresence>
      {open && img && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col"
          style={{ background: "var(--black)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
          data-testid="gallery-lightbox"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-xs tracking-[0.25em] text-[color:var(--taupe)]" data-testid="lightbox-counter">
              {String(index + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
            </span>
            <button ref={closeRef} onClick={onClose} aria-label={t.gallery.close} data-testid="lightbox-close" className="p-2 text-[color:var(--ivory)]">
              <X size={26} strokeWidth={1} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            <button
              onClick={onPrev}
              aria-label={t.gallery.prev}
              data-testid="lightbox-prev"
              className="absolute left-2 z-[2] p-3 text-[color:var(--ivory)] transition-colors hover:text-[color:var(--champagne)] md:left-8"
            >
              <ChevronLeft size={34} strokeWidth={1} />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={img.id + index}
                src={img.src}
                alt={t.gallery.alt[img.altKey]}
                className="max-h-full max-w-[86vw] object-contain md:max-w-[70vw]"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <button
              onClick={onNext}
              aria-label={t.gallery.next}
              data-testid="lightbox-next"
              className="absolute right-2 z-[2] p-3 text-[color:var(--ivory)] transition-colors hover:text-[color:var(--champagne)] md:right-8"
            >
              <ChevronRight size={34} strokeWidth={1} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
