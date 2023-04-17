module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#83e05e",

          secondary: "#089173",

          accent: "#5c34aa",

          neutral: "#251726",

          "base-100": "#F0F2F4",

          info: "#ABB8E7",

          success: "#25D069",

          warning: "#A25C10",

          error: "#DD4E31",
        },
      },
    ],
  },
  theme: {
    extend: {
      gridTemplateRows: {
        dashboard: "repeat(3, 28vh)",
        "bigger-dashboard": "repeat(3, 35vh)",
      },
    },
  },
  plugins: [require("daisyui")],
};
