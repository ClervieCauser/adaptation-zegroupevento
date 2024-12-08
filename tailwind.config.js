/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        orange: '#ED9405',
        orangeClair: '#FFEFDF',
        fond: '#F9F7FA',
        blanc: '#FFFFFF',
        grisFonce: '#1C0D45',
        grisClair: '#D9D9D9'
      },
      fontFamily: {
        'jua': ['Jua', 'sans-serif'],
      }, 
    },
  },
  plugins: [],
}

