/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBlue: '#14213D',
        lightGray: '#E5E5E5',
        white: '#FFFFFF',
        yellow: '#FCA311',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Raleway', 'sans-serif'],
        bangers: ['Bangers', 'cursive'],
      },
    },
  },
  plugins: [],
}
