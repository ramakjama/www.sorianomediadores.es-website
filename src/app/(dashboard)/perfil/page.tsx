'use client'

import { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Shield,
  Bell,
  Lock,
  Camera,
  Save,
  CheckCircle2,
  Edit3,
  Award,
  Star
} from 'lucide-react'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Juan García López',
  email: 'juan.garcia@email.com',
  phone: '+34 612 345 678',
  dni: '12345678A',
  address: 'Calle Mayor 15, 3º A',
  city: 'Villajoyosa',
  postalCode: '03570',
  birthDate: '1985-06-15',
  level: 'ORO',
  points: 7850,
  memberSince: '2020-03-10',
  avatar: null,
}

const levelConfig: Record<string, { color: string; gradient: string; nextLevel: string | null; pointsNeeded: number }> = {
  BRONCE: { color: 'text-amber-700', gradient: 'from-amber-600 to-amber-700', nextLevel: 'PLATA', pointsNeeded: 1000 },
  PLATA: { color: 'text-slate-500', gradient: 'from-slate-400 to-slate-500', nextLevel: 'ORO', pointsNeeded: 5000 },
  ORO: { color: 'text-yellow-500', gradient: 'from-yellow-400 to-yellow-500', nextLevel: 'PLATINO', pointsNeeded: 15000 },
  PLATINO: { color: 'text-violet-500', gradient: 'from-violet-400 to-violet-500', nextLevel: null, pointsNeeded: 0 },
}

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(mockUser)
  const [activeTab, setActiveTab] = useState<'personal' | 'seguridad' | 'notificaciones'>('personal')

  const level = levelConfig[mockUser.level] || levelConfig.BRONCE
  const progress = level.nextLevel
    ? Math.min((mockUser.points / level.pointsNeeded) * 100, 100)
    : 100

  const handleSave = () => {
    // En producción, llamar a la API
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Banner */}
        <div className={`h-32 bg-gradient-to-r ${level.gradient}`} />

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-white dark:bg-neutral-700 border-4 border-white dark:border-neutral-800 shadow-lg flex items-center justify-center overflow-hidden">
                {mockUser.avatar ? (
                  <img src={mockUser.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-neutral-400" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-[#E30613] text-white rounded-full shadow-lg hover:bg-[#CC050F] transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 sm:pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {mockUser.name}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Cliente desde {new Date(mockUser.memberSince).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 bg-gradient-to-r ${level.gradient} rounded-xl text-white`}>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">Nivel {mockUser.level}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold">{mockUser.points.toLocaleString()} pts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress to next level */}
              {level.nextLevel && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Progreso hacia {level.nextLevel}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {mockUser.points.toLocaleString()} / {level.pointsNeeded.toLocaleString()} pts
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${level.gradient} rounded-full transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-700">
        {[
          { id: 'personal', label: 'Datos Personales', icon: User },
          { id: 'seguridad', label: 'Seguridad', icon: Lock },
          { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
              activeTab === tab.id
                ? 'border-[#E30613] text-[#E30613]'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Información Personal
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-[#E30613] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition text-sm font-medium"
              >
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#E30613] text-white rounded-lg hover:bg-[#CC050F] transition text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Guardar cambios
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Nombre completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition"
                />
              ) : (
                <p className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-neutral-900 dark:text-white">
                  {mockUser.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-neutral-400" />
                <p className="text-neutral-900 dark:text-white">{mockUser.email}</p>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Teléfono
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-neutral-400" />
                  <p className="text-neutral-900 dark:text-white">{mockUser.phone}</p>
                </div>
              )}
            </div>

            {/* DNI */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                DNI/NIF
              </label>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neutral-400" />
                <p className="text-neutral-900 dark:text-white font-mono">{mockUser.dni}</p>
              </div>
            </div>

            {/* Dirección */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Dirección
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-neutral-400" />
                  <p className="text-neutral-900 dark:text-white">
                    {mockUser.address}, {mockUser.postalCode} {mockUser.city}
                  </p>
                </div>
              )}
            </div>

            {/* Fecha nacimiento */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Fecha de nacimiento
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-neutral-400" />
                <p className="text-neutral-900 dark:text-white">
                  {new Date(mockUser.birthDate).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'seguridad' && (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
            Seguridad de la cuenta
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg">
                  <Lock className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Contraseña</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Última actualización hace 3 meses
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 text-[#E30613] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition text-sm font-medium">
                Cambiar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg">
                  <Shield className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Verificación en dos pasos</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Añade una capa extra de seguridad
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#E30613] text-white rounded-lg hover:bg-[#CC050F] transition text-sm font-medium">
                Activar
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notificaciones' && (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
            Preferencias de notificaciones
          </h2>

          <div className="space-y-4">
            {[
              { id: 'email_renovaciones', label: 'Recordatorios de renovación', description: 'Recibe avisos antes del vencimiento de tus pólizas', checked: true },
              { id: 'email_pagos', label: 'Confirmación de pagos', description: 'Notificaciones cuando se procesen tus recibos', checked: true },
              { id: 'email_siniestros', label: 'Actualizaciones de siniestros', description: 'Estado y novedades de tus expedientes', checked: true },
              { id: 'email_ofertas', label: 'Ofertas y promociones', description: 'Descuentos exclusivos y novedades de productos', checked: false },
              { id: 'email_newsletter', label: 'Newsletter mensual', description: 'Consejos de seguros y noticias del sector', checked: false },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 dark:peer-focus:ring-red-900/20 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-[#E30613]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
