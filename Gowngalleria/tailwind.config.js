/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gg: {
          beige: '#F8F5F2',
          cream: '#FFFFFF',
          gold: '#D4AF37',
          lavender: '#C8B6FF',
          gray: '#6B6B6B',
          charcoal: '#3D3D3D',
        },
        luxury: {
          white: '#FFFFFF',
          beige: '#F8F5F2',
          gold: '#D4AF37',
          lavender: '#C8B6FF',
          brown: {
            light: '#8B7762',
            DEFAULT: '#5C4A38',
            dark: '#453528',
          },
          black: '#111111',
          muted: '#6B6B6B',
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(61, 45, 31, 0.08)',
        soft: '0 4px 20px rgba(200, 182, 255, 0.15)',
        gold: '0 8px 24px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
};
