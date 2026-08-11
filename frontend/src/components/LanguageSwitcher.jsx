import React from "react";
import { useLanguage } from "@/lib/translations";
import { siteConfig } from "@/lib/siteConfig";

export const LanguageSwitcher = ({ className = "", size = "sm" }) => {
  const { lang, changeLang, t } = useLanguage();
  return (
    <div
      className={`flex items-center ${size === "lg" ? "gap-5 text-sm" : "gap-3 text-xs"} ${className}`}
      role="group"
      aria-label={t.a11y.selectLanguage}
      data-testid="language-switcher"
    >
      {siteConfig.languages.map((code, i) => (
        <React.Fragment key={code}>
          {i > 0 && <span className="text-[color:var(--taupe)] opacity-50">·</span>}
          <button
            type="button"
            onClick={() => changeLang(code)}
            data-testid={`lang-${code}`}
            aria-pressed={lang === code}
            className="inline-block py-2 uppercase tracking-[0.2em] transition-colors duration-500"
            style={{
              color: lang === code ? "var(--champagne)" : "var(--taupe)",
              fontWeight: lang === code ? 500 : 300,
            }}
          >
            {code}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
