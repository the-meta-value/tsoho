/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lang-purple': '#6B46C1',
        'neural-blue': '#3B82F6',
        'memory-gold': '#F59E0B',
      },
    },
  },
  plugins: [],
}