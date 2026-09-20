import { motion } from "framer-motion";
import { lineReveal, viewportOnce } from "../../lib/motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** if true, animates on mount instead of on scroll into view */
  animateOnMount?: boolean;
}

/**
 * Splits a string into words, each masked and revealed with an upward slide.
 * Used for editorial headlines.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  animateOnMount = false,
}: SplitTextProps) {
  const words = text.split(" ");
  const animateProps = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: viewportOnce };

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            variants={lineReveal}
            initial="hidden"
            custom={i}
            transition={{ delay: delay + i * 0.08 }}
            {...animateProps}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
