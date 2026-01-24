'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown, Phone, User, Car, Home, Heart,
  Stethoscope, PiggyBank, Shield, Building, Bike, LogIn, Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, COMPANY_INFO } from '@/lib/constants'
import { useStore } from '@/store/useStore'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const iconMap: Record<string, React.ElementType> = {
  Car, Bike, Home, Heart, Stethoscope, PiggyBank, Shield, Building,
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { isMenuOpen, toggleMenu, setIsMenuOpen, isAuthenticated, user } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Top bar - Refined dark */}
      <div className="hidden lg:block bg-neutral-800 dark:bg-neutral-900 text-sm">
        <div className="container-premium flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#E30613]" />
              <span className="font-medium">{COMPANY_INFO.phone}</span>
            </a>
            <span className="w-px h-4 bg-neutral-600" />
            <div className="flex items-center gap-2 text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span>L-V: 09:00 - 17:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-[#E30613] flex items-center justify-center text-xs font-bold text-white">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span>Hola, {user?.name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/acceso-clientes"
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Área Clientes</span>
                </Link>
                <span className="w-px h-4 bg-neutral-600" />
                <Link
                  href="/acceso-empleados"
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Empleados</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar - Balanced */}
      <header
        className={cn(
          'sticky top-0 z-sticky transition-all duration-300',
          isScrolled
            ? 'bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-xl shadow-md shadow-neutral-900/5 dark:shadow-none border-b border-neutral-200/60 dark:border-neutral-800/60'
            : 'bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-transparent'
        )}
      >
        <nav className="container-premium">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-3">
              <Logo className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.children ? (
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full',
                        'text-neutral-600 dark:text-neutral-400',
                        'hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800',
                        'transition-all duration-200'
                      )}
                    >
                      {link.name}
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        activeDropdown === link.name && 'rotate-180'
                      )} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'px-4 py-2.5 text-sm font-medium rounded-full',
                        'text-neutral-600 dark:text-neutral-400',
                        'hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800',
                        'transition-all duration-200 block'
                      )}
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Dropdown - Refined */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute top-full left-0 pt-3"
                      >
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl shadow-neutral-900/10 dark:shadow-neutral-950/50 border border-neutral-100 dark:border-neutral-800 p-3 min-w-[300px]">
                          <div className="grid gap-1">
                            {link.children.map((child) => {
                              const Icon = child.icon ? iconMap[child.icon] : null
                              return (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={cn(
                                    'flex items-center gap-4 px-4 py-3.5 rounded-xl',
                                    'hover:bg-neutral-50 dark:hover:bg-neutral-800/50 group transition-all duration-200'
                                  )}
                                >
                                  {Icon && (
                                    <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:bg-[#E30613] group-hover:text-white transition-all duration-200">
                                      <Icon className="w-5 h-5" />
                                    </div>
                                  )}
                                  <span className="font-semibold text-neutral-700 dark:text-neutral-200 group-hover:text-[#E30613] dark:group-hover:text-[#E30613] transition-colors">
                                    {child.name}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA & Controls */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link href="/contacto" className="hidden lg:block">
                <button type="button" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E30613] text-white font-semibold text-sm rounded-full hover:bg-[#CC050F] active:scale-[0.98] shadow-md shadow-[#E30613]/20 hover:shadow-lg hover:shadow-[#E30613]/25 transition-all duration-200">
                  Solicitar presupuesto
                </button>
              </Link>

              <button
                type="button"
                onClick={toggleMenu}
                className="lg:hidden p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                ) : (
                  <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Refined */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-modal lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-neutral-900 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
                  <Logo className="h-8 w-auto" />
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                  </button>
                </div>

                {/* Mobile navigation */}
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-6">
                    {NAV_LINKS.map((link) => (
                      <div key={link.name}>
                        {link.children ? (
                          <div>
                            <div className="px-1 mb-3 text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                              {link.name}
                            </div>
                            <div className="grid gap-1">
                              {link.children.map((child) => {
                                const Icon = child.icon ? iconMap[child.icon] : null
                                return (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
                                  >
                                    {Icon && (
                                      <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-[#E30613]" />
                                      </div>
                                    )}
                                    <span className="font-medium">{child.name}</span>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 font-semibold text-lg rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-white transition-colors"
                          >
                            {link.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile footer */}
                <div className="p-5 border-t border-neutral-100 dark:border-neutral-800 space-y-3 bg-neutral-50 dark:bg-neutral-800/30">
                  <Link href="/acceso-clientes" onClick={() => setIsMenuOpen(false)} className="block">
                    <button type="button" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-white font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                      <User className="w-5 h-5" />
                      Área Clientes
                    </button>
                  </Link>
                  <Link href="/contacto" onClick={() => setIsMenuOpen(false)} className="block">
                    <button type="button" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E30613] text-white font-semibold rounded-xl hover:bg-[#CC050F] shadow-md shadow-[#E30613]/20 transition-all">
                      Solicitar presupuesto
                    </button>
                  </Link>
                  <a
                    href={`tel:${COMPANY_INFO.phoneClean}`}
                    className="flex items-center justify-center gap-2 py-3 text-[#E30613] font-semibold"
                  >
                    <Phone className="w-5 h-5" />
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
