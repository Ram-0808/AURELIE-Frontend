import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/**
 * Lenis smooth scroll, driven by Framer Motion's frame loop so that
 * `useScroll`/`useTransform` update on the *same* tick as the scroll
 * animation. Running both on one clock removes the micro-jitter you get
 * when Lenis's own rAF and Framer's rAF drift apart.
 *
 * Respects prefers-reduced-motion by skipping smooth scroll entirely.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // Lower duration = more responsive, less "floaty glide" after you stop.
      duration: 0.9,
      // Exponential ease-out; snappier tail than the previous curve.
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // lerp gives frame-rate-independent smoothing.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    // Drive Lenis from Framer Motion's frame loop (single shared clock).
    const update = (data: { timestamp: number }) => {
      lenis.raf(data.timestamp);
    };
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
