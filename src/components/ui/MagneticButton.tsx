import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

interface MagneticProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  cursorLabel?: string;
}

/**
 * A button/link that subtly pulls toward the cursor when hovered — a hallmark
 * of high-end agency sites. Falls back gracefully; motion is transform-only.
 */
export default function MagneticButton({
  children,
  to,
  onClick,
  className = "",
  strength = 0.35,
  cursorLabel,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = <span className="relative block">{children}</span>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
      data-cursor={cursorLabel}
    >
      {to ? (
        <Link to={to} className={className} onClick={onClick}>
          {inner}
        </Link>
      ) : (
        <button type="button" className={className} onClick={onClick}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
