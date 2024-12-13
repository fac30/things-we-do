import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "twd-background": "#1B192E",
        "twd-primary-purple": "#893FFC",
        "twd-secondary-purple": "#3C246C",
        "twd-navbar-background": "#31284C",
        "twd-graph-background": "#262538",
        "twd-text-link": "#5FDDF9",
        "twd-cube-red": "#CC1111",
        "twd-cube-yellow": "#FFAA22",
        "twd-cube-blue": "#4488EE",
        "twd-cube-green": "#99CC11",
      },
      boxShadow: {
        glow: "0px 0px 15px 0px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
