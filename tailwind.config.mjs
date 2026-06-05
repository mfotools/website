/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // MyFINANCE Online brand tokens — sampled from the firm logo.
        // navy.* = deep blue family for dark sections; sky = the logo blue;
        // accent = the logo orange. Re-theme the whole site from here.
        navy: {
          DEFAULT: '#0f4c81', // primary deep blue (headings, dark buttons)
          deep: '#0a3a63', // deepest blue (hero / footer backgrounds)
          soft: '#1763a0', // lighter blue
        },
        sky: {
          DEFAULT: '#2485c7', // exact logo blue (links / accents)
          soft: '#e7f1fa',
        },
        accent: {
          DEFAULT: '#f5881f', // exact logo orange
          bright: '#ff9b33', // hover/brighter orange
          soft: '#fdeede', // pale orange tint (badges, soft fills)
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
};
