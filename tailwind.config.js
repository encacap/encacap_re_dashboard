/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      },
      width: {
        120: '30rem',
        layout: 'calc(100% - 18rem)',
      },
      padding: {
        7.5: '1.875rem',
      },
      height: {
        layout: 'calc(100vh - 5rem)',
        18: '4.5rem',
      },
      minHeight: {
        layout: 'calc(100vh - 5rem)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
