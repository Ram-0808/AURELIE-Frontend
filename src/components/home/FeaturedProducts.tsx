import { Link } from "react-router-dom";
import { products } from "../../data/content";
import ProductCard from "../ui/ProductCard";
import Reveal from "../ui/Reveal";
import SplitText from "../ui/SplitText";

export default function FeaturedProducts() {
  const featured = products.slice(0, 3);
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="container-luxe">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <Reveal>
              <p className="eyebrow">Chosen for you</p>
            </Reveal>
            <h2 className="heading-display mt-4 text-5xl md:text-7xl">
              <SplitText text="The icons" />
            </h2>
          </div>
          <Link
            to="/collections"
            data-cursor="View"
            className="link-underline hidden font-sans text-[11px] uppercase tracking-wide2 text-charcoal md:inline-block"
          >
            View all jewellery
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
