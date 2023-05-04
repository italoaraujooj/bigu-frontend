/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'default': '#252525',
      'primary': '#FFB400',
      'green': '#52B788',
      'light-blue': '#219EBC',
      'dark-blue': '#073F5A',
      'light': '#C2C2C2',
      'dark': '#222222',
      'white': '#FFFFFF'
    },
    extend: {
      width: {
        '512': '32rem',
      },
      transitionProperty: {
        'height': 'height'
      },
      fontFamily:{
        'body':['"Poppins"']
      }
    },
  },
  plugins: [],
}
