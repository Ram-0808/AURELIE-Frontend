import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { heroSlides } from "../../data/content";
import { luxeEase } from "../../lib/motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image drifts up slower than scroll, content fades.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.42, 0.72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const slide = heroSlides[0];

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      {/* Ken-Burns background */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 h-[115%]">
        <img
          src={slide.image}
          alt="AURÉLIE Lumière collection"
          className="h-full w-full animate-kenburns object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Cinematic gradient overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-luxe relative flex h-full flex-col justify-end pb-24 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: luxeEase, delay: 0.4 }}
          className="eyebrow text-champagne-light"
        >
          {slide.kicker}
        </motion.p>

        <h1 className="heading-display mt-4 text-ivory">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: luxeEase, delay: 0.5 }}
              className="block text-[18vw] leading-[0.82] md:text-[13vw] lg:text-[11rem]"
            >
              {slide.line1}
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="max-w-md font-serif text-xl leading-snug text-ivory/85"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: luxeEase, delay: 1.1 }}
          >
            <Link
              to={slide.to}
              data-cursor="Explore"
              className="group inline-flex items-center gap-4"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:border-champagne-light group-hover:bg-champagne-light">
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.2"
                  className="text-ivory transition-colors duration-500 group-hover:text-charcoal"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wide2 text-ivory">
                Discover the collection
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-sans text-[9px] uppercase tracking-luxe text-ivory/60">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-champagne-light"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
