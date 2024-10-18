import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        transparent: 'transparent',
        milk: '#fff',

        perfReview: {
          DEFAULT: '#8b5cf6',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        selfReview: {
          DEFAULT: '#14b8a6',
          500: '#14b8a6',
          600: '#0d9488',
        },

        elephant: {
          DEFAULT: '#12344d',
          900: '#12344d',
          800: '#264966',
          700: '#345C7C',
          600: '#447093',
          500: '#415D71',
          400: '#576C7D',
          300: '#C0CEEE',
          200: '#A2C0DE',
          100: '#BEDBF5',
          50: '#dff0ff',
        },
        smoke: {
          DEFAULT: '#ebeff3',
          900: '#27313a',
          800: '#384551',
          700: '#475867',
          500: '#647A8E',
          600: '#576C7D',
          400: '#7B8E9F',
          300: '#92A2B1',
          200: '#97a4af',
          100: '#cfd7df',
          75: '#313D48',
          50: '#ebeff3',
          25: '#f5f7f9',
        },
        jungle: {
          DEFAULT: '#00a886',
          900: '#005C3F',
          800: '#00795b',
          700: '#008969',
          600: '#009A79',
          500: '#00a886',
          400: '#1CB697',
          300: '#4DC4AA',
          200: '#82D5C2',
          100: '#b4e5da',
          50: '#e0f5f1',
        },
        azure: {
          DEFAULT: '#2c5cc5',
          900: '#283DA5',
          800: '#2c5cc5',
          700: '#2e6ed8',
          600: '#2F80EB',
          500: '#2E8EFA',
          400: '#459FFC',
          300: '#64B0FC',
          200: '#90C6FE',
          100: '#bbdcfe',
          50: '#e5f2fd',
        },
        casablanca: {
          DEFAULT: '#e86f25',
          900: '#D7461F',
          800: '#E16023',
          700: '#e86f25',
          600: '#EF7E27',
          500: '#F48928',
          400: '#F69A3C',
          300: '#f8ab59',
          200: '#FAC386',
          100: '#fedcb3',
          50: '#fef1e1',
        },
        persimmon: {
          DEFAULT: '#e43538',
          900: '#C82124',
          800: '#d72d30',
          700: '#e43538',
          600: '#F73F3E',
          500: '#FF473E',
          400: '#FF5959',
          300: '#F2797B',
          200: '#F89FA1',
          100: '#ffd0d6',
          50: '#ffecf0',
        },
      },
      keyframes: {
        'flash-message-entry': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.absolute-center': {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
      });
    }),
  ],
};
