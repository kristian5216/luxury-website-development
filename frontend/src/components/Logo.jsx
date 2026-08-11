import React from "react";
import { siteConfig } from "@/lib/siteConfig";

// Refined CSS/text-based wordmark inspired by the supplied gold serif MAYKA logo asset.
// The original raster (MAYKA in gold serif on black, with unused canvas) is kept only as a
// visual/brand reference — it is never enlarged or rendered directly on the site.
// siteConfig.brandSecondary is kept configurable and never baked into an image.
//
// variant="dark"    — warm metallic gold treatment, full lockup (default; for dark backgrounds).
// variant="light"   — deep charcoal/espresso solid, full lockup (for light backgrounds, if any).
// variant="compact" — metallic wordmark only, no secondary label (nav / tight spaces).
const VARIANTS = {
  dark: { treatment: "metallic", secondaryByDefault: true },
  light: { treatment: "solid-light", secondaryByDefault: true },
  compact: { treatment: "metallic", secondaryByDefault: false },
};

const LETTER_SPACER = " ";

export const Logo = ({ size = "md", variant = "dark", showSecondary, className = "" }) => {
  const sizes = {
    sm: { primary: "text-lg md:text-xl", track: "0.34em", secondary: "text-[0.5rem]" },
    md: { primary: "text-2xl md:text-3xl", track: "0.4em", secondary: "text-[0.55rem]" },
    lg: { primary: "text-5xl md:text-7xl", track: "0.32em", secondary: "text-xs md:text-sm" },
  };
  const s = sizes[size] || sizes.md;
  const v = VARIANTS[variant] || VARIANTS.dark;
  const secondaryVisible = showSecondary ?? v.secondaryByDefault;
  const primaryClass = v.treatment === "metallic" ? "gold-metallic" : "logo-solid-light";

  return (
    <div className={`flex flex-col items-center leading-none ${className}`} data-testid="brand-logo">
      <span
        className={`${primaryClass} font-serif ${s.primary}`}
        style={{ letterSpacing: s.track, fontWeight: 500 }}
      >
        {siteConfig.brandPrimary.split("").join(LETTER_SPACER)}
      </span>
      {secondaryVisible && (
        <span
          className={`${s.secondary} mt-1 uppercase`}
          style={{
            letterSpacing: "0.5em",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: v.treatment === "metallic" ? "var(--taupe)" : "var(--brown)",
          }}
        >
          {siteConfig.brandSecondary}
        </span>
      )}
    </div>
  );
};
