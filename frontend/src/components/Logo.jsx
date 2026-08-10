import React from "react";
import { siteConfig } from "@/lib/siteConfig";

// TODO-CODEX: Refine the final vector/wordmark logo treatment using the supplied MAYKA logo as visual reference.
// Refined CSS/text-based wordmark inspired by the supplied gold serif MAYKA logo.
// siteConfig.brandSecondary is kept configurable and never baked into an image.
export const Logo = ({ size = "md", showSecondary = true, className = "" }) => {
  const sizes = {
    sm: { primary: "text-lg md:text-xl", track: "0.34em", secondary: "text-[0.5rem]" },
    md: { primary: "text-2xl md:text-3xl", track: "0.4em", secondary: "text-[0.55rem]" },
    lg: { primary: "text-5xl md:text-7xl", track: "0.32em", secondary: "text-xs md:text-sm" },
  };
  const s = sizes[size] || sizes.md;
  return (
    <div className={`flex flex-col items-center leading-none ${className}`} data-testid="brand-logo">
      <span
        className={`gold-metallic font-serif ${s.primary}`}
        style={{ letterSpacing: s.track, fontWeight: 500 }}
      >
        {siteConfig.brandPrimary.split("").join("\u200a")}
      </span>
      {showSecondary && (
        <span
          className={`${s.secondary} mt-1 uppercase text-[color:var(--taupe)]`}
          style={{ letterSpacing: "0.5em", fontFamily: "var(--font-sans)", fontWeight: 500 }}
        >
          {siteConfig.brandSecondary}
        </span>
      )}
    </div>
  );
};
