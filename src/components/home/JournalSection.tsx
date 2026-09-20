import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { journal } from "../../data/content";
import { imageReveal, viewportOnce } from "../../lib/motion";
import Reveal from "../ui/Reveal";
import SplitText from "../ui/SplitText";

export default function JournalSection() {
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="container-luxe">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">The Journal</p>
            </Reveal>
            <h2 className="heading-display mt-4 text-5xl md:text-7xl">
              <SplitText text="Stories from" />
              <br />
              <span className="italic text-champagne-dark">
                <SplitText text="the House" delay={0.12} />
              </span>
            </h2>
          </div>
          <Link
            to="/about"
            data-cursor="View"
            className="link-underline hidden font-sans text-[11px] uppercase tracking-wide2 text-charcoal md:inline-block"
          >
            View all stories
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {journal.map((entry, i) => (
            <Link key={entry.id} to="/about" data-cursor="Read" className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <motion.div
                  variants={imageReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.1 }}
                  className="h-full w-full"
                >
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="h-full w-full object-cover transition-transform duration-[1.3s] ease-luxe group-hover:scale-105"
                  />
                </motion.div>
              </div>
              <Reveal delay={i * 0.05}>
                <p className="mt-6 eyebrow">{entry.kicker}</p>
                <h3 className="mt-3 font-display text-2xl leading-snug transition-colors duration-500 group-hover:text-champagne-dark md:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-3 font-serif text-lg leading-snug text-charcoal-muted">
                  {entry.excerpt}
                </p>
                <span className="mt-4 inline-block font-sans text-[11px] uppercase tracking-wide2 text-champagne-dark">
                  Read more
                </span>
              </Reveal>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
