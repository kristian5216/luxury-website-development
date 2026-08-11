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
  const [active, setActive] = useState("hero");

  const links = [
    { id: "hero", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "philosophy", label: t.nav.philosophy },
    { id: "gallery", label: t.nav.gallery },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlighting — lightweight IntersectionObserver over the nav's own ids.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

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
            <Logo size="sm" variant="compact" />
          </button>

          <nav className="hidden items-center gap-9 lg:flex" data-testid="desktop-nav">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => scrollToId(l.id)}
                  data-testid={`nav-${l.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative py-1 text-xs uppercase tracking-[0.2em] transition-colors duration-500"
                  style={{ color: isActive ? "var(--champagne)" : "var(--ivory)" }}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-500 ease-out"
                    style={{
                      backgroundColor: "var(--champagne)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ backgroundColor: "var(--champagne)", opacity: isActive ? 0 : 1 }}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          <button
            className="p-1 text-[color:var(--ivory)] lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={t.a11y.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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
