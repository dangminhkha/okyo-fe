/** @type {import('tailwindcss').Config} */
import plugin from "preline/plugin";
import typography from "@tailwindcss/typography";
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [plugin, typography],
};
