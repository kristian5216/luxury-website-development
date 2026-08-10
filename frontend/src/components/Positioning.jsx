import React from "react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";
import { portraits } from "@/lib/images";

export const Positioning = () => {
  const { t } = useLanguage();
  return (
    <section id="positioning" className="relative py-28 md:py-40" data-testid="positioning-section">
      <div className="container-lux grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow">{t.positioning.label}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-8 font-serif text-[2rem] italic leading-[1.15] text-[color:var(--ivory)] sm:text-4xl lg:text-[3.1rem]">
              “{t.positioning.quote}”
            </blockquote>
          </Reveal>
          <div className="mt-10 max-w-xl space-y-6 text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">
            <Reveal delay={0.15}><p>{t.positioning.p1}</p></Reveal>
            <Reveal delay={0.2}><p>{t.positioning.p2}</p></Reveal>
          </div>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: portraits.positioning.aspectRatio, border: "1px solid var(--brown)" }}
            >
              <img
                src={portraits.positioning.src}
                alt={t.gallery.alt.whiteStanding}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: portraits.positioning.objectPositionDesktop }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
