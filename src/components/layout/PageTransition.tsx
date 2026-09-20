import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { luxeEase } from "../../lib/motion";

/** Wraps each route in a soft fade so navigation feels considered. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: luxeEase }}
    >
      {children}
    </motion.main>
  );
}
