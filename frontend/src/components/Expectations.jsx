import React from "react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";

export const Expectations = () => {
  const { t } = useLanguage();
  return (
    <section id="expectations" className="relative py-28 md:py-40" data-testid="expectations-section">
      <div className="container-lux">
        <div className="max-w-2xl">
          <Reveal><span className="eyebrow">{t.expectations.label}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[color:var(--ivory)] md:text-6xl">{t.expectations.title}</h2>
          </Reveal>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--brown)" }}>
          {t.expectations.items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <div className="h-full p-9 md:p-11" style={{ background: "var(--black)" }} data-testid={`expectation-${i}`}>
                <span className="font-serif text-lg text-[color:var(--champagne)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-2xl text-[color:var(--ivory)]">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--taupe)]">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
