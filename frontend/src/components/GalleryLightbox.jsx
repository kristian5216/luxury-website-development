import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import { galleryImages } from "@/lib/images";
import { useFocusTrap } from "@/lib/useFocusTrap";

const SWIPE_THRESHOLD = 50;

// Directional slide: forward navigation exits left / enters from the right, reverse mirrors it.
const imageVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 28 : -28 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -28 : 28 }),
};

export const GalleryLightbox = ({ index, onClose, onPrev, onNext }) => {
  const { t } = useLanguage();
  const open = index !== null && index >= 0;
  const closeRef = useRef(null);
  const lastFocused = useRef(null);
  const containerRef = useRef(null);
  const touchStart = useRef(null);
  const [direction, setDirection] = useState(1);

  const goPrev = useCallback(() => {
    setDirection(-1);
    onPrev();
  }, [onPrev]);

  const goNext = useCallback(() => {
    setDirection(1);
    onNext();
  }, [onNext]);

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext]
  );

  useFocusTrap(containerRef, open);

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

  const onTouchStart = (e) => {
    const t0 = e.touches[0];
    touchStart.current = { x: t0.clientX, y: t0.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t0 = e.changedTouches[0];
    const dx = t0.clientX - touchStart.current.x;
    const dy = t0.clientY - touchStart.current.y;
    touchStart.current = null;
    // Ignore mostly-vertical gestures so page/body scroll behavior stays untouched.
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const img = open ? galleryImages[index] : null;

  return (
    <AnimatePresence>
      {open && img && (
        <motion.div
          ref={containerRef}
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

          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={goPrev}
              aria-label={t.gallery.prev}
              data-testid="lightbox-prev"
              className="absolute left-2 z-[2] p-3 text-[color:var(--ivory)] transition-colors hover:text-[color:var(--champagne)] md:left-8"
            >
              <ChevronLeft size={34} strokeWidth={1} />
            </button>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={img.id + index}
                src={img.src}
                alt={t.gallery.alt[img.altKey]}
                className="max-h-full max-w-[86vw] object-contain md:max-w-[70vw]"
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <button
              onClick={goNext}
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
