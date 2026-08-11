import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import { MaskedLines, scrollToId } from "@/lib/motion";
import { portraits } from "@/lib/images";

// Editorial entrance cascade: image reveal (0ms) → eyebrow (~150ms) → heading (~300ms,
// via MaskedLines) → paragraph (~550ms) → CTAs (~750ms) → scroll indicator (~950ms).
export const Hero = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  const titleLines = t.hero.title.split(",").reduce((acc, part, i, arr) => {
    const piece = i < arr.length - 1 ? part + "," : part;
    acc.push(piece.trim());
    return acc;
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden grain" data-testid="hero-section">
      <div className="container-lux grid min-h-[100svh] grid-cols-1 items-center gap-8 pt-28 pb-16 lg:grid-cols-12 lg:gap-6 lg:pt-24 lg:pb-0">
        {/* Text */}
        <div className="relative z-[3] order-2 lg:order-1 lg:col-span-6 xl:col-span-6">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t.hero.eyebrow}
          </motion.p>
          <h1
            className="mt-7 font-serif leading-[1.02] text-[color:var(--ivory)]"
            style={{ fontSize: "clamp(2.65rem, 2rem + 4vw, 5rem)" }}
          >
            <MaskedLines lines={titleLines} delay={0.3} lineClass="italic" />
          </h1>
          <motion.p
            className="mt-8 max-w-md text-sm leading-relaxed text-[color:var(--taupe)] md:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.hero.support}
          </motion.p>
          <motion.div
            className="mt-11 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <button onClick={() => scrollToId("about")} className="btn-lux btn-lux--solid" data-testid="hero-cta-discover">
              {t.hero.ctaPrimary}
            </button>
            {/* Contact privado scrolls to contact — WhatsApp/Telegram not finalized. */}
            <button onClick={() => scrollToId("contact")} className="btn-lux" data-testid="hero-cta-contact">
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* Image — IMAGE 03, framed & spotlit. Face preserved, no text over face. */}
        <div className="relative order-1 lg:order-2 lg:col-span-6 xl:col-start-8 xl:col-span-5">
          <motion.div
            className="relative mx-auto w-full max-w-[420px] overflow-hidden lg:max-w-none"
            style={{ aspectRatio: portraits.hero.aspectRatio, border: "1px solid var(--brown)" }}
            initial={{ opacity: 0, y: 24, scale: reduce ? 1 : 1.035 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={portraits.hero.src}
              alt={t.gallery.alt.whiteSeated}
              fetchpriority="high"
              className="obj-pos h-full w-full object-cover"
              style={{ "--op-m": portraits.hero.objectPositionMobile, "--op-d": portraits.hero.objectPositionDesktop, y: imgY, scale: imgScale }}
            />
            <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 -120px 120px -60px rgba(11,10,9,0.7)" }} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToId("positioning")}
        className="absolute bottom-7 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2 text-[color:var(--taupe)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.8 }}
        aria-label={t.hero.scroll}
        data-testid="hero-scroll-indicator"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <motion.span animate={reduce ? {} : { y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={16} strokeWidth={1} />
        </motion.span>
      </motion.button>
    </section>
  );
};
