/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      'default': '#252525',
      'container': '#222222',
      'yellow': '#FFB400',
      'green': '#52B788',
      'hover-green': '#4EB283',
      'light-blue': '#219EBC',
      'dark-blue': '#073F5A',
      'gray': '#969696',
      'light': '#C2C2C2',
      'extralight': '#F3F3F3',
      'dark': '#222222',
      'white': '#FFFFFF',
      'placeholder': '#CCCCCC',
      'blackLine': '#474747',
      'light-yellow': '#FFB703',
      'orange': '#FB8500',
      'light-white': '#F6F6F6',
      'red': '#dd5035'
    },
    extend: {
      width: {
        '528': '33rem',
        '500': '99rem',
        '1136': '71', // 71rem
        '1120': '70rem'
      },
      transitionProperty: {
        'height': 'height'
      },
      fontFamily:{
        'family':['"Poppins"']
      },
      spacing: {
        '-110.5%': '-110.5%',
        '300%': '-221%',
        '-300%': '-300%',
        '-400%': '-400%'
      },
      lineHeight: {
        '80': '5rem',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1.05)'  },
          '25%': { transform: 'scale(1.04)'  },
          '50%': { transform: 'scale(1.03)'  },
          '75%': { transform: 'scale(1.04)'  },
          '100%': { transform: 'scale(1.05)' },
        },
        checkbox: {
          '0%': { transform: 'scale(1.2)'  },
          '25%': { transform: 'scale(1.05)'  },
          '50%': { transform: 'scale(1.10)'  },
          '75%': { transform: 'scale(1.15)'  },
          '100%': { transform: 'scale(1.2)' },
        }
        // toggle: {
        //   '0%': { transform: 'scale(1.05)'  },
        //   '50%': { transform: 'scale(1.10)'  },
        //   '100%': { transform: 'scale(1.25)'  },
        // }
      }
    },
  },
  plugins: [],
}
