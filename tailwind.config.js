/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm champagne-gold + ivory + soft charcoal luxury palette
        ivory: {
          DEFAULT: "#F7F3EC",
          50: "#FDFBF7",
          100: "#F7F3EC",
          200: "#EFE8DB",
        },
        champagne: {
          DEFAULT: "#C9A96A",
          light: "#E4CFA5",
          dark: "#A6884D",
          deep: "#8A6E38",
        },
        charcoal: {
          DEFAULT: "#211D18",
          soft: "#3A342C",
          muted: "#6B6459",
        },
        sand: "#E8DDCB",
        blush: "#EFE3D8",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.16em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1.5%, -1.5%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        kenburns: "kenburns 18s ease-out forwards",
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
