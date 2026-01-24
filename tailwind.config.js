/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    // Sistema de espaciado consistente (4px base)
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      18: '72px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    extend: {
      colors: {
        // ===========================================
        // OCCIDENT RED - Color Corporativo Principal
        // Rojo puro institucional #E30613
        // ===========================================
        occident: {
          DEFAULT: '#E30613',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#F87171',
          400: '#EF4444',
          500: '#E30613',  // Principal - Rojo Occident puro
          600: '#C80510',
          700: '#A5040D',
          800: '#7F0309',
          900: '#5C0207',
          950: '#3B0104',
        },

        // ===========================================
        // NEUTRALES - Escala de grises balanceada
        // ===========================================
        neutral: {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          150: '#EDEDED',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          850: '#1A1A1A',
          900: '#171717',
          950: '#0A0A0A',
          1000: '#000000',
        },

        // ===========================================
        // SEMÁNTICOS - Estados y feedback
        // ===========================================
        success: {
          light: '#D1FAE5',
          DEFAULT: '#10B981',
          dark: '#065F46',
        },
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
          dark: '#92400E',
        },
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#991B1B',
        },
        info: {
          light: '#DBEAFE',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
        },

        // ===========================================
        // SUPERFICIE - Fondos y cards
        // ===========================================
        surface: {
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
          tertiary: 'var(--surface-tertiary)',
          elevated: 'var(--surface-elevated)',
          inverse: 'var(--surface-inverse)',
        },

        // ===========================================
        // TEXTO - Jerarquía de contenido
        // ===========================================
        content: {
          primary: 'var(--content-primary)',
          secondary: 'var(--content-secondary)',
          tertiary: 'var(--content-tertiary)',
          inverse: 'var(--content-inverse)',
          brand: 'var(--content-brand)',
        },

        // ===========================================
        // BORDES - Separadores y límites
        // ===========================================
        border: {
          DEFAULT: 'var(--border-default)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
      },

      // ===========================================
      // TIPOGRAFÍA - Escala modular (1.250 ratio)
      // ===========================================
      fontSize: {
        // Body
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],           // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.005em' }],      // 14px
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],               // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],      // 18px
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],      // 20px

        // Headings
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],          // 24px
        '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em' }],    // 30px
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em' }],     // 36px
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.025em' }],         // 48px
        '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.03em' }],      // 60px
        '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.03em' }],          // 72px
        '8xl': ['6rem', { lineHeight: '6.5rem', letterSpacing: '-0.035em' }],         // 96px
        '9xl': ['8rem', { lineHeight: '8.5rem', letterSpacing: '-0.04em' }],          // 128px
      },

      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Fira Code',
          'monospace',
        ],
      },

      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      // ===========================================
      // BORDER RADIUS - Consistente
      // ===========================================
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
      },

      // ===========================================
      // SOMBRAS - Elevación progresiva
      // ===========================================
      boxShadow: {
        'none': 'none',
        'xs': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'md': '0 6px 12px -2px rgba(0, 0, 0, 0.08), 0 3px 6px -2px rgba(0, 0, 0, 0.04)',
        'lg': '0 12px 24px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.04)',
        'xl': '0 20px 40px -8px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
        '2xl': '0 32px 64px -12px rgba(0, 0, 0, 0.14)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        // Sombras con color
        'occident': '0 4px 14px -2px rgba(227, 6, 19, 0.25)',
        'occident-lg': '0 10px 30px -4px rgba(227, 6, 19, 0.3)',
        // Dark mode shadows
        'dark-sm': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'dark-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 12px 32px rgba(0, 0, 0, 0.5)',
      },

      // ===========================================
      // TRANSICIONES
      // ===========================================
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },

      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'ease-in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },

      // ===========================================
      // ANIMACIONES
      // ===========================================
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },

      // ===========================================
      // CONTENEDOR
      // ===========================================
      maxWidth: {
        'container': '1280px',
        'content': '720px',
        'prose': '65ch',
      },

      // ===========================================
      // Z-INDEX - Capas ordenadas
      // ===========================================
      zIndex: {
        'negative': '-1',
        'base': '0',
        'docked': '10',
        'dropdown': '1000',
        'sticky': '1100',
        'banner': '1200',
        'overlay': '1300',
        'modal': '1400',
        'popover': '1500',
        'skipLink': '1600',
        'toast': '1700',
        'tooltip': '1800',
      },
    },
  },
  plugins: [],
}
