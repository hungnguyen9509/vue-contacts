/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tw-elements/dist/plugin"),
  ],
};
