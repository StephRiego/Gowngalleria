/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          white: '#FFFFFF',
          beige: '#FDFBF7',
          gold: '#D4AF37',
          black: '#111111',
          muted: '#71716A'
        }
      }
    },
  },
  plugins: [],
}