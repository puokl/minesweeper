/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
