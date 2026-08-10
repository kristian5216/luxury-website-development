import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/translations";

// TODO-CODEX-CONTENT: Replace provisional legal text after final legal information is supplied.
export const LegalModal = ({ type, onClose }) => {
  const { t } = useLanguage();
  const open = type !== null;
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, [open, onClose]);

  const title = type === "privacy" ? t.legal.privacyTitle : t.legal.termsTitle;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          data-testid="legal-modal"
          onClick={onClose}
        >
          <div className="absolute inset-0" style={{ background: "rgba(11,10,9,0.9)" }} />
          <motion.div
            className="relative w-full max-w-lg border border-[color:var(--brown)] p-9 md:p-12"
            style={{ background: "var(--charcoal)" }}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <h2 className="font-serif text-3xl text-[color:var(--ivory)]">{title}</h2>
              <button ref={closeRef} onClick={onClose} aria-label={t.legal.close} data-testid="legal-modal-close" className="p-1 text-[color:var(--ivory)]">
                <X size={22} strokeWidth={1} />
              </button>
            </div>
            <div className="divider-thin my-6" />
            <p className="text-sm leading-relaxed text-[color:var(--taupe)]">{t.legal.provisional}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
