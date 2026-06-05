/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // MyFINANCE Online brand tokens — orange + blue.
        // Tweak these to match the exact firm brand and the whole site re-themes.
        navy: {
          DEFAULT: '#0f3a6b', // primary blue
          deep: '#0a2547', // deepest blue (hero / footer backgrounds)
          soft: '#1a4f8a', // lighter blue
        },
        accent: {
          DEFAULT: '#f47b20', // brand orange
          bright: '#ff8c34', // hover/brighter orange
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
