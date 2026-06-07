/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        serif: ['"New York"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0071e3',
          hover: '#0077ed',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
