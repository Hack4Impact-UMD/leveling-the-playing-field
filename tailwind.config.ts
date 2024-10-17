import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom': '50px', 
        'mini': '25px'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'teal': {
          DEFAULT: '#14676B',
          light: '#70A8AB',
          dark: '#0E4F54'
        },
        'orange': {
          DEFAULT: '#FF753B',
          light: '#FFAD8B'
        },
        'green': {
          DEFAULT: '#42C648',
          light: '#B0E9B3'
        },
        'white': {
          DEFAULT: '#FFFFFF',
          dark: '#D9D9D9'
        }
      },
    },
  },
  plugins: [],
};
export default config;
