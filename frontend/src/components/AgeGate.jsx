import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/translations";
import { useFocusTrap } from "@/lib/useFocusTrap";

const STORAGE_KEY = "mayka_age_ok";

export const AgeGate = ({ confirmed, onConfirm }) => {
  const { t } = useLanguage();
  const enterRef = useRef(null);
  const containerRef = useRef(null);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    onConfirm();
  };
  const exit = () => {
    window.location.href = "https://www.google.com";
  };

  useFocusTrap(containerRef, !confirmed);

  useEffect(() => {
    if (confirmed) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && exit();
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => enterRef.current?.focus(), 400);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed]);

  return (
    <AnimatePresence>
      {!confirmed && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 grain"
          style={{ background: "var(--black)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={t.ageGate.line1}
          data-testid="age-gate"
        >
          <motion.div
            className="relative z-[2] w-full max-w-lg text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <Logo size="lg" className="mx-auto" />
            <div className="divider-thin mx-auto mt-10 max-w-[80px]" />
            <p className="mt-9 font-serif text-2xl leading-snug text-[color:var(--ivory)] md:text-3xl">
              {t.ageGate.line1}
            </p>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[color:var(--taupe)]">
              {t.ageGate.line2}
            </p>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button ref={enterRef} onClick={accept} className="btn-lux btn-lux--solid w-full sm:w-auto" data-testid="age-gate-enter">
                {t.ageGate.enter}
              </button>
              <button onClick={exit} className="btn-lux w-full sm:w-auto" data-testid="age-gate-exit">
                {t.ageGate.exit}
              </button>
            </div>
            <div className="mt-12 flex justify-center">
              <LanguageSwitcher />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const getAgeConfirmed = () => localStorage.getItem(STORAGE_KEY) === "true";
