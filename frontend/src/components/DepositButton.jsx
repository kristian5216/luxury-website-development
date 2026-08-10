import React from "react";
import { siteConfig } from "@/lib/siteConfig";

// Reusable reservation-deposit button.
// TODO-CODEX-INTEGRATION: Connect approved payment provider and reservation deposit after final client confirmation.
export const DepositButton = ({ label = "Reservar", className = "" }) => {
  if (!siteConfig.payment.enabled) return null; // Do not render when disabled.
  return (
    <a
      href={siteConfig.payment.paymentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-lux btn-lux--solid ${className}`}
      data-testid="deposit-button"
    >
      {label}
    </a>
  );
};
