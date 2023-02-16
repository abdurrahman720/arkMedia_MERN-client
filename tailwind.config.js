/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        arkTheme: {
          bgColor: '#FDF8F1',
          secondary: '#FA4238',
        }
      }
    ]
  },
  theme: {
    fontFamily: {
      arkFont: ["arkFont", "sans-serif"]
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}