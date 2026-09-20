import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { products, categories } from "../data/content";
import ProductCard from "../components/ui/ProductCard";
import SplitText from "../components/ui/SplitText";
import PageTransition from "../components/layout/PageTransition";
import { luxeEase } from "../lib/motion";

const FILTERS = [{ id: "all", name: "All" }, ...categories.map((c) => ({ id: c.id, name: c.name }))];

export default function Collections() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("category") ?? "all";
  const [active, setActive] = useState(initial);

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  const selectFilter = (id: string) => {
    setActive(id);
    if (id === "all") setParams({});
    else setParams({ category: id });
  };

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-blush pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="container-luxe text-center">
          <p className="eyebrow">The Maison</p>
          <h1 className="heading-display mt-5 text-6xl md:text-8xl">
            <SplitText text="Jewellery" animateOnMount />
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic text-charcoal-soft">
            Every piece a small act of permanence. Filter by form, or lose
            yourself in the whole collection.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="container-luxe">
          <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => selectFilter(f.id)}
                className={`relative rounded-full px-6 py-2.5 font-sans text-[11px] uppercase tracking-wide2 transition-colors duration-500 ${
                  active === f.id
                    ? "text-ivory"
                    : "text-charcoal-muted hover:text-charcoal"
                }`}
              >
                {active === f.id && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-charcoal"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f.name}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: luxeEase }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-20 text-center font-serif text-2xl italic text-charcoal-muted">
              This category is being restocked.
            </p>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
