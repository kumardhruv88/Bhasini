import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F5F2',
        'bg-dark': '#0D0D0D',
        text: '#0D0D0D',
        muted: '#6B6B6B',
        subtle: '#9E9E9E',
        card: '#EFEFED',
        border: '#E0DED9',
        accent: '#FF6B35',
        'accent-light': '#FF8F5E',
        blue: '#1A73E8',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '80px', fontWeight: '800', letterSpacing: '-0.02em' }],
        'display': ['56px', { lineHeight: '64px', fontWeight: '800', letterSpacing: '-0.02em' }],
        'heading': ['40px', { lineHeight: '48px', fontWeight: '700' }],
        'subheading': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'lead': ['20px', { lineHeight: '30px', fontWeight: '400' }],
      },
      borderRadius: {
        '2xl': '24px',
        '3xl': '32px',
        'pill': '9999px',
      },
      keyframes: {
        'orb-float': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-18px) scale(1.03)' },
        },
        'particle-fade': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0) translateY(-40px)' },
        },
      },
      animation: {
        'orb-float': 'orb-float 5s ease-in-out infinite',
        'particle-fade': 'particle-fade 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
