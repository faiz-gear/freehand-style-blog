import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

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
      typography: {
        DEFAULT: {
          css: {
            img: {
              maxWidth: "100%",
              height: "auto",
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            figure: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            "figure img": {
              marginTop: "0",
              marginBottom: "0",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
