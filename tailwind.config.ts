import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        navy: {
          900: '#0b132b',
          800: '#1c2541',
          700: '#3a506b',
        },
        risk: {
          standard: {
            bg: '#ecfdf5',
            text: '#065f46',
            border: '#a7f3d0',
            badge: '#059669',
          },
          review: {
            bg: '#fffbeb',
            text: '#92400e',
            border: '#fde68a',
            badge: '#d97706',
          },
          redflag: {
            bg: '#fef2f2',
            text: '#991b1b',
            border: '#fecaca',
            badge: '#dc2626',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        glow: '0 0 15px rgba(59, 130, 246, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
