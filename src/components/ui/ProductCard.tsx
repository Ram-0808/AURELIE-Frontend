import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../../data/content";
import { fadeUp, viewportOnce } from "../../lib/motion";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay: (index % 3) * 0.08 }}
    >
      <Link to={`/product/${product.id}`} data-cursor="View" className="group flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-blush">
          {/* base image */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-luxe group-hover:opacity-0"
          />
          {/* hover image */}
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-luxe group-hover:scale-100 group-hover:opacity-100"
          />
          <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 font-sans text-[9px] uppercase tracking-wide2 text-charcoal backdrop-blur">
            {product.collection}
          </span>
        </div>
        <div className="mt-5">
          <h3 className="font-display text-xl transition-colors duration-500 group-hover:text-champagne-dark">
            {product.name}
          </h3>
          <p className="mt-1 font-sans text-xs tracking-wide2 text-charcoal-muted">
            {product.metal}
          </p>
          <p className="mt-3 font-sans text-sm text-charcoal">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export { formatPrice };
