/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html", 
  "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'aboutFont': ["aboutFont", "serif"],
        'headerFont': ["headerFont", "sans-serif"],
        'headerFontBold': ["headerFontBold", "sans-serif"],
      },
      gridTemplateRows: {
        'auto': "auto / 1fr",
        'prints': "auto / repeat(3, 1fr)",
      },
      backgroundSize: {
        "50%": "50%",
        "16": "110rem"
      },
      backgroundImage: {
        'doodle': "url('/images/doodle.png')",
      },
      backgroundColor: {
        'blackOpaque': "rgba(0, 0, 0, 0.4)",
        'grayOpaque': "rgba(0, 0, 0, 0.2)",
        'redOpaque': "rgba(0, 0, 0, 0.2)"
      }
    },
  },
  plugins: [],
};
