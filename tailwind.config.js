/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        gold: {
          50: '#fbf9f0',
          100: '#f6efd9',
          200: '#ecdca8',
          300: '#e0c674',
          400: '#d4af37',
          500: '#c59b27',
          600: '#a67d1c',
          700: '#83621a',
          800: '#6b4f1c',
          900: '#5a421b',
        },
        crimson: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#990000',
          800: '#800020',
          900: '#660018',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #e0c674 0%, #d4af37 50%, #c59b27 100%)',
        'crimson-gradient': 'linear-gradient(135deg, #b91c1c 0%, #990000 50%, #800020 100%)',
        'soft-radial':
          'radial-gradient(circle at 20% 10%, rgba(212,175,55,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(153,0,0,0.04) 0%, transparent 50%)',
      },
      boxShadow: {
        gold: '0 8px 30px -8px rgba(212, 175, 55, 0.25)',
        'gold-sm': '0 2px 12px -4px rgba(212, 175, 55, 0.2)',
        crimson: '0 8px 30px -8px rgba(153, 0, 0, 0.25)',
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.08)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
