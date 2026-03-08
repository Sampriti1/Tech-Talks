/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
    'background': '#121212', // Dark background
    'surface': '#1e1e1e',    // Slightly lighter for cards
    'primary': '#3b82f6',    // Blue for primary actions
    'primary-hover': '#2563eb',
    'secondary': '#a855f7',  // A secondary accent
    'text-main': '#e5e7eb',  // Main text color
    'text-muted': '#9ca3af', // For secondary text
    'border': '#374151',     // For borders
  },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
