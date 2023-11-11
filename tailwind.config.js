/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--netflix-primary-color)',
          muted: 'var(--netflix-primary-color)',
          inverted: 'var(--netflix-primary-color)',
        }
      },
      backgroundColor: {
        skin: {
          fill: 'var(--netflix-dark-color)',
          'red-background': 'var(--netflix-primary-color)',

        }
      }
    },
  },
  plugins: [],
}

