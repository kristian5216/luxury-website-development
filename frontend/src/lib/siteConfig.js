// Centralized site configuration for MAYKA SAINTT.
// All values that are missing or pending client confirmation are stored here.

export const siteConfig = {
  brandPrimary: "MAYKA",
  brandSecondary: "SAINTT",
  brandDisplayName: "Mayka Saintt",

  // TODO-CODEX-SEO: Verify final robots/meta privacy settings immediately before production deployment.
  indexingEnabled: false,

  // Final production domain — confirmed by client 2026-08-10.
  domain: "maykasaintt.com",

  defaultLanguage: "es",
  languages: ["es", "en", "fr"],

  contact: {
    hours: "10:00 — 22:00",
    // España · Disponibilidad internacional (localized in copy)
    // Administrative email intentionally NOT exposed publicly.
  },

  onlyfans: {
    enabled: true,
    url: "https://onlyfans.com/maykasaint",
  },

  // TODO-CODEX-INTEGRATION: Add client's new WhatsApp number when supplied.
  whatsapp: {
    enabled: false,
    number: "",
    url: "",
  },

  // TODO-CODEX-INTEGRATION: Activate Telegram after client supplies final URL.
  telegram: {
    enabled: false,
    url: "",
  },

  // TODO-CODEX-INTEGRATION: Connect approved payment provider and reservation deposit after final client confirmation.
  payment: {
    enabled: false,
    provider: "",
    paymentUrl: "",
    amount: null,
    currency: "",
  },

  travelCountries: "40+",
};

export const canonicalUrl =
  siteConfig.domain && siteConfig.domain.length > 0
    ? `https://${siteConfig.domain}`
    : null;
