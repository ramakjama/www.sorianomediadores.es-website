import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    // ===========================================
    // SPACING - 4px base (tokens integration)
    // ===========================================
    spacing: {
      'px': '1px',
      '0': '0px',
      '0.5': '2px',
      '1': 'var(--space-1)',   // 4px
      '1.5': '6px',
      '2': 'var(--space-2)',   // 8px
      '2.5': '10px',
      '3': 'var(--space-3)',   // 12px
      '3.5': '14px',
      '4': 'var(--space-4)',   // 16px
      '5': 'var(--space-5)',   // 20px
      '6': 'var(--space-6)',   // 24px
      '7': '28px',
      '8': 'var(--space-8)',   // 32px
      '9': '36px',
      '10': 'var(--space-10)', // 40px
      '11': '44px',
      '12': 'var(--space-12)', // 48px
      '14': '56px',
      '16': 'var(--space-16)', // 64px
      '18': '72px',
      '20': 'var(--space-20)', // 80px
      '24': 'var(--space-24)', // 96px
      '28': '112px',
      '32': '128px',
      '36': '144px',
      '40': '160px',
      '44': '176px',
      '48': '192px',
      '52': '208px',
      '56': '224px',
      '60': '240px',
      '64': '256px',
      '72': '288px',
      '80': '320px',
      '96': '384px',
    },

    extend: {
      // ===========================================
      // COLORS - CSS Variable Integration
      // Premium Dark Theme with Silver Shield Identity
      // ===========================================
      colors: {
        // --- Background/Surface (from tokens.css) ---
        bg: {
          0: 'var(--bg-0)',
          1: 'var(--bg-1)',
        },
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          // Legacy support
          primary: 'var(--bg-0)',
          secondary: 'var(--bg-1)',
          tertiary: 'var(--surface-1)',
          elevated: 'var(--surface-2)',
        },

        // --- Border colors ---
        border: {
          1: 'var(--border-1)',
          2: 'var(--border-2)',
          DEFAULT: 'var(--border-1)',
          subtle: 'var(--border-1)',
          strong: 'var(--border-2)',
        },

        // --- Text hierarchy ---
        text: {
          strong: 'var(--text-strong)',
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
          disabled: 'var(--text-disabled)',
        },
        content: {
          primary: 'var(--text-strong)',
          secondary: 'var(--text)',
          tertiary: 'var(--text-muted)',
          inverse: 'var(--bg-0)',
          brand: 'var(--occident)',
        },

        // --- Brand (Silver Shield Family) ---
        brand: {
          silver: 'var(--brand-silver)',
          chrome: 'var(--brand-chrome)',
          titanium: 'var(--brand-titanium)',
          steel: 'var(--brand-steel)',
        },

        // --- Accent (Controlled Tech Blue) ---
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
          'soft-bg': 'var(--accent-soft-bg)',
          glow: 'var(--accent-glow)',
        },

        // --- Occident Red (Primary Brand) ---
        occident: {
          DEFAULT: 'var(--occident)',
          hover: 'var(--occident-hover)',
          active: 'var(--occident-active)',
          'soft-bg': 'var(--occident-soft-bg)',
          // Full scale for gradients
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#F87171',
          400: '#EF4444',
          500: '#E30613',
          600: '#C80510',
          700: '#A5040D',
          800: '#7F0309',
          900: '#5C0207',
          950: '#3B0104',
        },

        // --- System States ---
        success: {
          DEFAULT: 'var(--success)',
          bg: 'var(--success-bg)',
          light: '#D1FAE5',
          dark: '#065F46',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          bg: 'var(--warning-bg)',
          light: '#FEF3C7',
          dark: '#92400E',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          bg: 'var(--danger-bg)',
        },
        error: {
          DEFAULT: 'var(--danger)',
          bg: 'var(--danger-bg)',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
        info: {
          DEFAULT: 'var(--info)',
          bg: 'var(--info-bg)',
          light: '#DBEAFE',
          dark: '#1E40AF',
        },

        // --- Neutral scale (legacy support) ---
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
      },

      // ===========================================
      // TYPOGRAPHY - Premium Scale
      // ===========================================
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'Fira Code', 'monospace'],
        display: ['var(--font-sans)', 'Inter', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.005em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.03em' }],
        '8xl': ['6rem', { lineHeight: '6.5rem', letterSpacing: '-0.035em' }],
      },

      // ===========================================
      // BORDER RADIUS - Premium rounded corners
      // ===========================================
      borderRadius: {
        'none': '0',
        'sm': 'var(--radius-sm)',   // 6px
        'DEFAULT': '8px',
        'md': 'var(--radius-md)',   // 10px
        'lg': 'var(--radius-lg)',   // 14px
        'xl': 'var(--radius-xl)',   // 20px
        '2xl': 'var(--radius-2xl)', // 28px
        'full': 'var(--radius-full)',
      },

      // ===========================================
      // SHADOWS - Premium elevation (no glow)
      // ===========================================
      boxShadow: {
        'none': 'none',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-md)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'card': 'var(--shadow-card)',
        'elevated': 'var(--shadow-elevated)',
        // Brand shadows
        'occident': '0 4px 14px -2px rgba(227, 6, 19, 0.25)',
        'occident-lg': '0 10px 30px -4px rgba(227, 6, 19, 0.3)',
        'accent': '0 4px 14px -2px rgba(79, 163, 255, 0.25)',
        // Dark mode shadows
        'dark-sm': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'dark-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 12px 32px rgba(0, 0, 0, 0.5)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },

      // ===========================================
      // TRANSITIONS - Smooth animations
      // ===========================================
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'base': 'var(--transition-base)',
        'slow': 'var(--transition-slow)',
        'slower': 'var(--transition-slower)',
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
      // ANIMATIONS - Premium motion
      // ===========================================
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // ===========================================
      // Z-INDEX - Layered system
      // ===========================================
      zIndex: {
        'negative': '-1',
        'base': 'var(--z-base)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'overlay': 'var(--z-overlay)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'toast': 'var(--z-toast)',
        'tooltip': 'var(--z-tooltip)',
      },

      // ===========================================
      // CONTAINER
      // ===========================================
      maxWidth: {
        'container': '1280px',
        'content': '720px',
        'prose': '65ch',
      },

      // ===========================================
      // BACKDROP BLUR
      // ===========================================
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}

export default config
