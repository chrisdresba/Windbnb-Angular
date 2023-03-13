/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    fontSize: {
      'ssm': ['10px', {
        letterSpacing: '-0.01em',
        fontWeight: '400',
      }],
      
},
  },
  plugins: [],
}
