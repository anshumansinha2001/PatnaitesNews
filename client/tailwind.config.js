/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "250px", // Define your custom breakpoint value for xs
        sm: "381px",
      },
    },
  },
  plugins: [require("daisyui")],
};
