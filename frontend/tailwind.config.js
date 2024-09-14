/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7848F4",
        navy_blue:"#10107B" // Add the custom color here
      },
      fontFamily: {
        sans: ['Product Sans', 'sans-serif'], // Adding Product Sans
      },
    },
  },
  plugins: [],
};
