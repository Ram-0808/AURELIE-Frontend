import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/content";
import { formatPrice } from "../components/ui/ProductCard";
import ProductCard from "../components/ui/ProductCard";
import SplitText from "../components/ui/SplitText";
import MagneticButton from "../components/ui/MagneticButton";
import Reveal from "../components/ui/Reveal";
import PageTransition from "../components/layout/PageTransition";
import { luxeEase } from "../lib/motion";

const details = [
  { label: "Metal", key: "metal" as const },
  { label: "Stone", key: "stone" as const },
  { label: "Collection", key: "collection" as const },
];

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <PageTransition>
        <div className="container-luxe flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="heading-display text-5xl">Piece not found</h1>
          <Link to="/collections" className="mt-6 link-underline font-sans text-[11px] uppercase tracking-wide2">
            Return to jewellery
          </Link>
        </div>
      </PageTransition>
    );
  }

  const gallery = [product.image, product.hoverImage];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 3);
  const suggestions = related.length ? related : fallback;

  return (
    <PageTransition>
      <div className="bg-ivory pb-24 pt-28 md:pt-32">
        <div className="container-luxe">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-charcoal-muted">
            <Link to="/" className="hover:text-charcoal">Home</Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-charcoal">Jewellery</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* Gallery */}
            <div className="flex flex-col-reverse gap-4 md:flex-row">
              <div className="flex gap-4 md:flex-col">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative h-20 w-16 overflow-hidden rounded-sm md:h-24 md:w-20 ${
                      activeImg === i ? "ring-1 ring-champagne-dark" : "opacity-60"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: luxeEase }}
                className="relative aspect-[4/5] flex-1 overflow-hidden rounded-sm bg-blush"
                data-cursor="Zoom"
              >
                <img src={gallery[activeImg]} alt={product.name} className="h-full w-full object-cover" />
              </motion.div>
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow">{product.collection} Collection</p>
              <h1 className="heading-display mt-4 text-4xl md:text-6xl">
                <SplitText text={product.name} animateOnMount />
              </h1>
              <p className="mt-6 font-serif text-2xl text-charcoal">{formatPrice(product.price)}</p>

              <Reveal delay={0.1}>
                <p className="mt-8 font-serif text-xl leading-relaxed text-charcoal-soft">
                  {product.description}
                </p>
              </Reveal>

              <dl className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
                {details.map((d) => (
                  <div key={d.label} className="flex items-center justify-between py-4">
                    <dt className="font-sans text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                      {d.label}
                    </dt>
                    <dd className="font-serif text-lg text-charcoal">{product[d.key]}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  cursorLabel="Add"
                  strength={0.2}
                  className="flex-1 rounded-full bg-charcoal px-8 py-4 text-center font-sans text-[11px] uppercase tracking-wide2 text-ivory transition-colors hover:bg-champagne-dark"
                >
                  Add to bag
                </MagneticButton>
                <MagneticButton
                  to="/contact"
                  cursorLabel="Book"
                  strength={0.2}
                  className="flex-1 rounded-full border border-charcoal px-8 py-4 text-center font-sans text-[11px] uppercase tracking-wide2 text-charcoal transition-colors hover:border-champagne-dark hover:text-champagne-dark"
                >
                  Book a viewing
                </MagneticButton>
              </div>

              <p className="mt-8 flex items-center gap-3 font-sans text-xs text-charcoal-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" strokeLinejoin="round" />
                </svg>
                Lifetime craftsmanship guarantee · Complimentary insured shipping
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {suggestions.length > 0 && (
          <div className="container-luxe mt-28">
            <h2 className="heading-display mb-12 text-4xl md:text-5xl">You may also love</h2>
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {suggestions.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
