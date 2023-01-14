const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const colors = {
  black: '#000000',
  white: '#F1F1F1',
  main: '#0C0C0E',
  transparent: 'transparent',
  gray: {
    10: '#1B1B1B',
    20: '#303030',
    30: '#474747',
    40: '#5E5E5E',
    50: '#777777',
    60: '#919191',
    70: '#ABABAB',
    80: '#C6C6C6',
    90: '#E1E1E1',
    95: '#F1F1F1',
    99: '#FBFBFB',
  },
  primary: {
    5: '#0c0c0e',
    10: '#000729',
    20: '#000e55',
    30: '#001790',
    40: '#0020ca',
    50: '#1f43ff',
    60: '#5c72ea',
    70: '#7f8fe9',
    80: '#98a3e2',
    90: '#c1c7e9',
    95: '#cfd3e4',
  },
  green: {
    10: '#0A1F08',
    20: '#12370F',
    30: '#1A5216',
    40: '#236C1D',
    50: '#2C8825',
    60: '#36A62D',
    70: '#3FC334',
    80: '#7FDA77',
    90: '#BFEDBB',
    95: '#E0F6DF',
    99: '#F7FFF7',
  },
  red: {
    10: '#3B0707',
    20: '#620D0C',
    30: '#8E1211',
    40: '#BA1817',
    50: '#E52928',
    60: '#EC6665',
    70: '#F19090',
    80: '#F6B6B5',
    90: '#FADAD9',
    95: '#FDECEC',
    99: '#FFF8F8 ',
  },
  blue: {
    10: '#001940',
    20: '#002C6F',
    30: '#0040A2',
    40: '#0054D4',
    50: '#0F6EFE',
    60: '#468FFE',
    70: '#76ACFE',
    80: '#A4C8FF ',
    90: '#D1E3FF',
    95: '#E9F2FF',
    99: '#F9FBFF',
  },
}

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */

/** @type { DefaultConfig & { theme: { extend: DefaultTheme, colors: typeof colors } } } */
module.exports = {
  content: ['./resources/**/*.{js,jsx,ts,tsx,css,sass,html}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      h1: [
        '2rem',
        {
          lineHeight: '2.5rem', // 40
          fontWeight: '700',
          letterSpacing: 0.96,
          fontStyle: 'italic',
        },
      ],
      h2: [
        '1.75rem',
        {
          lineHeight: '2.25rem', // 36
          fontWeight: '700',
          letterSpacing: 0.84,
          fontStyle: 'italic',
        },
      ],
      h3: [
        '1.5rem',
        {
          lineHeight: '2rem', // 32
          fontWeight: '700',
          letterSpacing: 0.72,
          fontStyle: 'italic',
        },
      ],

      heading: [
        '1.25rem',
        {
          lineHeight: '1.75rem', // 28
          fontWeight: '700',
          letterSpacing: 0.6,
          fontStyle: 'italic',
        },
      ],
      subheading: [
        '1.125rem',
        {
          lineHeight: '1.5rem', // 24
          fontWeight: '600',
          letterSpacing: 0.54,
        },
      ],

      button: [
        '0.875rem',
        {
          lineHeight: '1.25rem', // 20
          fontWeight: '600',
          letterSpacing: 0.42,
        },
      ],
      base: [
        '0.875rem',
        {
          lineHeight: '1.25rem', // 20
          fontWeight: '600',
          letterSpacing: 0.42,
        },
      ],

      caption: [
        '0.75rem',
        {
          lineHeight: '1rem', // 16
          fontWeight: '600',
          letterSpacing: 0.36,
        },
      ],
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...colors,
      text: {
        primary: colors.white,
      },
      icon: {
        primary: colors.white,
      },
      border: {
        default: colors.gray[40],
      },
      background: {
        default: colors.black,
      },
      button: {
        primary: colors.primary[40],
        'primary-hover': colors.primary[30],
        'primary-pressed': colors.primary[20],
        'primary-disabled': colors.gray[40],
      },
    },
    extend: {
      transitionDelay: {
        0: '0ms',
      },
      boxShadow: {
        box: '8px 8px 0px 0px ' + colors.gray[10],
        sm: '0px 1px 2px #F1F1F1',
        'input-error': '0px 0px 7px -3px',
        md: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);',
        lg: '0px 0px 10px 0px rgba(33, 33, 52, 0.2)',
        autocomplete:
          '0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)',
        select: '0px 4px 16px 0',
      },
      zIndex: {
        tooltip: '100',
        popupMenu: '200',
        modal: '300',
      },
      padding: {
        container: '3rem',
        col: '1.5rem',
      },
      margin: {
        row: '-0.3125rem',
        col: '0.3125rem',
      },
      width: {
        container_1: 'calc(100%*1/12 - 1.5rem)',
        container_2: 'calc(100%*2/12 - 1.5rem)',
        container_3: 'calc(100%*3/12 - 1.5rem)',
        container_4: 'calc(100%*4/12 - 1.5rem)',
        container_5: 'calc(100%*5/12 - 1.5rem)',
        container_6: 'calc(100%*6/12 - 1.5rem)',
        container_7: 'calc(100%*7/12 - 1.5rem)',
        container_8: 'calc(100%*8/12 - 1.5rem)',
        container_9: 'calc(100%*9/12 - 1.5rem)',
        container_10: 'calc(100%*10/12 - 1.5rem)',
        container_11: 'calc(100%*11/12 - 1.5rem)',
        container_12: 'calc(100%*12/12)',
      },
      keyframes: {
        show: {
          '0%': { opacity: '0' },
          '60%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        showToo: {
          '0%': { opacity: '0' },
          '60%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        hide: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        press: {
          '0%': { borderColor: '#00000000' },
          '10%': { borderColor: '#0000003a' },
          '100%': { borderColor: '#00000000' },
        },
        extend: {
          '0%': { width: '0', opacity: '0' },
          '100%': { width: '100%', opacity: '0.5' },
        },
        reposition: {
          '0%': { left: '100%', width: '0', height: '4px' },
          '60%': { left: '30%', width: '70%', height: '4px' },
          '100%': { left: '0', width: '4px', height: '100%' },
        },
      },
      animation: {
        show: 'show 400ms ease-in',
        showToo: 'showToo 400ms ease-in',
        hide: 'hide 150ms ease-in',
        press: 'press 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        extend: 'extend 150ms cubic-bezier(0.1, 0.5, 0.5, 0.1)',
        reposition: 'reposition 300ms ease-in-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden::-webkit-scrollbar': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          display: 'none',
        },
        '.scrollbar-hidden': {
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },

        // styled scrollbar used in InpuSelect, InputTextarea
        '.scrollbar-styled::-webkit-scrollbar': {
          width: '12px',
          cursor: 'pointer',
        },
        '.scrollbar-styled::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-styled::-webkit-scrollbar-thumb': {
          background: '#AFAFAF',
          borderRadius: '99999px',
          border: '4px solid white',
        },
        '.scrollbar-styled::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },

        '.dark .scrollbar-styled::-webkit-scrollbar-thumb': {
          background: '#AFAFAF',
          borderRadius: '99999px',
          border: '4px solid #1B1B1B',
        },

        '.autofill-style-disable:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #fff inset',
          '-moz-box-shadow': '0 0 0 100px #fff inset',
          boxShadow: '0 0 0 100px #fff inset',
        },

        '.bg-gradient': {
          backgroundImage:
            'linear-gradient(135deg, #EA2F7D,  #7E10B7, #FFAF01, #FFFFFF)',
        },
      })
    }),
  ],
}
