'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Car,
  Home,
  Heart,
  Stethoscope,
  Shield,
  PiggyBank,
  Building2,
  Download,
  Eye,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Search,
  Filter,
  Plus
} from 'lucide-react'

// Mock data - en producción vendría de la API
const mockPolicies = [
  {
    id: '1',
    policyNumber: 'POL-AUTO-2024-0001',
    type: 'AUTO',
    status: 'ACTIVA',
    description: 'Seguro Todo Riesgo - Seat León 2021',
    premium: 478.35,
    paymentFrequency: 'anual',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    nextPayment: '2025-01-15',
    metadata: {
      vehicle: 'Seat León 2.0 TDI',
      plate: '1234 ABC',
      coverage: 'Todo Riesgo sin franquicia'
    }
  },
  {
    id: '2',
    policyNumber: 'POL-HOGAR-2024-0002',
    type: 'HOGAR',
    status: 'ACTIVA',
    description: 'Seguro Hogar Completo - Villajoyosa',
    premium: 297.64,
    paymentFrequency: 'anual',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    nextPayment: '2025-02-01',
    metadata: {
      address: 'Calle Mayor 15, Villajoyosa',
      sqMeters: 120,
      coverage: 'Hogar Completo'
    }
  },
  {
    id: '3',
    policyNumber: 'POL-VIDA-2023-0001',
    type: 'VIDA',
    status: 'ACTIVA',
    description: 'Seguro de Vida - Capital 100.000€',
    premium: 300.00,
    paymentFrequency: 'trimestral',
    startDate: '2023-06-01',
    endDate: '2033-06-01',
    nextPayment: '2025-03-01',
    metadata: {
      capital: 100000,
      beneficiaries: 'Cónyuge e hijos',
      coverage: 'Vida + Invalidez'
    }
  },
  {
    id: '4',
    policyNumber: 'POL-SALUD-2024-0001',
    type: 'SALUD',
    status: 'PENDIENTE',
    description: 'Seguro de Salud Familiar',
    premium: 89.90,
    paymentFrequency: 'mensual',
    startDate: '2025-02-01',
    endDate: '2026-02-01',
    nextPayment: '2025-02-01',
    metadata: {
      insured: 4,
      coverage: 'Salud Completo con copago'
    }
  },
]

const policyTypeConfig: Record<string, { icon: React.ElementType; color: string; gradient: string; label: string }> = {
  AUTO: { icon: Car, color: 'text-blue-600', gradient: 'from-blue-500 to-blue-600', label: 'Coche' },
  HOGAR: { icon: Home, color: 'text-emerald-600', gradient: 'from-emerald-500 to-emerald-600', label: 'Hogar' },
  VIDA: { icon: Heart, color: 'text-rose-600', gradient: 'from-rose-500 to-rose-600', label: 'Vida' },
  SALUD: { icon: Stethoscope, color: 'text-purple-600', gradient: 'from-purple-500 to-purple-600', label: 'Salud' },
  DECESOS: { icon: Shield, color: 'text-neutral-600', gradient: 'from-neutral-500 to-neutral-600', label: 'Decesos' },
  AHORRO: { icon: PiggyBank, color: 'text-amber-600', gradient: 'from-amber-500 to-amber-600', label: 'Ahorro' },
  RC_PROFESIONAL: { icon: Building2, color: 'text-indigo-600', gradient: 'from-indigo-500 to-indigo-600', label: 'RC Profesional' },
  MULTIRRIESGO: { icon: Shield, color: 'text-teal-600', gradient: 'from-teal-500 to-teal-600', label: 'Multirriesgo' },
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  ACTIVA: { label: 'Activa', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle2 },
  PENDIENTE: { label: 'Pendiente', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
  VENCIDA: { label: 'Vencida', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: AlertTriangle },
  EN_RENOVACION: { label: 'En Renovación', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Clock },
  CANCELADA: { label: 'Cancelada', color: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400', icon: AlertTriangle },
}

export default function PolizasPage() {
  const [filter, setFilter] = useState('todas')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesFilter = filter === 'todas' || policy.status === filter || policy.type === filter
    const matchesSearch =
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: mockPolicies.length,
    activas: mockPolicies.filter(p => p.status === 'ACTIVA').length,
    primaTotal: mockPolicies
      .filter(p => p.status === 'ACTIVA')
      .reduce((sum, p) => sum + p.premium, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Mis Pólizas
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Gestiona todas tus pólizas de seguros
          </p>
        </div>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E30613] text-white rounded-xl hover:bg-[#CC050F] transition font-medium"
        >
          <Plus className="w-5 h-5" />
          Solicitar nueva póliza
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Total Pólizas</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Pólizas Activas</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.activas}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#E30613]/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-[#E30613]" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Prima Anual Total</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.primaTotal.toFixed(2)}€</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por número o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition cursor-pointer"
        >
          <option value="todas">Todas las pólizas</option>
          <option value="ACTIVA">Solo activas</option>
          <option value="PENDIENTE">Pendientes</option>
          <option value="AUTO">Coche</option>
          <option value="HOGAR">Hogar</option>
          <option value="VIDA">Vida</option>
          <option value="SALUD">Salud</option>
        </select>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolicies.map((policy) => {
          const typeConfig = policyTypeConfig[policy.type] || policyTypeConfig.AUTO
          const status = statusConfig[policy.status] || statusConfig.ACTIVA
          const TypeIcon = typeConfig.icon
          const StatusIcon = status.icon

          return (
            <div
              key={policy.id}
              className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header con gradiente */}
              <div className={`bg-gradient-to-r ${typeConfig.gradient} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <TypeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Seguro de {typeConfig.label}</p>
                      <p className="font-mono text-sm">{policy.policyNumber}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/20`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                  {policy.description}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-neutral-500 dark:text-neutral-400">Prima</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {policy.premium.toFixed(2)}€/{policy.paymentFrequency}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500 dark:text-neutral-400">Próximo pago</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {new Date(policy.nextPayment).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500 dark:text-neutral-400">Vigencia desde</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {new Date(policy.startDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500 dark:text-neutral-400">Vigencia hasta</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {new Date(policy.endDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    Ver detalles
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#E30613] text-white rounded-lg hover:bg-[#CC050F] transition text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredPolicies.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <FileText className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">
            No se encontraron pólizas con los filtros aplicados
          </p>
        </div>
      )}
    </div>
  )
}
