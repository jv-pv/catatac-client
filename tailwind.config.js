/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aboutFont: ["aboutFont", "serif"],
      },
      gridTemplateRows: {
        'auto': "auto / 1fr",
        'prints' : "auto / repeat(3, 1fr)"
      },
      backgroundImage: {
        'doodle': "url('/images/doodle.svg')"
      }
    },
  },
  plugins: [],
}