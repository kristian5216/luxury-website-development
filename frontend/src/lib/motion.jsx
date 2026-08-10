import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";

// Smooth momentum scrolling (respects reduced-motion).
export const useLenis = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
};

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -10, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const easeLux = [0.16, 1, 0.3, 1];

// Fade + translateY reveal on scroll.
export const Reveal = ({ children, delay = 0, y = 34, className = "", as = "div" }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: easeLux, delay }}
    >
      {children}
    </MotionTag>
  );
};

// Masked line-by-line reveal for headings.
export const MaskedLines = ({ lines, className = "", lineClass = "", delay = 0 }) => {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i} aria-hidden="true">
          <motion.span
            style={{ display: "block" }}
            className={lineClass}
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: 0.9, ease: easeLux, delay: delay + i * 0.11 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export { motion };
