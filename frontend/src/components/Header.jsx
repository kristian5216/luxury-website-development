import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { useLanguage } from "@/lib/translations";
import { scrollToId } from "@/lib/motion";

export const Header = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "hero", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "philosophy", label: t.nav.philosophy },
    { id: "gallery", label: t.nav.gallery },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] transition-all duration-700"
        style={{
          backgroundColor: scrolled ? "rgba(11,10,9,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(57,45,40,0.7)" : "1px solid transparent",
        }}
        data-testid="site-header"
      >
        <div className="container-lux flex items-center justify-between py-4 md:py-5">
          <button onClick={() => scrollToId("hero")} data-testid="header-logo-btn" aria-label="MAYKA">
            <Logo size="sm" />
          </button>

          <nav className="hidden items-center gap-9 lg:flex" data-testid="desktop-nav">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                data-testid={`nav-${l.id}`}
                className="text-xs uppercase tracking-[0.2em] text-[color:var(--ivory)] transition-colors duration-500 hover:text-[color:var(--champagne)]"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          <button
            className="p-1 text-[color:var(--ivory)] lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={t.a11y.openMenu}
            data-testid="mobile-menu-open"
          >
            <Menu size={26} strokeWidth={1} />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
};
