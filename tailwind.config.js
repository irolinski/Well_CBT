/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./app/(tabs)/Tools.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
