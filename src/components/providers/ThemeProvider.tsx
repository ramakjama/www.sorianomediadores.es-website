'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'
import { theme, colors, chartColors } from '@/lib/theme'

// ===========================================
// THEME CONTEXT
// ===========================================

interface ThemeContextValue {
  // Current theme mode
  isDark: boolean
  isLight: boolean

  // Color tokens based on current theme
  colors: {
    bg: typeof colors.bg | typeof colors.light.bg
    surface: typeof colors.surface | typeof colors.light.surface
    border: typeof colors.border | typeof colors.light.border
    text: typeof colors.text | typeof colors.light.text
    brand: typeof colors.brand
    accent: typeof colors.accent
    occident: typeof colors.occident
    success: typeof colors.success
    warning: typeof colors.warning
    danger: typeof colors.danger
    info: typeof colors.info
  }

  // Chart colors
  chartColors: typeof chartColors

  // Full theme object
  theme: typeof theme

  // Utility functions
  getColor: (path: string) => string
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ===========================================
// THEME HOOK
// ===========================================

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}

// ===========================================
// INNER PROVIDER (with access to next-themes)
// ===========================================

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === 'dark' : true // Default to dark
  const isLight = mounted ? resolvedTheme === 'light' : false

  // Get colors based on current theme
  const currentColors = {
    bg: isLight ? colors.light.bg : colors.bg,
    surface: isLight ? colors.light.surface : colors.surface,
    border: isLight ? colors.light.border : colors.border,
    text: isLight ? colors.light.text : colors.text,
    brand: colors.brand,
    accent: colors.accent,
    occident: colors.occident,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info,
  }

  // Utility to get nested color value by path
  const getColor = (path: string): string => {
    const keys = path.split('.')
    let value: unknown = currentColors

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = (value as Record<string, unknown>)[key]
      } else {
        console.warn(`Theme color path not found: ${path}`)
        return '#000000'
      }
    }

    if (typeof value === 'string') {
      return value
    }

    console.warn(`Theme color path did not resolve to string: ${path}`)
    return '#000000'
  }

  const contextValue: ThemeContextValue = {
    isDark,
    isLight,
    colors: currentColors,
    chartColors,
    theme,
    getColor,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// ===========================================
// MAIN THEME PROVIDER
// ===========================================

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </NextThemesProvider>
  )
}

// ===========================================
// RE-EXPORT NEXT-THEMES HOOK
// ===========================================

export { useTheme } from 'next-themes'
