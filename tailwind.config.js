/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#FF8A65', // playful orange
          DEFAULT: '#FF5722',
          dark: '#E64A19',
        },
        secondary: {
          light: '#4FC3F7', // sky blue
          DEFAULT: '#03A9F4',
          dark: '#0288D1',
        },
        success: '#81C784', // friendly green
        danger: '#E57373', // soft red
        warning: '#FFF176', // soft yellow
      }
    },
  },
  plugins: [],
}
