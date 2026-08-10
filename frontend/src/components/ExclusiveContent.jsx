import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";
import { siteConfig } from "@/lib/siteConfig";

export const ExclusiveContent = () => {
  const { t } = useLanguage();
  if (!siteConfig.onlyfans.enabled) return null;
  return (
    <section id="exclusive" className="relative py-28 md:py-40" data-testid="exclusive-section">
      <div className="container-lux">
        <div className="relative overflow-hidden border border-[color:var(--brown)] px-8 py-16 text-center md:px-16 md:py-24" style={{ background: "var(--charcoal)" }}>
          <Reveal><span className="eyebrow">{t.exclusive.label}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-tight text-[color:var(--ivory)] md:text-6xl">
              {t.exclusive.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">
              {t.exclusive.text}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href={siteConfig.onlyfans.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lux btn-lux--solid mt-11"
              data-testid="onlyfans-link"
            >
              {t.exclusive.cta}
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
