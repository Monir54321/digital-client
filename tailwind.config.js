/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("print", "@media print"); // Adding the print variant
    },

    require("daisyui"),
  ],
  daisyui: {
    themes: ["light"],
  },
};
