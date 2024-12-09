

const flowbite = require("flowbite-react/tailwind")


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {

      colors:{

        BackgroundLight:"#F8FAFC",
        PrimaryLight:"#E11D48",
        SecondaryLight:"#1E40AF",
        AccentLight:"#9333EA",
        textLight:"#0F172A",

        BackgroundDark:"#0F172A ",
        PrimaryDark:"#1E293B",
        SecondaryDark:"#334155",
        AccentDark:"#E11D48",
        textDark:"#F8FAFC"

      },

      fontFamily:{
        logo:["Rampart One", "sans-serif"],
        texting:["Poppins", "sans-serif"],
        title:["Roboto", "serif"]
      }

    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar')
  ],
}