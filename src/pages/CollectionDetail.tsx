import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { collections, products } from "../data/content";
import ProductCard from "../components/ui/ProductCard";
import SplitText from "../components/ui/SplitText";
import Reveal from "../components/ui/Reveal";
import PageTransition from "../components/layout/PageTransition";
import { luxeEase } from "../lib/motion";

export default function CollectionDetail() {
  const { id } = useParams();
  const collection = collections.find((c) => c.id === id);

  if (!collection) {
    return (
      <PageTransition>
        <div className="container-luxe flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="heading-display text-5xl">Collection not found</h1>
          <Link to="/collections" className="mt-6 link-underline font-sans text-[11px] uppercase tracking-wide2">
            Browse all jewellery
          </Link>
        </div>
      </PageTransition>
    );
  }

  const pieces = products.filter((p) => p.collection === collection.name);
  const shown = pieces.length ? pieces : products.slice(0, 3);

  return (
    <PageTransition>
      {/* Cinematic collection hero */}
      <section className="relative flex h-[80vh] items-end overflow-hidden bg-charcoal">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: luxeEase }}
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <div className="container-luxe relative pb-16 text-ivory">
          <p className="eyebrow text-champagne-light">Collection {collection.year}</p>
          <h1 className="heading-display mt-4 text-6xl text-ivory md:text-9xl">
            <SplitText text={collection.name} animateOnMount />
          </h1>
          <p className="mt-4 font-serif text-2xl italic text-ivory/85">{collection.tagline}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-luxe grid gap-10 md:grid-cols-[0.4fr_0.6fr]">
          <Reveal>
            <p className="eyebrow">The Story</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl font-serif text-2xl leading-relaxed text-charcoal-soft md:text-3xl">
              {collection.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pieces */}
      <section className="bg-ivory pb-28">
        <div className="container-luxe">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="heading-display text-4xl md:text-5xl">The pieces</h2>
            <Link to="/collections" className="link-underline font-sans text-[11px] uppercase tracking-wide2">
              View all jewellery
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {shown.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
