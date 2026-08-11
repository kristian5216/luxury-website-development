import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import es from "@/locales/es";
import en from "@/locales/en";
import fr from "@/locales/fr";
import { siteConfig, canonicalUrl } from "@/lib/siteConfig";

const dictionaries = { es, en, fr };
const STORAGE_KEY = "mayka_lang";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(siteConfig.defaultLanguage);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && siteConfig.languages.includes(stored)) {
      setLang(stored);
    }
  }, []);

  const changeLang = useCallback((next) => {
    if (!siteConfig.languages.includes(next)) return;
    setLang(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;

    // Canonical tag only renders once siteConfig.domain is set — no-op while it's still "".
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }
  }, [lang]);

  const value = { lang, changeLang, t: dictionaries[lang] };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
