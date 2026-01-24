'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AlertTriangle, Plus, Search, Filter, ChevronRight,
  CheckCircle, Clock, FileText, MessageCircle, Phone
} from 'lucide-react'
import { useClaims } from '@/hooks/useClaims'
import { cn } from '@/lib/utils'
import { COMPANY_INFO } from '@/lib/constants'

const statusConfig = {
  COMUNICADO: {
    label: 'Comunicado',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    step: 1,
  },
  DOCUMENTACION: {
    label: 'Documentación',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    step: 2,
  },
  EN_REVISION: {
    label: 'En revisión',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    step: 3,
  },
  APROBADO: {
    label: 'Aprobado',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    step: 4,
  },
  EN_PROCESO: {
    label: 'En proceso',
    color: 'bg-cyan-500',
    textColor: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    step: 5,
  },
  RESUELTO: {
    label: 'Resuelto',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    step: 6,
  },
  RECHAZADO: {
    label: 'Rechazado',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
    step: -1,
  },
}

const allSteps = ['COMUNICADO', 'DOCUMENTACION', 'EN_REVISION', 'APROBADO', 'EN_PROCESO', 'RESUELTO']

function ClaimTimeline({ currentStatus }: { currentStatus: string }) {
  const currentStep = statusConfig[currentStatus as keyof typeof statusConfig]?.step || 1
  const isRejected = currentStatus === 'RECHAZADO'

  return (
    <div className="flex items-center justify-between mt-4">
      {allSteps.map((step, index) => {
        const stepNum = index + 1
        const isActive = stepNum <= currentStep && !isRejected
        const isCurrent = stepNum === currentStep && !isRejected
        const config = statusConfig[step as keyof typeof statusConfig]

        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  isActive
                    ? `${config.color} text-white`
                    : 'bg-apple-gray-200 dark:bg-apple-gray-700 text-apple-gray-500',
                  isCurrent && 'ring-4 ring-offset-2 ring-offset-apple-white dark:ring-offset-apple-gray-900 ring-current'
                )}
              >
                {isActive ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  stepNum
                )}
              </motion.div>
              <span className={cn(
                'text-xs mt-1 hidden sm:block',
                isActive ? 'text-apple-gray-900 dark:text-apple-white' : 'text-apple-gray-400'
              )}>
                {config.label}
              </span>
            </div>
            {index < allSteps.length - 1 && (
              <div className={cn(
                'flex-1 h-1 mx-2 rounded',
                stepNum < currentStep && !isRejected
                  ? 'bg-emerald-500'
                  : 'bg-apple-gray-200 dark:bg-apple-gray-700'
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function SiniestrosPage() {
  const { data: claims, isLoading } = useClaims()
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredClaims = claims?.filter(claim => {
    if (filter !== 'all' && claim.status !== filter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        claim.claimNumber.toLowerCase().includes(query) ||
        claim.type.toLowerCase().includes(query) ||
        claim.description.toLowerCase().includes(query)
      )
    }
    return true
  })

  const pendingCount = claims?.filter(c => c.status !== 'RESUELTO' && c.status !== 'RECHAZADO').length || 0
  const resolvedCount = claims?.filter(c => c.status === 'RESUELTO').length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-apple-gray-900 dark:text-apple-white">
            Mis Siniestros
          </h1>
          <p className="text-apple-gray-500 mt-1">
            {pendingCount} en curso, {resolvedCount} resueltos
          </p>
        </div>
        <Link href="/siniestros/nuevo">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-3 bg-occident text-white rounded-xl font-medium hover:bg-occident-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Comunicar siniestro
          </motion.button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-gray-400" />
          <input
            type="text"
            placeholder="Buscar por número, tipo o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-apple-white dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 rounded-xl text-apple-gray-900 dark:text-apple-white placeholder-apple-gray-500 focus:outline-none focus:ring-2 focus:ring-occident/30"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
              filter === 'all'
                ? 'bg-occident text-white'
                : 'bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-600 dark:text-apple-gray-400 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-700'
            )}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('EN_PROCESO')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
              filter === 'EN_PROCESO'
                ? 'bg-cyan-500 text-white'
                : 'bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-600 dark:text-apple-gray-400 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-700'
            )}
          >
            En proceso
          </button>
          <button
            onClick={() => setFilter('RESUELTO')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
              filter === 'RESUELTO'
                ? 'bg-green-500 text-white'
                : 'bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-600 dark:text-apple-gray-400 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-700'
            )}
          >
            Resueltos
          </button>
        </div>
      </div>

      {/* Claims list */}
      <div className="space-y-4">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-2xl animate-pulse" />
          ))
        ) : filteredClaims && filteredClaims.length > 0 ? (
          filteredClaims.map((claim, index) => {
            const config = statusConfig[claim.status as keyof typeof statusConfig] || statusConfig.COMUNICADO

            return (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', config.bgColor)}>
                      <AlertTriangle className={cn('w-6 h-6', config.textColor)} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-apple-gray-900 dark:text-apple-white">
                        {claim.type}
                      </h3>
                      <p className="text-sm text-apple-gray-500">
                        {claim.claimNumber} - Poliza {claim.policy.policyNumber}
                      </p>
                    </div>
                  </div>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    config.bgColor,
                    config.textColor
                  )}>
                    {config.label}
                  </span>
                </div>

                <p className="text-apple-gray-600 dark:text-apple-gray-400 text-sm mb-4 line-clamp-2">
                  {claim.description}
                </p>

                {/* Timeline */}
                <ClaimTimeline currentStatus={claim.status} />

                {/* Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-apple-gray-100 dark:border-apple-gray-800">
                  <div className="flex items-center gap-2 text-sm text-apple-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>
                      Comunicado el {new Date(claim.reportedDate).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${COMPANY_INFO.phoneClean}`}
                      className="p-2 rounded-xl hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 text-apple-gray-500 hover:text-occident transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                    <Link
                      href={`/siniestros/${claim.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-apple-gray-100 dark:bg-apple-gray-800 hover:bg-occident hover:text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      Ver detalles <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800"
          >
            <AlertTriangle className="w-16 h-16 text-apple-gray-300 dark:text-apple-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-apple-white mb-2">
              No hay siniestros
            </h3>
            <p className="text-apple-gray-500 mb-6">
              {searchQuery || filter !== 'all'
                ? 'No se encontraron siniestros con los filtros aplicados'
                : 'Excelente! No tienes siniestros registrados'}
            </p>
            <Link href="/siniestros/nuevo">
              <button className="px-6 py-3 bg-occident text-white rounded-xl font-medium hover:bg-occident-600 transition-colors">
                Comunicar siniestro
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
