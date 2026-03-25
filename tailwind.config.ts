import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Line Tech Brand Colors (Modern Tech Cyan/Blue Palette)
        primary: {
          50: '#f0f9fc',
          100: '#e0f2f9',
          200: '#b3e5fc',
          300: '#81d4fa',
          400: '#4fc3f7',
          500: '#29B6F6', // PRIMARY BLUE
          600: '#03A9F4',
          700: '#039BE5',
          800: '#0288D1',
          900: '#0277BD',
        },
        accent: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00BCD4', // ACCENT CYAN
          600: '#00ACC1',
          700: '#00897B',
          800: '#00796B',
          900: '#004d40',
        },
        dark: {
          50: '#f5f7fa',
          100: '#ecf0f5',
          200: '#d9e2eb',
          300: '#c6d4e1',
          400: '#93a9bf',
          500: '#607d8b',
          600: '#455a64',
          700: '#37474f',
          800: '#263238',
          900: '#001f3f', // DARK NAVY
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
  ],
}

export default config
