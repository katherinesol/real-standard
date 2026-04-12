export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        green: {
          50: '#edf4ed',
          100: '#d6ebd6',
          200: '#aed6ae',
          300: '#80bf80',
          400: '#52a852',
          500: '#2e8b2e',
          600: '#1a5c1a',
          700: '#134813',
          800: '#0d320d',
          900: '#071c07',
        },
        yellow: {
          50: '#fdf8ed',
          100: '#faeece',
          200: '#f4d98e',
          500: '#b8860b',
          600: '#7a5412',
          700: '#5c3e0d',
        },
        red: {
          50: '#fdf0f0',
          100: '#fadddd',
          200: '#f4b0b0',
          500: '#c0392b',
          600: '#7a1a1a',
          700: '#5c1414',
        },
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '4px',
        xl: '6px',
        '2xl': '8px',
        full: '9999px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '3': '3px',
      },
    },
  },
  plugins: [],