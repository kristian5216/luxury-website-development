import React from "react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";
import { siteConfig } from "@/lib/siteConfig";

export const FinalStatement = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-32 md:py-48" data-testid="final-statement">
      {/* Slow editorial marquee */}
      <div className="pointer-events-none absolute inset-0 flex items-center opacity-[0.04]" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="font-serif text-[18vw] uppercase text-[color:var(--ivory)]" style={{ letterSpacing: "0.05em" }}>
              {siteConfig.brandPrimary}&nbsp;{siteConfig.brandSecondary}&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>
      <div className="container-lux relative text-center">
        <Reveal>
          <p className="mx-auto max-w-3xl font-serif text-3xl italic leading-snug text-[color:var(--ivory)] sm:text-4xl lg:text-5xl">
            “{t.final.quote}”
          </p>
        </Reveal>
      </div>
    </section>
  );
};
