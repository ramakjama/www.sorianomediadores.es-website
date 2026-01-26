/**
 * SORIANO MEDIADORES - DESIGN TOKENS (TypeScript)
 * Premium Dark Theme - Silver Shield Identity
 *
 * Use these tokens for:
 * - Chart colors (Recharts, Chart.js, etc.)
 * - PDF export (jsPDF)
 * - Email templates (HTML generation)
 * - Any programmatic styling needs
 */

// ===========================================
// CORE COLOR TOKENS
// ===========================================

export const colors = {
  // --- Backgrounds / Surfaces ---
  bg: {
    0: '#0B0F14',
    1: '#0F141B',
  },
  surface: {
    1: '#141A22',
    2: '#171F29',
    3: '#1B2430',
  },
  border: {
    1: '#1F2731',
    2: '#2A3442',
  },

  // --- Text Hierarchy ---
  text: {
    strong: '#E9EEF4',
    default: '#C6CFDA',
    muted: '#8C97A6',
    faint: '#6F7B89',
    disabled: '#556172',
  },

  // --- Brand (Silver Shield Family) ---
  brand: {
    silver: '#C6CFDA',
    chrome: '#E9EEF4',
    titanium: '#6F7B89',
    steel: '#4A5568',
    gradient: {
      start: '#E9EEF4',
      end: '#8C97A6',
    },
  },

  // --- Accent (Controlled Tech Blue) ---
  accent: {
    default: '#4FA3FF',
    hover: '#2E7FE6',
    active: '#1E5FA8',
    softBg: '#0E223A',
    glow: 'rgba(79, 163, 255, 0.15)',
  },

  // --- System States ---
  success: {
    default: '#2FAF8A',
    bg: '#0E221C',
  },
  warning: {
    default: '#D9A441',
    bg: '#241D10',
  },
  danger: {
    default: '#C24B4B',
    bg: '#261313',
  },
  info: {
    default: '#5B89B8',
    bg: '#0E1C2A',
  },

  // --- Occident Red (Primary Brand) ---
  occident: {
    default: '#E30613',
    hover: '#CC050F',
    active: '#B00410',
    softBg: '#1A0A0B',
    scale: {
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
    },
  },

  // --- Light Mode Overrides ---
  light: {
    bg: {
      0: '#F8FAFC',
      1: '#FFFFFF',
    },
    surface: {
      1: '#FFFFFF',
      2: '#F1F5F9',
      3: '#E2E8F0',
    },
    border: {
      1: '#E2E8F0',
      2: '#CBD5E1',
    },
    text: {
      strong: '#0F172A',
      default: '#334155',
      muted: '#64748B',
      faint: '#94A3B8',
      disabled: '#CBD5E1',
    },
  },
} as const

// ===========================================
// CHART COLOR PALETTES
// ===========================================

export const chartColors = {
  // Primary palette for data visualization
  primary: [
    '#4FA3FF', // Accent blue - primary data
    '#2FAF8A', // Success green - positive
    '#D9A441', // Warning amber - caution
    '#C24B4B', // Danger red - negative
    '#5B89B8', // Info blue - neutral
    '#8C97A6', // Muted - secondary
    '#6F7B89', // Faint - tertiary
    '#C6CFDA', // Silver - quaternary
  ],

  // Sequential palette (single hue, varying intensity)
  sequential: {
    blue: ['#0E223A', '#1E5FA8', '#2E7FE6', '#4FA3FF', '#7FBEFF', '#B3D9FF'],
    red: ['#1A0A0B', '#5C0207', '#A5040D', '#E30613', '#EF4444', '#FEE2E2'],
    green: ['#0E221C', '#065F46', '#10B981', '#2FAF8A', '#6EE7B7', '#D1FAE5'],
  },

  // Diverging palette (for positive/negative comparisons)
  diverging: {
    redBlue: ['#C24B4B', '#E57373', '#FFCDD2', '#E8EAF6', '#90CAF9', '#4FA3FF'],
    redGreen: ['#C24B4B', '#E57373', '#FFCDD2', '#C8E6C9', '#81C784', '#2FAF8A'],
  },

  // Category palette (distinct colors for categories)
  categorical: [
    '#4FA3FF', // Blue
    '#E30613', // Red
    '#2FAF8A', // Green
    '#D9A441', // Amber
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
  ],

  // Product-specific colors
  products: {
    auto: '#4FA3FF',
    hogar: '#2FAF8A',
    vida: '#E30613',
    salud: '#EC4899',
    empresa: '#D9A441',
    rc: '#8B5CF6',
  },

  // Status colors for claims/policies
  status: {
    active: '#2FAF8A',
    pending: '#D9A441',
    expired: '#C24B4B',
    cancelled: '#6F7B89',
    processing: '#4FA3FF',
  },
} as const

// ===========================================
// PDF EXPORT THEME (jsPDF)
// ===========================================

