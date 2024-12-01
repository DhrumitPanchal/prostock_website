import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme_color: "#ff7403",
        text_color: "#44475b",
        text_lite_color: "#7c7e8c",
      },
      fontFamily: {
        Roboto: ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
