import React from "react";
import { useLanguage } from "@/lib/translations";
import { Reveal, ImageReveal } from "@/lib/motion";
import { portraits } from "@/lib/images";

export const Philosophy = () => {
  const { t } = useLanguage();
  return (
    <section id="philosophy" className="relative py-28 md:py-40" style={{ background: "var(--charcoal)" }} data-testid="philosophy-section">
      <div className="container-lux">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + intro */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-xl text-[color:var(--champagne)]">{t.philosophy.number}</span>
                <span className="eyebrow">{t.philosophy.label}</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-6 font-serif text-[color:var(--ivory)]"
                style={{ fontSize: "clamp(3rem, 2.4rem + 2.5vw, 3.75rem)" }}
              >
                {t.philosophy.title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-md font-serif text-xl italic leading-snug text-[color:var(--taupe)]">
                {t.philosophy.intro}
              </p>
            </Reveal>
            <ImageReveal direction="left" delay={0.16}>
              <div className="mt-10 hidden overflow-hidden lg:block" style={{ aspectRatio: "4 / 5", border: "1px solid var(--brown)" }}>
                <img
                  src={portraits.philosophy.src}
                  alt={t.gallery.alt.whiteSeated}
                  loading="lazy"
                  className="obj-pos h-full w-full object-cover"
                  style={{ "--op-m": portraits.philosophy.objectPositionMobile, "--op-d": portraits.philosophy.objectPositionDesktop }}
                />
              </div>
            </ImageReveal>
          </div>

          {/* Right: numbered principles */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="divider-thin" />
            {t.philosophy.principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="group flex gap-6 py-9 md:py-11" data-testid={`philosophy-principle-${i}`}>
                  <span className="font-serif text-2xl text-[color:var(--champagne)]">{p.n}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-[color:var(--ivory)] md:text-3xl">{p.t}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">{p.d}</p>
                  </div>
                </div>
                <div className="divider-thin" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
