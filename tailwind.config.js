/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{ts,tsx}"],  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
  extend: {
    colors: {
      utd: {
        red:   '#DA291C',
        gold:  '#FBE122',
        black: '#1A1A1A',
        white: '#FFFFFF',
      }
    }
  }
   
}, fontFamily: {
        foundation: ['Inter', 'ui-sans-serif', 'system-ui'],
      }, 

}

