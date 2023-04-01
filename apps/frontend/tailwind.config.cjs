module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["synthwave"],
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}
