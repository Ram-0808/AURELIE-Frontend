import type { Variants } from "framer-motion";

// Shared easing — the "luxe" curve used across the site.
export const luxeEase = [0.16, 1, 0.3, 1] as const;

// Fade + rise, used for most scroll reveals.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxeEase },
  },
};

// Staggered container for grouped reveals.
export const stagger = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// A gentle clip-reveal for images.
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.2, ease: luxeEase },
  },
};

// Per-word / per-line text reveal.
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 1, ease: luxeEase, delay: 0.1 * i },
  }),
};

export const viewportOnce = { once: true, amount: 0.3 } as const;
