import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAFAFA',
          100: '#F5F5F7',
          200: '#EBEBF0',
          DEFAULT: '#F8F8FB',
        },
        sandstone: {
          light: '#E0E7FF',
          DEFAULT: '#C7D2FE',
          dark: '#818CF8',
        },
        saffron: {
          light: '#FDBA74',
          DEFAULT: '#F97316',
          dark: '#EA580C',
        },
        maroon: {
          light: '#818CF8',
          DEFAULT: '#4F46E5',
          dark: '#3730A3',
        },
        gold: {
          light: '#D4AF37',
          DEFAULT: '#B8860B',
          dark: '#8B6914',
          shine: '#FFD700',
        },
        charcoal: {
          light: '#52525B',
          DEFAULT: '#27272A',
          dark: '#18181B',
        },
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'Jost', 'sans-serif'],
        accent: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      backgroundImage: {
        'temple-pattern': "url('/images/temple-pattern.svg')",
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #FFD700 100%)',
        'saffron-gradient': 'linear-gradient(135deg, #FF9933 0%, #E8821A 100%)',
        'divine-gradient': 'linear-gradient(180deg, rgba(248,243,232,0) 0%, rgba(248,243,232,0.8) 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(26,10,5,0.3) 0%, rgba(26,10,5,0.6) 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(184,134,11,0.3)',
        'gold-lg': '0 0 40px rgba(184,134,11,0.4)',
        'saffron': '0 0 20px rgba(255,153,51,0.3)',
        'card': '0 8px 32px rgba(45,45,45,0.08)',
        'card-hover': '0 20px 60px rgba(45,45,45,0.15)',
        'divine': '0 20px 80px rgba(184,134,11,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'particle': 'particle 8s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(184,134,11,0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(184,134,11,0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        particle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.4' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)', opacity: '0.8' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184,134,11,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(184,134,11,0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config
