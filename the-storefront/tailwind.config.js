const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './stories/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#789461',
        secondary: '#294B29',
        heading: '#50623A'
    },
      backgroundImage: {
        'offer-colection': "url('/images/offer-colection/countdown.jpg')",
        megamenu: "url('/images/megamenu/bg-menu.jpg')"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        prata: ['Prata', 'serif'],
        haviland: ['Mr De Haviland', 'cursive']
      },
      aspectRatio: {
        '2/1': '2 / 1',
        '3/4': '3 / 4',
        '3/1': '3 / 1'
      },
      container: {
        center: true,
        padding: '15px',
        screens: {
          sm: '480px',
          lm: '575px',
          md: '768px',
          lg: '992px',
          xl: '1200px'
        }
      },
      screens: {
        // Maximum Medium Query
        'max-lg': { max: '1199px' },
        'max-md': { max: '991px' },
        'max-lm': { max: '767px' },
        'max-sm': { max: '575px' },
        'max-xs': { max: '479px' },

        // Fixed Medium Query
        'fixed-xs': { max: '479px' },
        'fixed-sm': { min: '480px', max: '575px' },
        'fixed-lm': { min: '576px', max: '767px' },
        'fixed-md': { min: '768px', max: '991px' },
        'fixed-lg': { min: '992px', max: '1199px' },

        // Minimum Medium Query
        tiny: '321px',
        sm: '480px',
        lm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px'
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(70px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
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
  ],
};
