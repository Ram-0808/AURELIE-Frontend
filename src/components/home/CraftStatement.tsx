import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Reveal from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import MagneticButton from "../ui/MagneticButton";

const stats = [
  { value: "1908", label: "Maison founded" },
  { value: "11", label: "Hands per piece" },
  { value: "100%", label: "Traceable stones" },
];

export default function CraftStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const imgY = useTransform(p, [0, 1], ["-12%", "12%"]);

  return (
    <section className="overflow-hidden bg-blush py-24 md:py-36">
      <div className="container-luxe grid items-center gap-14 md:grid-cols-2 md:gap-20">
        {/* Text */}
        <div className="order-2 md:order-1">
          <Reveal>
            <p className="eyebrow">The Craft</p>
          </Reveal>
          <h2 className="heading-display mt-5 text-4xl md:text-6xl">
            <SplitText text="Made slowly," />
            <br />
            <span className="italic text-champagne-dark">
              <SplitText text="meant to last." delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md font-serif text-xl leading-relaxed text-charcoal-soft">
              Every AURÉLIE piece begins as a drawing and ends in the hands of a
              single master jeweller. Between those two moments lie weeks of
              patient work — setting, polishing, and the quiet refusal to rush
              anything worth keeping.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i}>
                <p className="font-display text-4xl text-charcoal md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-wide2 text-charcoal-muted">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <MagneticButton
                to="/about"
                cursorLabel="Read"
                className="inline-flex items-center gap-3 border-b border-charcoal pb-1 font-sans text-[11px] uppercase tracking-wide2 text-charcoal transition-colors hover:border-champagne-dark hover:text-champagne-dark"
              >
                Inside the atelier
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Parallax image */}
        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.img
              style={{ y: imgY }}
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80"
              alt="A jeweller at work in the AURÉLIE atelier"
              className="gpu absolute inset-0 h-[124%] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
