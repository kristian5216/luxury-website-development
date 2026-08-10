import React from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";

export const IdealProfile = () => {
  const { t } = useLanguage();
  return (
    <section id="ideal" className="relative py-28 md:py-40" data-testid="ideal-section">
      <div className="container-lux">
        <div className="max-w-2xl">
          <Reveal><span className="eyebrow">{t.ideal.label}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[color:var(--ivory)] md:text-6xl">{t.ideal.title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">{t.ideal.intro}</p>
          </Reveal>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-14 sm:grid-cols-2 lg:grid-cols-3">
          {t.ideal.items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <div className="flex items-center gap-4 border-b border-[color:var(--brown)] py-6" data-testid={`ideal-item-${i}`}>
                <Plus size={15} strokeWidth={1} className="shrink-0 text-[color:var(--champagne)]" />
                <span className="text-sm text-[color:var(--ivory)] md:text-base">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
