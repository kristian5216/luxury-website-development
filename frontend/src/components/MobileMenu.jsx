import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/translations";
import { scrollToId } from "@/lib/motion";

export const MobileMenu = ({ open, onClose, links }) => {
  const { t } = useLanguage();
  const go = (id) => {
    onClose();
    setTimeout(() => scrollToId(id), 260);
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          style={{ background: "var(--black)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          data-testid="mobile-menu"
        >
          <div className="flex items-center justify-between px-6 pt-7">
            <Logo size="sm" />
            <button
              onClick={onClose}
              aria-label={t.a11y.closeMenu}
              data-testid="mobile-menu-close"
              className="p-2 text-[color:var(--ivory)]"
            >
              <X size={26} strokeWidth={1} />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-2 px-8">
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                onClick={() => go(l.id)}
                data-testid={`mobile-nav-${l.id}`}
                className="py-3 text-left font-serif text-4xl text-[color:var(--ivory)]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {l.label}
              </motion.button>
            ))}
          </nav>
          <div className="absolute bottom-12 left-8 right-8">
            <div className="divider-thin mb-7" />
            <div className="flex items-center justify-between">
              <LanguageSwitcher size="lg" />
              <button
                onClick={() => go("contact")}
                data-testid="mobile-menu-contact-cta"
                className="btn-lux btn-lux--solid !px-6 !py-3"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
