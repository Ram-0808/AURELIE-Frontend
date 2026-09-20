import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../../data/content";
import { imageReveal, viewportOnce } from "../../lib/motion";
import Reveal from "../ui/Reveal";
import SplitText from "../ui/SplitText";

export default function CategoryGrid() {
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="container-luxe">
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow">Explore</p>
          </Reveal>
          <h2 className="heading-display mt-4 text-5xl md:text-7xl">
            <SplitText text="Discover by category" />
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/collections?category=${cat.id}`}
              data-cursor="View"
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-blush">
                <motion.div
                  variants={imageReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.08 }}
                  className="h-full w-full"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-110"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/10" />
              </div>
              <div className="mt-5 flex items-baseline justify-between border-t border-charcoal/10 pt-4">
                <span className="font-display text-2xl transition-colors duration-500 group-hover:text-champagne-dark">
                  {cat.name}
                </span>
                <span className="font-sans text-[11px] tracking-wide2 text-charcoal-muted">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
