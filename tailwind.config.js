/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,css}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-charcoal': '#1A1A1A',
        'brand-off-white': '#F7F7F5',
        'brand-white': '#FFFFFF',
        'brand-accent': '#000000',
        'brand-text-primary': '#000000',
        'brand-text-secondary': '#6B6B6B',
        'brand-text-muted': '#9A9A9A',
        'brand-divider': '#E5E5E5',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
