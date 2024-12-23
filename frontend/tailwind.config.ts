import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        cardBg: colors.zinc,

        transparent: 'transparent',
        milk: '#fff',

        pfShadowColor: {
          DEFAULT: '#a78bfa',
          400: '#a78bfa',
        },

        sfShadowColor: {
          DEFAULT: '#2dd4bf',
          400: '#2dd4bf',
        },

        perfReview: {
          DEFAULT: 'var(--perf-review-500)',
          50: 'var(--perf-review-50)',
          100: 'var(--perf-review-100)',
          200: 'var(--perf-review-200)',
          300: 'var(--perf-review-300)',
          400: 'var(--perf-review-400)',
          500: 'var(--perf-review-500)',
          600: 'var(--perf-review-600)',
          700: 'var(--perf-review-700)',
          800: 'var(--perf-review-800)',
          900: 'var(--perf-review-900)',
        },

        selfReview: {
          DEFAULT: 'var(--self-review-500)',
          50: 'var(--self-review-50)',
          100: 'var(--self-review-100)',
          200: 'var(--self-review-200)',
          300: 'var(--self-review-300)',
          400: 'var(--self-review-400)',
          500: 'var(--self-review-500)',
          600: 'var(--self-review-600)',
          700: 'var(--self-review-700)',
          800: 'var(--self-review-800)',
          900: 'var(--self-review-900)',
        },

        'conv-coach': {
          DEFAULT: 'var(--conversation-coach-500)',
          50: 'var(--conversation-coach-50)',
          100: 'var(--conversation-coach-100)',
          200: 'var(--conversation-coach-200)',
          300: 'var(--conversation-coach-300)',
          400: 'var(--conversation-coach-400)',
          500: 'var(--conversation-coach-500)',
          600: 'var(--conversation-coach-600)',
          700: 'var(--conversation-coach-700)',
          800: 'var(--conversation-coach-800)',
          900: 'var(--conversation-coach-900)',
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
    require('@tailwindcss/typography'),
  ],
};
