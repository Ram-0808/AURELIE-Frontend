import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { collections } from "../../data/content";
import SplitText from "../ui/SplitText";

/**
 * A pinned section that translates a row of collection cards horizontally
 * as the user scrolls vertically — the site's signature moment.
 */
export default function CollectionsShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll progress with a spring so the horizontal glide
  // eases in/out instead of tracking every scroll delta 1:1 (kills jitter).
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Move the track from 0 to a negative X across the scroll span.
  const x = useTransform(smoothProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-ivory">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Section header */}
        <div className="container-luxe mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">The Collections</p>
            <h2 className="heading-display mt-4 text-5xl md:text-7xl">
              <SplitText text="Four worlds," />
              <br />
              <span className="italic text-champagne-dark">
                <SplitText text="one obsession." delay={0.15} />
              </span>
            </h2>
          </div>
          <p className="hidden max-w-xs pb-2 text-right font-sans text-xs uppercase tracking-wide2 text-charcoal-muted lg:block">
            Scroll to explore →
          </p>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="gpu flex gap-6 pl-6 md:gap-10 md:pl-16">
          {collections.map((c) => (
            <Link
              key={c.id}
              to={`/collections/${c.id}`}
              data-cursor="View"
              className="group relative h-[62vh] w-[78vw] flex-none overflow-hidden rounded-sm md:w-[42vw] lg:w-[34vw]"
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/10" />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <span className="font-sans text-[11px] uppercase tracking-luxe text-ivory/80">
                  {c.year}
                </span>
                <div>
                  <h3 className="font-display text-4xl text-ivory md:text-5xl">{c.name}</h3>
                  <p className="mt-2 max-w-xs font-serif text-lg italic text-ivory/80">
                    {c.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-champagne-light opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
