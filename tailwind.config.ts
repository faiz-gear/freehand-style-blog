import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      animation: {
        "loading-bar": "loadingBar 1s ease-in-out infinite",
      },
      keyframes: {
        loadingBar: {
          "0%": { width: "0%", marginLeft: "0%" },
          "50%": { width: "50%", marginLeft: "25%" },
          "100%": { width: "0%", marginLeft: "100%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
