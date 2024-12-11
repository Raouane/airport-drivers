/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'taxi-dark': '#1A1A1A',     // noir foncé
        'taxi-gray': '#2A2A2A',     // noir plus clair
        'taxi-yellow': '#FFC107',   // jaune foncé
        'taxi-light': '#FFE082',    // jaune clair
      }
    },
  },
  plugins: [],
}
