'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  User, Lock, Eye, EyeOff, ArrowRight, Shield,
  BarChart3, Users, FileText, Settings, AlertTriangle
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import toast from 'react-hot-toast'

export default function AccesoEmpleadosPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    remember: false,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('¡Bienvenido al panel de empleados!')
    setIsLoading(false)
    // Redirect to employee dashboard
  }

  return (
    <div className="min-h-screen bg-soriano-dark flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <Logo variant="white" className="h-10 w-auto" />
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Acceso restringido
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Portal de Empleados
            </h1>
            <p className="text-gray-400">
              Accede al panel de gestión interno de Soriano Mediadores
            </p>
          </div>

          {/* Warning */}
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-400 mb-1">Acceso autorizado</p>
                <p className="text-gray-400">
                  Este portal es de uso exclusivo para empleados de Soriano Mediadores.
                  El acceso no autorizado está prohibido.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  placeholder="nombre.apellido"
                  className="w-full px-5 py-4 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  placeholder="••••••••"
                  className="w-full px-5 py-4 pl-12 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={credentials.remember}
                  onChange={(e) => setCredentials({ ...credentials, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 bg-white/5 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-400">Recordar sesión</span>
              </label>
              <a href="/empleados/recuperar" className="text-sm text-primary-400 hover:text-primary-300">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verificando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Acceder al panel
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>
          </form>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿Problemas para acceder? Contacta con{' '}
              <a href="mailto:soporte@sorianomediadores.es" className="text-primary-400 hover:underline">
                soporte técnico
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-white/5 to-white/0 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />

        <div className="relative max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6">
            Panel de Gestión
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Accede a todas las herramientas que necesitas para gestionar
            pólizas, clientes y siniestros de forma eficiente.
          </p>

          <div className="space-y-4">
            {[
              { icon: Users, text: 'Gestión de clientes y prospectos' },
              { icon: FileText, text: 'Administración de pólizas' },
              { icon: BarChart3, text: 'Informes y estadísticas' },
              { icon: Settings, text: 'Configuración del sistema' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Security badges */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Conexión segura con autenticación de dos factores</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
