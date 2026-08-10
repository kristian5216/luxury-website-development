import React from "react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";

export const Compatibility = () => {
  const { t } = useLanguage();
  return (
    <section
      id="compatibility"
      className="relative py-28 md:py-40"
      style={{ background: "var(--deep-brown, #392d28)" }}
      data-testid="compatibility-section"
    >
      <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal><span className="eyebrow" style={{ color: "var(--cream)" }}>{t.compatibility.label}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-[color:var(--ivory)] md:text-5xl">
              {t.compatibility.title}
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="space-y-0">
            {t.compatibility.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <li className="flex gap-6 border-b border-[color:rgba(244,240,232,0.14)] py-7" data-testid={`compat-item-${i}`}>
                  <span className="font-serif text-lg text-[color:var(--champagne)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-[color:var(--cream)] md:text-base">{item}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