export const pdfTheme = {
  // Page settings
  page: {
    margin: 40,
    width: 595.28, // A4 width in points
    height: 841.89, // A4 height in points
  },

  // Colors (RGB format for jsPDF)
  colors: {
    primary: { r: 227, g: 6, b: 19 }, // Occident red
    secondary: { r: 79, g: 163, b: 255 }, // Accent blue
    text: {
      dark: { r: 15, g: 23, b: 42 }, // Strong text
      medium: { r: 51, g: 65, b: 85 }, // Default text
      light: { r: 100, g: 116, b: 139 }, // Muted text
    },
    background: {
      white: { r: 255, g: 255, b: 255 },
      gray: { r: 248, g: 250, b: 252 },
    },
    border: { r: 226, g: 232, b: 240 },
    success: { r: 47, g: 175, b: 138 },
    warning: { r: 217, g: 164, b: 65 },
    danger: { r: 194, g: 75, b: 75 },
  },

  // Typography
  fonts: {
    heading: {
      family: 'helvetica',
      style: 'bold',
      sizes: {
        h1: 24,
        h2: 18,
        h3: 14,
        h4: 12,
      },
    },
    body: {
      family: 'helvetica',
      style: 'normal',
      sizes: {
        large: 12,
        normal: 10,
        small: 8,
      },
    },
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const

// ===========================================
// EMAIL TEMPLATE THEME
// ===========================================

export const emailTheme = {
  // Safe web fonts for email
  fonts: {
    primary: "Arial, Helvetica, 'Helvetica Neue', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },

  // Inline-safe colors (hex only, no CSS variables)
  colors: {
    // Backgrounds
    bodyBg: '#F8FAFC',
    containerBg: '#FFFFFF',
    headerBg: '#0F172A',
    footerBg: '#F1F5F9',
    accentBg: '#FEF2F2',

    // Text
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    textInverse: '#FFFFFF',

    // Brand
    brandPrimary: '#E30613',
    brandSecondary: '#4FA3FF',

    // Borders
    border: '#E2E8F0',
    borderLight: '#F1F5F9',

    // States
    success: '#2FAF8A',
    successBg: '#ECFDF5',
    warning: '#D9A441',
    warningBg: '#FFFBEB',
    danger: '#C24B4B',
    dangerBg: '#FEF2F2',
    info: '#4FA3FF',
    infoBg: '#EFF6FF',
  },

  // Email-safe dimensions
  dimensions: {
    containerWidth: 600,
    headerHeight: 80,
    footerHeight: 120,
    padding: 24,
    borderRadius: 8,
  },

  // Typography (inline styles)
  typography: {
    h1: 'font-size: 28px; font-weight: 700; line-height: 1.2; color: #0F172A;',
    h2: 'font-size: 22px; font-weight: 700; line-height: 1.3; color: #0F172A;',
    h3: 'font-size: 18px; font-weight: 600; line-height: 1.4; color: #0F172A;',
    body: 'font-size: 16px; font-weight: 400; line-height: 1.6; color: #334155;',
    small: 'font-size: 14px; font-weight: 400; line-height: 1.5; color: #64748B;',
    link: 'color: #E30613; text-decoration: underline;',
  },

  // Button styles (inline)
  buttons: {
    primary: `
      display: inline-block;
      padding: 14px 28px;
      background-color: #E30613;
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 9999px;
      text-align: center;
    `.replace(/\s+/g, ' ').trim(),
    secondary: `
      display: inline-block;
      padding: 14px 28px;
      background-color: #F1F5F9;
      color: #0F172A;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 9999px;
      text-align: center;
      border: 1px solid #E2E8F0;
    `.replace(/\s+/g, ' ').trim(),
  },
} as const

// ===========================================
// SHADOWS (for programmatic use)
// ===========================================

export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.3)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.35)',
  md: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 30px rgba(0, 0, 0, 0.35)',
  xl: '0 20px 50px rgba(0, 0, 0, 0.45)',
  card: '0 12px 26px rgba(0, 0, 0, 0.28)',
  elevated: '0 16px 40px rgba(0, 0, 0, 0.5)',
} as const

// ===========================================
// SPACING SCALE
// ===========================================

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const

// ===========================================
// BORDER RADIUS
// ===========================================

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 28,
  full: 9999,
} as const

// ===========================================
// TRANSITIONS
// ===========================================

export const transitions = {
  fast: '150ms ease-out',
  base: '200ms ease-out',
  slow: '300ms ease-out',
  slower: '400ms ease-out',
} as const

// ===========================================
// Z-INDEX SCALE
// ===========================================

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
} as const

// ===========================================
// HELPER FUNCTIONS
// ===========================================

/**
 * Get color with opacity
 */
export function withOpacity(hexColor: string, opacity: number): string {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Convert hex to RGB object (for jsPDF)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    return { r: 0, g: 0, b: 0 }
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Get chart color by index (cycles through palette)
 */
export function getChartColor(index: number, palette: readonly string[] = chartColors.primary): string {
  return palette[index % palette.length]
}

/**
 * Generate gradient CSS string
 */
export function gradient(startColor: string, endColor: string, direction = '135deg'): string {
  return `linear-gradient(${direction}, ${startColor}, ${endColor})`
}

// ===========================================
// COMPLETE THEME OBJECT
// ===========================================

export const theme = {
  colors,
  chartColors,
  pdfTheme,
  emailTheme,
  shadows,
  spacing,
  radius,
  transitions,
  zIndex,
  utils: {
    withOpacity,
    hexToRgb,
    getChartColor,
    gradient,
  },
} as const

export type Theme = typeof theme
export type Colors = typeof colors
export type ChartColors = typeof chartColors

export default theme
