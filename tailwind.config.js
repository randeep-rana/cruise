const { fontFamily, fontSize } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "styles/**/*.{css,scss}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      yellow: {
        500: '#F0B100',
      },
      seat: {
        available: {
          light: "#D1FADF",
          dark: "#027A48",
        },
        limited: {
          light: "#FEF9C3",
          dark: "#CA8A04",
        },
        low: {
          light: "#FDE68A",
          dark: "#CA8A04",
        },
        waitlist: {
          light: "#FEE2E2",
          dark: "#DC2626",
        },
        unavailable: {
          light: "#E5E7EB",
          dark: "#6B7280",
        },
      },
      accent: {
        600: "#E86161",
      },
      brand: {
        500: "#004D5B",
        600: "#00A7C5",
      },
      primary: {
        DEFAULT: "#235daf",
        80: "#b3c5ff",
        40: "#e3e5f3",
        100: "#DAE2FF",
      },
      primaryLakshadweep: {
        DEFAULT: "#00A7C5",
        600: "#00A7C5",
        700: "#00839A",
        900: "#004D5B",
      },
      secondary: "#3b5ba9",
      teal: {
        900: "#004D5B",
      },
      tertiary: {
        DEFAULT: "#016b56",
        80: "#b3e5d9",
        40: "#e3f6f0",
        600: "#004c3f",
      },
      neutral: {
        50: "#E6EAED",
        400: "#33596D",
      },
      writing: "#262835",
      slateGrey: {
        DEFAULT: "#DAE2FF",
        80: "#45464F",
      },
      error: {
        DEFAULT: "#ba1a1a",
        80: "#ffdad6",
        600: "#690005",
      },
      alert: "#9e0d1e",
      dark: "#1b1b1F",
      gray: colors.gray,
      slate: colors.slate,
      orange: "#FFB77A",
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      fontSize: {
        xxs: "10px",
        ...fontSize,
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        wobble: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-2.5px)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wobble: "wobble 2s ease",
        "wobble-infinite": "wobble 2s ease infinite",
        bounce: "bounce 1s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
