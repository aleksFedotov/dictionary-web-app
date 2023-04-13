/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        current: '#838383',
        black: {
          400: '#050505',
          300: '#1F1F1F',
          200: '#2D2D2D',
          100: '#3A3A3A',
        },
        white: {
          400: '#757575',
          300: '#E9E9E9',
          200: '#F4F4F4',
          100: '#FFFFFF',
        },
        purple: '#A445ED',
        orange: '#FF5252',
        grey: '#979797',
        'purple-normal': 'rgba(164, 69, 237 ,0.25)',
      },
      fontSize: {
        '6.5xl': '4rem',
      },
      boxShadow: {
        'select-light': '0 5px 30px 0 rgba(0, 0, 0, 0.1)',
        'select-dark': '0 5px 30px 0 rgba(164, 69, 237, 1)',
      },
      spacing: {
        4.5: '1.125rem',
        13: '3.25rem',
      },
      animation: {
        'select-light': 'toggleLight 0.25s ease-out',
        'select-dark': 'toggleDark 0.25s ease-out',
        spin: '0.75s linear 0s infinite normal none running rotate',
      },
      keyframes: {
        toggleLight: {
          '0%': { transform: 'translateX(20px)', width: '14px' },
          '80%': { width: '20px' },
          '100%': { transform: 'translateX(0)', width: '14px' },
        },
        toggleDark: {
          '0%': { transform: 'translateX(0)', width: '14px' },
          '20%': { width: '20px' },
          '100%': { transform: 'translateX(20px)', width: '14px' },
        },
        rotate: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
