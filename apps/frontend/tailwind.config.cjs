module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#f9d2af",
          secondary: "#eb641e",
          accent: "#3f120b",
          neutral: "#251726",
          "base-100": "#F0F2F4",
          info: "#ABB8E7",
          success: "#25D069",
          warning: "#A25C10",
          error: "#DD4E31",
          
          rhulColours: {
            '50': '#fef6ee',
            '100': '#fdead7',
            '200': '#f9d2af',
            '300': '#f5b27c',
            '400': '#f08747',
            '500': '#eb641e',
            '600': '#dd4f19',
            '700': '#b73b17',
            '800': '#92301a',
            '900': '#762a18',
            '950': '#3f120b',
        },
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
