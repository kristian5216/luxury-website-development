# PRD — MAYKA SAINTT (Stage 1 Frontend)

## Original Problem Statement
Premium multilingual (ES/EN/FR) single-page luxury personal-brand landing page for "Mayka Saintt". Stage 1 = near-final frontend (~85–90%). Missing/pending data must be centralized in config, features disabled if not ready, and marked with TODO-CODEX. Stage 2 will be done later in Codex.

## Architecture
- **Frontend-only** React (CRA + craco), Tailwind, framer-motion, lenis. No backend, no DB, no live integrations in Stage 1.
- Centralized config: `src/lib/siteConfig.js`, `src/lib/images.js`, `src/lib/translations.jsx` (Language context + localStorage).
- Locales: `src/locales/{es,en,fr}.js`. Spanish default.
- Components in `src/components/*`: Logo, Header, MobileMenu, LanguageSwitcher, AgeGate, Hero, Positioning, About, Travel, Philosophy, IdealProfile, Compatibility, Expectations, EditorialBreak, Gallery, GalleryLightbox, ExclusiveContent, FAQ, Contact, FinalStatement, Footer, LegalModal, DepositButton.
- Motion helpers in `src/lib/motion.jsx` (Reveal, MaskedLines, useLenis, scrollToId).

## User Personas
- Discerning, educated visitors valuing exclusivity, discretion, quality. Multilingual (ES/EN/FR).

## Core Requirements (static)
- Luxury editorial aesthetic (palette + Cormorant Garamond/Inter). Non-explicit, discreet.
- Age gate, single-page sections in required order, smooth scroll nav.
- ES/EN/FR full translation, ES default, persisted in localStorage.
- Editorial masonry gallery + accessible fullscreen lightbox.
- OnlyFans link (new tab). WhatsApp/Telegram/Payment disabled via config. No public email/city/address/map.
- noindex/nofollow; indexing controlled by `siteConfig.indexingEnabled`.

## Implemented (2026-06 / Stage 1 complete)
- All 17 sections built and styled; kinetic hero (masked line reveal + parallax), lenis smooth scroll, scroll reveals, slow brand marquee.
- Age gate (accessible dialog, localStorage `mayka_age_ok`, ES/EN/FR).
- Header (transparent→blur on scroll) + fullscreen mobile menu with logo/nav/lang/contact CTA.
- Gallery lightbox: counter, prev/next, keyboard arrows, Escape, body scroll lock, focus restore.
- FAQ accordion (aria-expanded), Contact (hours 10:00–22:00, España · Disponibilidad internacional, channels "coming soon"), premium footer with legal modals + dynamic year.
- Verified: ES/EN/FR switching, localStorage persistence, lightbox, FAQ, OnlyFans link, disabled WhatsApp/Telegram/payment, noindex meta.

## Known Stage-2 handoff (TODO-CODEX)
- All 7 approved portraits now supplied and mapped in `src/lib/images.js` (IMAGE 01–07).
- Logo: refined CSS gold wordmark used (no clean logo raster supplied). Refine to final vector.
- Integrations pending: WhatsApp number, Telegram URL, payment provider/deposit, final domain + canonical, final robots/meta, final legal text.

## Backlog / Remaining
- P0: Add IMAGE 05/06/07 once supplied; final WhatsApp/Telegram; final legal + domain before launch; flip indexing when ready.
- P1: Premium directional lightbox transitions + mobile swipe; richer hero choreography (TODO-CODEX-ANIMATION markers in code).
- P2: Optional reservation-deposit flow when provider confirmed.
