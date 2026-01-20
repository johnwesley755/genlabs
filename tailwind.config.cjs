/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        genMain: "#F5F5F5", // Light Gray/White Background
        genText: "#0A0A0A", // Almost Black Text
        genGreen: "#D9FF00", // Brighter Green for Light Mode
        genBlack: "#0A0A0A", // Keep for legacy refs if needed, or map to genText
        genWhite: "#F5F5F5", // Keep for legacy refs
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
