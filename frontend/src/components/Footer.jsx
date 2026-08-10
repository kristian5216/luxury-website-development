import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LegalModal } from "@/components/LegalModal";
import { useLanguage } from "@/lib/translations";
import { scrollToId } from "@/lib/motion";
import { siteConfig } from "@/lib/siteConfig";

export const Footer = () => {
  const { t } = useLanguage();
  const [legal, setLegal] = useState(null);
  const year = new Date().getFullYear();

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "philosophy", label: t.nav.philosophy },
    { id: "gallery", label: t.nav.gallery },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-[color:var(--brown)] pt-20 pb-10" style={{ background: "var(--black)" }} data-testid="site-footer">
      <div className="container-lux">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="md" className="!items-start" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[color:var(--taupe)]">{t.footer.tagline}</p>
            <div className="mt-8"><LanguageSwitcher /></div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow">{t.footer.nav}</p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button onClick={() => scrollToId(l.id)} data-testid={`footer-nav-${l.id}`} className="text-sm text-[color:var(--cream)] transition-colors hover:text-[color:var(--champagne)]">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">{t.footer.connect}</p>
            <ul className="mt-6 space-y-3">
              {siteConfig.onlyfans.enabled && (
                <li>
                  <a href={siteConfig.onlyfans.url} target="_blank" rel="noopener noreferrer" data-testid="footer-onlyfans" className="inline-flex items-center gap-1 text-sm text-[color:var(--cream)] transition-colors hover:text-[color:var(--champagne)]">
                    OnlyFans <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                </li>
              )}
              <li><button onClick={() => setLegal("privacy")} data-testid="footer-privacy" className="text-sm text-[color:var(--cream)] transition-colors hover:text-[color:var(--champagne)]">{t.footer.privacy}</button></li>
              <li><button onClick={() => setLegal("terms")} data-testid="footer-terms" className="text-sm text-[color:var(--cream)] transition-colors hover:text-[color:var(--champagne)]">{t.footer.terms}</button></li>
            </ul>
          </div>
        </div>

        <div className="divider-thin mt-16" />
        <div className="mt-8 flex flex-col gap-3 text-xs text-[color:var(--taupe)] md:flex-row md:items-center md:justify-between">
          <span>© {year} {siteConfig.brandDisplayName}. {t.footer.rights}</span>
          <span>{t.footer.adultNotice}</span>
        </div>
      </div>
      <LegalModal type={legal} onClose={() => setLegal(null)} />
    </footer>
  );
};
