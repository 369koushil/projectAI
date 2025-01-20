/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        space:["Space Grotesk"] // Add Space Mono
      },
      colors:{
        orange:"#ff4438",
        yellow:"#dcff1e",
        darkblue:"#091a23",
        primary:"#163341",
        btnhover:"#091a23",
        profilecolor:"#0d1117",
        form:"#232c39",
        green:"#238636",
        box:"#2d4754"
      }
    },
  },
  plugins: [],
}