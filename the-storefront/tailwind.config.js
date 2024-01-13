const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      //   fontFamily: {
      //     sans: ['var(--font-geist-sans)']
      //   },
      aspectRatio: {
        '2/1': '2 / 1',
        '3/4': '3 / 4',
        '3/1': '3 / 1'
      },
      //   colors: {
      //     primary: {
      //       DEFAULT: '#606c38',
      //       100: '#13160b',
      //       200: '#262b16',
      //       300: '#394121',
      //       400: '#4c562c',
      //       500: '#606c38',
      //       600: '#88994f',
      //       700: '#a9b876',
      //       800: '#c5d0a3',
      //       900: '#e2e7d1'
      //     },
      //     dark: {
      //       DEFAULT: '#283618',
      //       100: '#080b05',
      //       200: '#101509',
      //       300: '#18200e',
      //       400: '#1f2a13',
      //       500: '#283618',
      //       600: '#547133',
      //       700: '#80ac4d',
      //       800: '#aac987',
      //       900: '#d5e4c3'
      //     },
      //     light: {
      //       DEFAULT: '#fefae0',
      //       100: '#5d5103',
      //       200: '#baa206',
      //       300: '#f8dc27',
      //       400: '#fbeb84',
      //       500: '#fefae0',
      //       600: '#fefbe7',
      //       700: '#fefced',
      //       800: '#fffdf3',
      //       900: '#fffef9'
      //     },
      //     accent2: {
      //       DEFAULT: '#dda15e',
      //       100: '#34210b',
      //       200: '#684216',
      //       300: '#9d6321',
      //       400: '#d1842c',
      //       500: '#dda15e',
      //       600: '#e4b57f',
      //       700: '#ebc79f',
      //       800: '#f1dabf',
      //       900: '#f8ecdf'
      //     },
      //     accent: {
      //       DEFAULT: '#bc6c25',
      //       100: '#251507',
      //       200: '#4b2b0f',
      //       300: '#704016',
      //       400: '#96561e',
      //       500: '#bc6c25',
      //       600: '#d98840',
      //       700: '#e3a570',
      //       800: '#ecc3a0',
      //       900: '#f6e1cf'
      //     }
      //   },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    }),
    require('daisyui')
  ],
  daisyui: {
    themes: ['light']
  }
};
