'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  User, Lock, Mail, Eye, EyeOff, ArrowRight, Shield,
  FileText, AlertCircle, Phone, CheckCircle
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import toast from 'react-hot-toast'

export default function AccesoClientesPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    dni: '',
    policyNumber: '',
    password: '',
    confirmPassword: '',
    privacy: false,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('¡Bienvenido de nuevo!')
    setIsLoading(false)
    // Redirect to dashboard
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (!registerData.privacy) {
      toast.error('Debes aceptar la política de privacidad')
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('¡Registro completado! Revisa tu email para activar tu cuenta.')
    setIsLoading(false)
    setIsLogin(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-soriano-dark mb-2">
              {isLogin ? 'Acceso Clientes' : 'Crear cuenta'}
            </h1>
            <p className="text-soriano-gray">
              {isLogin
                ? 'Accede a tu área privada para gestionar tus pólizas'
                : 'Regístrate para acceder a tu área de cliente'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isLogin
                  ? 'bg-white text-soriano-dark shadow-sm'
                  : 'text-soriano-gray hover:text-soriano-dark'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                !isLogin
                  ? 'bg-white text-soriano-dark shadow-sm'
                  : 'text-soriano-gray hover:text-soriano-dark'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Forms */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-soriano-dark mb-2">
                  Email o DNI/NIE
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    placeholder="tu@email.com o 12345678A"
                    className="input-premium pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-soriano-dark mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="input-premium pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={loginData.remember}
                    onChange={(e) => setLoginData({ ...loginData, remember: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-soriano-gray">Recordarme</span>
                </label>
                <a href="/recuperar-contrasena" className="text-sm text-primary-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Accediendo...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Acceder
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-soriano-dark mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                    placeholder="Tu nombre"
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-soriano-dark mb-2">
                    DNI/NIE
                  </label>
                  <input
                    type="text"
                    value={registerData.dni}
                    onChange={(e) => setRegisterData({ ...registerData, dni: e.target.value })}
                    required
                    placeholder="12345678A"
                    className="input-premium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-soriano-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                  placeholder="tu@email.com"
                  className="input-premium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-soriano-dark mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                    placeholder="600 000 000"
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-soriano-dark mb-2">
                    Nº de Póliza
                  </label>
                  <input
                    type="text"
                    value={registerData.policyNumber}
                    onChange={(e) => setRegisterData({ ...registerData, policyNumber: e.target.value })}
                    placeholder="Opcional"
                    className="input-premium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-soriano-dark mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-soriano-dark mb-2">
                    Repetir contraseña
                  </label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="input-premium"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy-register"
                  checked={registerData.privacy}
                  onChange={(e) => setRegisterData({ ...registerData, privacy: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="privacy-register" className="text-sm text-soriano-gray">
                  Acepto la{' '}
                  <a href="/legal/privacidad" className="text-primary-600 hover:underline">
                    Política de Privacidad
                  </a>{' '}
                  y los{' '}
                  <a href="/legal/terminos" className="text-primary-600 hover:underline">
                    Términos de Servicio
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Registrando...' : 'Crear cuenta'}
              </button>
            </form>
          )}

          {/* Help */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">¿Necesitas ayuda?</p>
                <p className="text-blue-700">
                  Llámanos al <a href="tel:+34966810290" className="font-medium hover:underline">966 810 290</a> o
                  escríbenos a <a href="mailto:info@sorianomediadores.es" className="font-medium hover:underline">info@sorianomediadores.es</a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-700 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6">
            Tu área de cliente
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Gestiona todas tus pólizas, comunica siniestros y accede a tus
            documentos desde cualquier lugar.
          </p>

          <div className="space-y-4">
            {[
              { icon: FileText, text: 'Consulta y descarga tus pólizas' },
              { icon: AlertCircle, text: 'Comunica siniestros online' },
              { icon: Shield, text: 'Modifica tus datos y coberturas' },
              { icon: Phone, text: 'Contacto directo con tu asesor' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Conexión segura SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Datos protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
