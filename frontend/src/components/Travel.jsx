import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";
import { portraits } from "@/lib/images";

// TODO-CODEX-ANIMATION: Add subtle image depth movement.
export const Travel = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-8%", reduce ? "0%" : "8%"]);

  return (
    <section id="travel" ref={ref} className="relative py-28 md:py-40" data-testid="travel-section">
      <div className="container-lux grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-xl text-[color:var(--champagne)]">{t.travel.number}</span>
              <span className="eyebrow">{t.travel.label}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[color:var(--ivory)] md:text-5xl">
              {t.travel.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 flex items-end gap-5">
              <span className="gold-metallic font-serif text-7xl leading-none md:text-8xl">{t.travel.count}</span>
              <span className="mb-2 text-sm uppercase tracking-[0.25em] text-[color:var(--taupe)]">{t.travel.countLabel}</span>
            </div>
          </Reveal>
          <div className="mt-9 max-w-xl space-y-6 text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">
            <Reveal delay={0.16}><p>{t.travel.p1}</p></Reveal>
            <Reveal delay={0.2}><p>{t.travel.p2}</p></Reveal>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden" style={{ aspectRatio: portraits.travel.aspectRatio, border: "1px solid var(--brown)" }}>
              <motion.img
                src={portraits.travel.src}
                alt={t.gallery.alt.brown}
                loading="lazy"
                className="h-[112%] w-full object-cover"
                style={{ objectPosition: portraits.travel.objectPositionDesktop, y }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
