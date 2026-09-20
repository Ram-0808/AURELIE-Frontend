import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SplitText from "../ui/SplitText";
import MagneticButton from "../ui/MagneticButton";

export default function GiftingBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(p, [0, 1], ["-14%", "14%"]);

  return (
    <section ref={ref} className="relative flex h-[88vh] items-center justify-center overflow-hidden bg-charcoal text-ivory">
      <motion.img
        style={{ y }}
        src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=2000&q=80"
        alt="AURÉLIE gifting"
        className="gpu absolute inset-0 h-[128%] w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="container-luxe relative flex flex-col items-center text-center">
        <p className="eyebrow text-champagne-light">The Art of Giving</p>
        <h2 className="heading-display mt-6 max-w-3xl text-5xl text-ivory md:text-7xl">
          <SplitText text="A gift that keeps its meaning." />
        </h2>
        <p className="mt-6 max-w-xl font-serif text-xl italic text-ivory/80">
          From first anniversaries to quiet just-because moments — wrapped by
          hand, remembered for a lifetime.
        </p>
        <div className="mt-10">
          <MagneticButton
            to="/collections"
            cursorLabel="Explore"
            className="inline-flex items-center gap-3 rounded-full bg-ivory px-9 py-4 font-sans text-[11px] uppercase tracking-wide2 text-charcoal transition-colors hover:bg-champagne-light"
          >
            Explore gifting
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
