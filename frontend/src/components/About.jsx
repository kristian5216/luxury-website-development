import React from "react";
import { useLanguage } from "@/lib/translations";
import { Reveal, ImageReveal } from "@/lib/motion";
import { portraits } from "@/lib/images";

export const About = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative py-28 md:py-40" style={{ background: "var(--charcoal)" }} data-testid="about-section">
      <div className="container-lux grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Image left */}
        <div className="lg:col-span-5">
          <ImageReveal direction="left">
            <div className="relative overflow-hidden" style={{ aspectRatio: portraits.about.aspectRatio, border: "1px solid var(--brown)" }}>
              <img
                src={portraits.about.src}
                alt={t.gallery.alt.brown}
                loading="lazy"
                className="obj-pos h-full w-full object-cover"
                style={{ "--op-m": portraits.about.objectPositionMobile, "--op-d": portraits.about.objectPositionDesktop }}
              />
            </div>
          </ImageReveal>
        </div>
        {/* Text right */}
        <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-center">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-xl text-[color:var(--champagne)]">{t.about.number}</span>
              <span className="eyebrow">{t.about.label}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-lg font-serif text-4xl leading-tight text-[color:var(--ivory)] md:text-5xl">
              {t.about.title}
            </h2>
          </Reveal>
          <div className="mt-9 max-w-xl space-y-6 text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">
            <Reveal delay={0.12}><p>{t.about.p1}</p></Reveal>
            <Reveal delay={0.16}><p>{t.about.p2}</p></Reveal>
            <Reveal delay={0.2}><p>{t.about.p3}</p></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
