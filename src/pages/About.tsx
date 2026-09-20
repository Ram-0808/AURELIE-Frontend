import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { journal } from "../data/content";
import SplitText from "../components/ui/SplitText";
import Reveal from "../components/ui/Reveal";
import PageTransition from "../components/layout/PageTransition";
import { imageReveal, viewportOnce, luxeEase } from "../lib/motion";

const timeline = [
  { year: "1908", title: "A single bench", text: "Founded above a workshop in a narrow lane, with one jeweller and a belief that beauty is worth the wait." },
  { year: "1954", title: "The first Maison", text: "The house opens its doors to private clients — jewellery made to be lived in, not locked away." },
  { year: "1998", title: "A conscience", text: "AURÉLIE commits to fully traceable stones, long before the industry followed." },
  { year: "Today", title: "Quiet luxury", text: "Four collections, one atelier, and the same refusal to rush anything worth keeping." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(p, [0, 1], ["-12%", "12%"]);

  return (
    <PageTransition>
      {/* Hero statement */}
      <section className="bg-blush pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="container-luxe">
          <p className="eyebrow">The House</p>
          <h1 className="heading-display mt-6 max-w-5xl text-5xl md:text-8xl">
            <SplitText text="We make things" animateOnMount />
            <br />
            <span className="italic text-champagne-dark">
              <SplitText text="that outlive us." animateOnMount delay={0.2} />
            </span>
          </h1>
        </div>
      </section>

      {/* Parallax feature */}
      <section ref={ref} className="overflow-hidden bg-ivory py-24 md:py-32">
        <div className="container-luxe grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.img
              style={{ y }}
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80"
              alt="Craft at AURÉLIE"
              className="gpu absolute inset-0 h-[124%] w-full object-cover"
            />
          </div>
          <div>
            <Reveal><p className="eyebrow">Our belief</p></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-serif text-2xl leading-relaxed text-charcoal-soft md:text-3xl">
                Fashion moves fast. We move at the speed of the hand. A ring that
                takes six weeks to make should still feel right in sixty years —
                that is the only deadline we recognise.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-charcoal py-24 text-ivory md:py-32">
        <div className="container-luxe">
          <h2 className="heading-display mb-16 text-5xl text-ivory md:text-7xl">
            <SplitText text="A quiet century" />
          </h2>
          <div className="divide-y divide-ivory/10 border-y border-ivory/10">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxeEase } } }}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: i * 0.05 }}
                className="grid gap-4 py-10 md:grid-cols-[0.25fr_0.35fr_0.4fr] md:items-baseline"
              >
                <span className="font-display text-3xl text-champagne-light md:text-4xl">{t.year}</span>
                <h3 className="font-display text-2xl text-ivory">{t.title}</h3>
                <p className="font-serif text-lg text-ivory/60">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal echoes */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe">
          <h2 className="heading-display mb-14 text-4xl md:text-6xl">From the journal</h2>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {journal.map((entry, i) => (
              <div key={entry.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <motion.div
                    variants={imageReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    transition={{ delay: i * 0.1 }}
                    className="h-full w-full"
                  >
                    <img src={entry.image} alt={entry.title} className="h-full w-full object-cover transition-transform duration-[1.3s] ease-luxe group-hover:scale-105" />
                  </motion.div>
                </div>
                <p className="mt-6 eyebrow">{entry.kicker}</p>
                <h3 className="mt-3 font-display text-2xl">{entry.title}</h3>
                <p className="mt-3 font-serif text-lg text-charcoal-muted">{entry.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
