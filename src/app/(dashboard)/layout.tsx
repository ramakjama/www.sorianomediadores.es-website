'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FileText, Receipt, AlertTriangle, FolderOpen, Trophy,
  User, Settings, LogOut, Menu, X, ChevronRight, Bell, Sparkles
} from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Mis Polizas', href: '/polizas', icon: FileText },
  { name: 'Recibos', href: '/recibos', icon: Receipt },
  { name: 'Siniestros', href: '/siniestros', icon: AlertTriangle },
  { name: 'Documentos', href: '/documentos', icon: FolderOpen },
  { name: 'Soriano Club', href: '/soriano-club', icon: Trophy },
  { name: 'Mi Perfil', href: '/perfil', icon: User },
]

const levelColors = {
  BRONCE: 'from-amber-600 to-amber-700',
  PLATA: 'from-slate-400 to-slate-500',
  ORO: 'from-yellow-400 to-yellow-500',
  PLATINO: 'from-violet-400 to-violet-500',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const userLevel = (session?.user?.level as keyof typeof levelColors) || 'BRONCE'

  return (
    <div className="min-h-screen bg-apple-gray-50 dark:bg-apple-black">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 bg-apple-white dark:bg-apple-gray-900 border-r border-apple-gray-200 dark:border-apple-gray-800 transform transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-apple-gray-100 dark:border-apple-gray-800">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Logo className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User card */}
          <div className="p-4">
            <div className={cn(
              'bg-gradient-to-br p-4 rounded-2xl text-white',
              levelColors[userLevel]
            )}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {session?.user?.avatar ? (
                    <img
                      src={session.user.avatar}
                      alt=""
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {session?.user?.name || 'Usuario'}
                  </p>
                  <p className="text-sm text-white/80">
                    Nivel {userLevel}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  {session?.user?.points?.toLocaleString() || 0} pts
                </span>
                <Link
                  href="/soriano-club"
                  className="flex items-center gap-1 hover:underline"
                >
                  Ver mas <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-occident text-white'
                      : 'text-apple-gray-600 dark:text-apple-gray-400 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-apple-gray-100 dark:border-apple-gray-800 space-y-2">
            <Link
              href="/configuracion"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-apple-gray-600 dark:text-apple-gray-400 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configuracion</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar sesion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-apple-white/80 dark:bg-apple-gray-900/80 backdrop-blur-xl border-b border-apple-gray-200 dark:border-apple-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800"
              >
                <Menu className="w-6 h-6 text-apple-gray-600 dark:text-apple-gray-400" />
              </button>
              <h1 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white">
                {sidebarLinks.find(l => l.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="relative p-2 rounded-xl hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors">
                <Bell className="w-5 h-5 text-apple-gray-600 dark:text-apple-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-occident rounded-full" />
              </button>
              <Link
                href="/perfil"
                className="w-10 h-10 rounded-xl bg-apple-gray-100 dark:bg-apple-gray-800 flex items-center justify-center"
              >
                {session?.user?.avatar ? (
                  <img
                    src={session.user.avatar}
                    alt=""
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-apple-gray-600 dark:text-apple-gray-400" />
                )}
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
