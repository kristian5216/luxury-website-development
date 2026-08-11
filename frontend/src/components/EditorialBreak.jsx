import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/translations";
import { ImageReveal } from "@/lib/motion";
import { portraits } from "@/lib/images";

// Large editorial image break — IMAGE 04. Thin typography, no text over her face.
// Full-bleed mask reveal on entry, plus a slow scroll parallax (both respect reduced-motion).
export const EditorialBreak = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-12%", reduce ? "0%" : "12%"]);

  return (
    <section ref={ref} className="relative h-[90vh] w-full overflow-hidden" data-testid="editorial-break">
      <ImageReveal direction="right" duration={1.1} className="absolute inset-0 h-full w-full">
        <motion.img
          src={portraits.editorialBreak.src}
          alt={t.gallery.alt.whiteStanding}
          loading="lazy"
          className="obj-pos h-[125%] w-full object-cover"
          style={{ "--op-m": portraits.editorialBreak.objectPositionMobile, "--op-d": portraits.editorialBreak.objectPositionDesktop, y }}
        />
      </ImageReveal>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,10,9,0.9) 0%, rgba(11,10,9,0.55) 35%, rgba(11,10,9,0.1) 70%)" }} />
      <div className="container-lux relative flex h-full items-center">
        <div className="flex flex-col gap-6">
          {t.editorialBreak.words.map((w, i) => (
            <motion.span
              key={w}
              className="font-serif text-4xl uppercase text-[color:var(--ivory)] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "0.12em", fontWeight: 300 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};
