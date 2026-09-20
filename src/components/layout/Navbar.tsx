import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { luxeEase } from "../../lib/motion";

const NAV_LINKS = [
  { label: "Collections", to: "/collections" },
  { label: "Jewellery", to: "/collections" },
  { label: "The House", to: "/about" },
  { label: "Appointment", to: "/contact" },
];

function Logo({ light }: { light: boolean }) {
  return (
    <Link to="/" aria-label="AURÉLIE home" className="group flex flex-col items-center leading-none">
      <span
        className={`font-display text-2xl tracking-[0.42em] transition-colors duration-500 ${
          light ? "text-ivory" : "text-charcoal"
        }`}
      >
        AURÉLIE
      </span>
      <span
        className={`mt-1 font-sans text-[8px] uppercase tracking-luxe transition-colors duration-500 ${
          light ? "text-ivory/70" : "text-champagne-dark"
        }`}
      >
        Fine Jewellery
      </span>
    </Link>
  );
}

function IconButton({
  children,
  light,
  onClick,
  label,
}: {
  children: React.ReactNode;
  light: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-500 ${
        light ? "text-ivory hover:bg-ivory/10" : "text-charcoal hover:bg-charcoal/5"
      }`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // On the home page the hero is dark imagery, so the nav starts "light".
  const isHome = location.pathname === "/";
  const light = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed inset-x-0 top-0 z-50 bg-charcoal text-ivory">
        <div className="container-luxe flex h-9 items-center justify-center">
          <Link
            to="/contact"
            className="font-sans text-[10px] uppercase tracking-wide2 text-ivory/90 transition-colors hover:text-champagne-light"
          >
            Complimentary consultations · Book a private appointment
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`fixed inset-x-0 top-9 z-50 transition-all duration-700 ${
          light
            ? "bg-transparent"
            : "border-b border-charcoal/5 bg-ivory/85 backdrop-blur-md"
        }`}
      >
        <nav className="container-luxe grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: menu toggle + desktop links */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex items-center gap-3 ${light ? "text-ivory" : "text-charcoal"}`}
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="h-px w-6 bg-current" />
                <span className="h-px w-4 bg-current" />
              </span>
              <span className="hidden font-sans text-[11px] uppercase tracking-wide2 md:inline">
                Menu
              </span>
            </button>
          </div>

          {/* Center: logo */}
          <Logo light={light} />

          {/* Right: icons */}
          <div className="flex items-center justify-end gap-1">
            <IconButton light={light} label="Search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </IconButton>
            <IconButton light={light} label="Account">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" strokeLinecap="round" />
              </svg>
            </IconButton>
            <IconButton light={light} label="Wishlist">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.4 12 20 12 20Z" strokeLinejoin="round" />
              </svg>
            </IconButton>
          </div>
        </nav>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: luxeEase }}
            className="fixed inset-0 z-40 bg-ivory"
          >
            <div className="container-luxe flex h-full flex-col justify-center pt-28">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.label} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.7, ease: luxeEase, delay: 0.06 * i }}
                    >
                      <Link
                        to={link.to}
                        className="group flex items-baseline gap-6 py-2"
                        data-cursor="Open"
                      >
                        <span className="font-sans text-xs text-champagne-dark">
                          0{i + 1}
                        </span>
                        <span className="heading-display text-5xl transition-colors duration-500 group-hover:text-champagne-dark md:text-7xl">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <div className="mt-16 flex flex-wrap gap-x-10 gap-y-2 font-sans text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                <a href="#" className="link-underline">Instagram</a>
                <a href="#" className="link-underline">Pinterest</a>
                <a href="#" className="link-underline">Find a Boutique</a>
                <a href="#" className="link-underline">Client Care</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
