import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";

export const FAQ = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative py-28 md:py-40" data-testid="faq-section">
      <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal><span className="eyebrow">{t.faq.label}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[color:var(--ivory)] md:text-5xl lg:sticky lg:top-28">
              {t.faq.title}
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="divider-thin" />
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} data-testid={`faq-item-${i}`}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    data-testid={`faq-trigger-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-serif text-xl text-[color:var(--ivory)] md:text-2xl">{item.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="shrink-0 text-[color:var(--champagne)]">
                      <Plus size={20} strokeWidth={1} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-8 text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="divider-thin" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
