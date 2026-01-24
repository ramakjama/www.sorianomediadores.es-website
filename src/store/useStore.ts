import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: 'client' | 'employee' | 'admin'
  avatar?: string
}

interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void

  // UI State
  isChatOpen: boolean
  toggleChat: () => void
  setIsChatOpen: (open: boolean) => void

  isMenuOpen: boolean
  toggleMenu: () => void
  setIsMenuOpen: (open: boolean) => void

  // Calculator state
  calculatorData: Record<string, unknown>
  setCalculatorData: (data: Record<string, unknown>) => void
  clearCalculatorData: () => void

  // Contact form
  contactFormData: {
    name: string
    email: string
    phone: string
    message: string
    product?: string
  } | null
  setContactFormData: (data: AppState['contactFormData']) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // UI State
      isChatOpen: false,
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      setIsChatOpen: (open) => set({ isChatOpen: open }),

      isMenuOpen: false,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setIsMenuOpen: (open) => set({ isMenuOpen: open }),

      // Calculator
      calculatorData: {},
      setCalculatorData: (data) => set({ calculatorData: data }),
      clearCalculatorData: () => set({ calculatorData: {} }),

      // Contact form
      contactFormData: null,
      setContactFormData: (data) => set({ contactFormData: data }),
    }),
    {
      name: 'soriano-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        calculatorData: state.calculatorData,
      }),
    }
  )
)
