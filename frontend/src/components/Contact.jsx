import React from "react";
import { Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import { Reveal } from "@/lib/motion";
import { siteConfig } from "@/lib/siteConfig";
import { portraits } from "@/lib/images";
import { DepositButton } from "@/components/DepositButton";

// Contact — no city, no address, no map, no public email.
export const Contact = () => {
  const { t } = useLanguage();
  const { whatsapp, telegram } = siteConfig;

  return (
    <section id="contact" className="relative py-28 md:py-40" style={{ background: "var(--charcoal)" }} data-testid="contact-section">
      <div className="container-lux grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal><span className="eyebrow">{t.contact.label}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-5xl leading-tight text-[color:var(--ivory)] md:text-6xl">{t.contact.title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--taupe)] md:text-base">{t.contact.intro}</p>
          </Reveal>

          <div className="mt-12 space-y-8">
            <Reveal delay={0.16}>
              <div className="flex items-start gap-5 border-t border-[color:var(--brown)] pt-8">
                <Clock size={18} strokeWidth={1} className="mt-1 text-[color:var(--champagne)]" />
                <div>
                  <p className="eyebrow">{t.contact.hoursLabel}</p>
                  <p className="mt-2 font-serif text-2xl text-[color:var(--ivory)]" data-testid="contact-hours">{siteConfig.contact.hours}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-start gap-5 border-t border-[color:var(--brown)] pt-8">
                <MapPin size={18} strokeWidth={1} className="mt-1 text-[color:var(--champagne)]" />
                <div>
                  <p className="eyebrow">{t.contact.locationLabel}</p>
                  <p className="mt-2 font-serif text-2xl text-[color:var(--ivory)]" data-testid="contact-location">{t.contact.location}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="border-t border-[color:var(--brown)] pt-8">
                <p className="eyebrow">{t.contact.channelsLabel}</p>
                {/* Channels not finalized — no broken buttons, no fake usernames. */}
                {!whatsapp.enabled && !telegram.enabled ? (
                  <p className="mt-3 text-sm text-[color:var(--taupe)]" data-testid="contact-channels-soon">{t.contact.channelsSoon}</p>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {whatsapp.enabled && (
                      <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="btn-lux" data-testid="contact-whatsapp">
                        {t.contact.whatsapp}
                      </a>
                    )}
                    {telegram.enabled && (
                      <a href={telegram.url} target="_blank" rel="noopener noreferrer" className="btn-lux" data-testid="contact-telegram">
                        {t.contact.telegram}
                      </a>
                    )}
                  </div>
                )}
                <DepositButton className="mt-5" />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden" style={{ aspectRatio: portraits.contact.aspectRatio, border: "1px solid var(--brown)" }}>
              <img
                src={portraits.contact.src}
                alt={t.gallery.alt.whiteSeated}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: portraits.contact.objectPositionDesktop }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
