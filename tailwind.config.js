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
      'yellow': '#FFB400',
      'green': '#52B788',
      'hover-green': '#4EB283',
      'light-blue': '#219EBC',
      'dark-blue': '#073F5A',
      'gray': '#969696',
      'light': '#C2C2C2',
      'extralight': '#F3F3F3',
      'dark': '#222222',
      'white': '#FFFFFF'
    },
    extend: {
      width: {
        '528': '33rem',
      },
      transitionProperty: {
        'height': 'height'
      },
      fontFamily:{
        'body':['"Poppins"']
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1.05)'  },
          '25%': { transform: 'scale(1.04)'  },
          '50%': { transform: 'scale(1.03)'  },
          '75%': { transform: 'scale(1.04)'  },
          '100%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
