/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgrounds: {
        'background': '#252525',
        'backgroundButtonYellow': '#FFB400',
        'backgroundInput': '#C2C2C2',
        'backgroundContent': '#222222',
      },
      fontFamily:{
        'body':['"Poppins"']
      }
    },
  },
  plugins: [],
}
