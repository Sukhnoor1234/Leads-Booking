/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1C1B1A',
        cream: '#FAF7F2',
        forest: {
          DEFAULT: '#2F6F5E',
          dark: '#234F42',
        },
        amber: {
          DEFAULT: '#C98A3B',
          light: '#F0DDBE',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
