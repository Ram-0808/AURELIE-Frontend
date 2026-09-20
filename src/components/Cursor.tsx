import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * A minimal luxury cursor: a small dot that follows exactly, and a ring
 * that trails with spring physics. Grows over interactive elements and
 * can display a contextual label (e.g. "View", "Drag").
 * Disabled on touch / coarse-pointer devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select, [role='button']"
      ) as HTMLElement | null;
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute("data-cursor") ?? null);
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-charcoal mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border border-charcoal/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 74 : hovering ? 46 : 30,
          height: label ? 74 : hovering ? 46 : 30,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-sans text-[9px] uppercase tracking-wide2 text-charcoal"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
