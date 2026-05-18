/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        luxury: {
          white: '#FFFFFF',
          beige: '#FDFBF7',
          brown: {
            light: '#8B7762',
            DEFAULT: '#5C4A38',
            dark: '#453528',
          },
          black: '#111111',
          muted: '#71716A',
        },
      },
    },
  },
  plugins: [],
};
