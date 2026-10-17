/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FBFAF6",
          100: "#F1F4EE",
          200: "#E1E9E0",
          300: "#C7D5C7",
          400: "#9EB79F",
          500: "#78977C",
          600: "#5D7D62",
          700: "#47654C",
          800: "#354F3A",
          900: "#273B2D",
          950: "#1C2C21",
        },
        accent: {
          50: "#FBF7EF",
          100: "#F3E7D1",
          200: "#EAD5B2",
          300: "#DCBC89",
          400: "#996B34",
          500: "#C69254",
          600: "#B07C43",
          700: "#80562F",
          800: "#634127",
          900: "#46301F",
          950: "#302218",
        },
      },
    },
  },
  plugins: [],
};
