/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        white: '#ffffff',         // Primary
        'blue-gray': '#34495e',   // Secondary
        'light-blue-gray': '#95a5a6', // Accent
        gray: {
          200: '#ecf0f1',         // Background
          900: '#2c3e50',         // Text
        },
      }
    },
  },
  plugins: [],
}

