import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "../components/ui/SplitText";
import MagneticButton from "../components/ui/MagneticButton";
import PageTransition from "../components/layout/PageTransition";
import { luxeEase } from "../lib/motion";

const interests = ["Bridal", "Rings", "Necklaces", "Bespoke", "Just browsing"];

function Field({
  label,
  type = "text",
  name,
  required,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="group block">
      <span className="font-sans text-[11px] uppercase tracking-wide2 text-charcoal-muted">
        {label}
        {required && <span className="text-champagne-dark"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-3 w-full border-b border-charcoal/20 bg-transparent pb-3 font-serif text-lg text-charcoal transition-colors focus:border-champagne-dark focus:outline-none"
      />
    </label>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState<string>("Bridal");

  return (
    <PageTransition>
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left: editorial image panel */}
        <div className="relative hidden overflow-hidden bg-charcoal lg:block">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: luxeEase }}
            src="https://images.unsplash.com/photo-1633934542430-0905ccb5f050?auto=format&fit=crop&w=1400&q=80"
            alt="Private appointment at AURÉLIE"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <div className="absolute bottom-0 p-14 text-ivory">
            <p className="eyebrow text-champagne-light">Private Appointments</p>
            <h2 className="heading-display mt-5 text-5xl text-ivory">
              A room, a glass of<br />champagne, and time.
            </h2>
            <p className="mt-5 max-w-sm font-serif text-lg text-ivory/70">
              Meet with an advisor in one of our salons, or virtually. No pressure —
              only the pleasure of choosing well.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex items-center bg-ivory px-6 pb-20 pt-32 md:px-16 lg:pt-32">
          <div className="mx-auto w-full max-w-lg">
            <p className="eyebrow">Book an appointment</p>
            <h1 className="heading-display mt-4 text-5xl md:text-6xl">
              <SplitText text="Let's begin." animateOnMount />
            </h1>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16 rounded-sm border border-champagne/40 bg-blush p-10 text-center"
                >
                  <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-champagne text-ivory">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="font-display text-3xl">Thank you</h2>
                  <p className="mt-3 font-serif text-lg text-charcoal-soft">
                    Your request is with our advisors. We'll be in touch within one
                    business day to confirm your appointment.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 link-underline font-sans text-[11px] uppercase tracking-wide2"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-12 space-y-9"
                >
                  <div className="grid gap-9 sm:grid-cols-2">
                    <Field label="First name" name="firstName" required />
                    <Field label="Last name" name="lastName" required />
                  </div>
                  <Field label="Email" type="email" name="email" required />
                  <Field label="Phone" type="tel" name="phone" />

                  <div>
                    <span className="font-sans text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                      I'm interested in
                    </span>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {interests.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInterest(opt)}
                          className={`rounded-full border px-5 py-2 font-sans text-[11px] uppercase tracking-wide2 transition-colors duration-300 ${
                            interest === opt
                              ? "border-charcoal bg-charcoal text-ivory"
                              : "border-charcoal/20 text-charcoal-muted hover:border-charcoal"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="font-sans text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                      A little about what you're looking for
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      className="mt-3 w-full resize-none border-b border-charcoal/20 bg-transparent pb-3 font-serif text-lg text-charcoal transition-colors focus:border-champagne-dark focus:outline-none"
                    />
                  </label>

                  <MagneticButton
                    cursorLabel="Send"
                    strength={0.15}
                    className="w-full rounded-full bg-charcoal px-8 py-4 text-center font-sans text-[11px] uppercase tracking-wide2 text-ivory transition-colors hover:bg-champagne-dark"
                  >
                    Request appointment
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
