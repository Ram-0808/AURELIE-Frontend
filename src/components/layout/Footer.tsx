import { Link } from "react-router-dom";
import SplitText from "../ui/SplitText";
import MagneticButton from "../ui/MagneticButton";

const columns = [
  {
    title: "Maison",
    links: ["The House", "Our Craft", "Sustainability", "Careers"],
  },
  {
    title: "Discover",
    links: ["Collections", "New Arrivals", "Bridal", "Gifting"],
  },
  {
    title: "Client Care",
    links: ["Book Appointment", "Contact", "Shipping & Returns", "Care Guide"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      {/* Newsletter / invitation band */}
      <div className="container-luxe border-b border-ivory/10 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow text-champagne-light">Stay Close</p>
            <h2 className="heading-display mt-5 text-4xl text-ivory md:text-6xl">
              <SplitText text="Join the private list." />
            </h2>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-ivory/60">
              Early access to new collections, atelier stories and invitations to
              private viewings. No noise — only what matters.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full items-center gap-4 border-b border-ivory/25 pb-4"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full bg-transparent font-sans text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap font-sans text-[11px] uppercase tracking-wide2 text-champagne-light transition-colors hover:text-ivory"
              data-cursor="Send"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link to="/" className="font-display text-3xl tracking-[0.4em] text-ivory">
            AURÉLIE
          </Link>
          <p className="mt-6 max-w-xs font-serif text-lg leading-snug text-ivory/60">
            Fine jewellery, crafted for the moments that outlive us.
          </p>
          <div className="mt-8">
            <MagneticButton
              to="/contact"
              cursorLabel="Book"
              className="inline-flex items-center gap-3 rounded-full border border-ivory/25 px-6 py-3 font-sans text-[11px] uppercase tracking-wide2 text-ivory transition-colors hover:border-champagne-light hover:text-champagne-light"
            >
              Book an appointment
            </MagneticButton>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-[11px] uppercase tracking-wide2 text-champagne-light">
              {col.title}
            </h3>
            <ul className="mt-6 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    to="/contact"
                    className="link-underline font-sans text-sm text-ivory/60 transition-colors hover:text-ivory"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="font-sans text-[11px] tracking-wide2 text-ivory/40">
            © {new Date().getFullYear()} AURÉLIE Maison. A demo experience.
          </p>
          <div className="flex gap-6 font-sans text-[11px] uppercase tracking-wide2 text-ivory/40">
            <a href="#" className="transition-colors hover:text-ivory">Privacy</a>
            <a href="#" className="transition-colors hover:text-ivory">Terms</a>
            <a href="#" className="transition-colors hover:text-ivory">Cookies</a>
          </div>
        </div>
      </div>

      {/* Oversized watermark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-1/4 text-center font-display text-[22vw] leading-none text-ivory/[0.03]">
          AURÉLIE
        </p>
      </div>
    </footer>
  );
}
