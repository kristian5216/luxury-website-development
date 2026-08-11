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

// Direction the element travels FROM as it settles into place.
const DIRECTION_OFFSET = {
  up: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  none: { x: 0, y: 0 },
};

// Fade + restrained translate reveal on scroll. direction: up | left | right | none.
export const Reveal = ({
  children,
  delay = 0,
  distance = 20,
  direction = "up",
  duration = 0.8,
  threshold = "-10% 0px -10% 0px",
  className = "",
  as = "div",
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = DIRECTION_OFFSET[direction] || DIRECTION_OFFSET.up;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: offset.x * distance, y: offset.y * distance }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: threshold }}
      transition={{ duration, ease: easeLux, delay }}
    >
      {children}
    </MotionTag>
  );
};

// Staggered group of Reveal children — same props as Reveal, plus `stagger` spacing per child.
export const RevealGroup = ({ children, stagger = 0.08, delay = 0, ...revealProps }) => (
  <>
    {React.Children.toArray(children).map((child, i) => (
      <Reveal key={child.key ?? i} delay={delay + i * stagger} {...revealProps}>
        {child}
      </Reveal>
    ))}
  </>
);

// Subtle mask/clip reveal for large editorial images. direction: left | right | up | down.
export const ImageReveal = ({ children, delay = 0, duration = 1, direction = "left", className = "" }) => {
  const reduce = useReducedMotion();
  const clipFrom =
    {
      left: "inset(0% 0% 0% 100%)",
      right: "inset(0% 100% 0% 0%)",
      up: "inset(100% 0% 0% 0%)",
      down: "inset(0% 0% 100% 0%)",
    }[direction] || "inset(0% 0% 0% 100%)";

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: clipFrom }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, ease: easeLux, delay }}
    >
      {children}
    </motion.div>
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
