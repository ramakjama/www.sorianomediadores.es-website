'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileText, AlertTriangle, CreditCard, Trophy, ArrowRight,
  TrendingUp, Shield, Clock, ChevronRight, Sparkles, Plus
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePolicies, usePolicyStats } from '@/hooks/usePolicies'
import { useClaims } from '@/hooks/useClaims'
import { useGamificationStats } from '@/hooks/useGamification'

const quickActions = [
  { name: 'Nueva poliza', href: '/contacto', icon: Plus, color: 'bg-blue-500' },
  { name: 'Comunicar siniestro', href: '/siniestros/nuevo', icon: AlertTriangle, color: 'bg-amber-500' },
  { name: 'Ver documentos', href: '/documentos', icon: FileText, color: 'bg-emerald-500' },
  { name: 'Soriano Club', href: '/soriano-club', icon: Trophy, color: 'bg-violet-500' },
]

const levelBenefits = {
  BRONCE: { discount: 0, color: 'from-amber-600 to-amber-700' },
  PLATA: { discount: 5, color: 'from-slate-400 to-slate-500' },
  ORO: { discount: 10, color: 'from-yellow-400 to-yellow-500' },
  PLATINO: { discount: 15, color: 'from-violet-400 to-violet-500' },
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const { data: policies, isLoading: policiesLoading } = usePolicies()
  const { data: claims, isLoading: claimsLoading } = useClaims()
  const { data: gamification, isLoading: gamificationLoading } = useGamificationStats()

  const activePolicies = policies?.filter(p => p.status === 'ACTIVA') || []
  const pendingClaims = claims?.filter(c => c.status !== 'RESUELTO' && c.status !== 'RECHAZADO') || []
  const userLevel = (session?.user?.level as keyof typeof levelBenefits) || 'BRONCE'

  const stats = [
    {
      name: 'Polizas activas',
      value: activePolicies.length,
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Siniestros en curso',
      value: pendingClaims.length,
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      name: 'Puntos acumulados',
      value: gamification?.points?.toLocaleString() || '0',
      icon: Sparkles,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
    },
    {
      name: 'Descuento actual',
      value: `${levelBenefits[userLevel].discount}%`,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-occident to-occident-600 rounded-3xl p-8 text-white"
      >
        <h2 className="text-2xl font-semibold mb-2">
          Hola, {session?.user?.name?.split(' ')[0] || 'Usuario'}
        </h2>
        <p className="text-white/80 mb-6">
          Bienvenido a tu area de cliente. Aqui puedes gestionar tus polizas, siniestros y mucho mas.
        </p>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link key={action.name} href={action.href}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                <action.icon className="w-4 h-4" />
                {action.name}
              </motion.button>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl p-6 border border-apple-gray-100 dark:border-apple-gray-800"
          >
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-apple-gray-900 dark:text-apple-white">
              {stat.value}
            </p>
            <p className="text-sm text-apple-gray-500 dark:text-apple-gray-400">
              {stat.name}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-apple-gray-100 dark:border-apple-gray-800">
            <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-apple-white">
              Mis Polizas
            </h3>
            <Link
              href="/polizas"
              className="flex items-center gap-1 text-sm text-occident hover:underline"
            >
              Ver todas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {policiesLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-20 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : activePolicies.length > 0 ? (
              activePolicies.slice(0, 3).map((policy) => (
                <Link key={policy.id} href={`/polizas/${policy.id}`}>
                  <div className="flex items-center gap-4 p-4 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-xl hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700 transition-colors group">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-apple-gray-900 dark:text-apple-white truncate">
                        {policy.description || `Poliza ${policy.type}`}
                      </p>
                      <p className="text-sm text-apple-gray-500">
                        {policy.policyNumber}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-apple-gray-400 group-hover:text-occident transition-colors" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-apple-gray-300 dark:text-apple-gray-600 mx-auto mb-3" />
                <p className="text-apple-gray-500 dark:text-apple-gray-400">
                  No tienes polizas activas
                </p>
                <Link href="/contacto">
                  <button className="mt-4 px-4 py-2 bg-occident text-white rounded-xl text-sm font-medium hover:bg-occident-600 transition-colors">
                    Solicitar presupuesto
                  </button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Claims */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-apple-gray-100 dark:border-apple-gray-800">
            <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-apple-white">
              Siniestros en curso
            </h3>
            <Link
              href="/siniestros"
              className="flex items-center gap-1 text-sm text-occident hover:underline"
            >
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {claimsLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-20 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : pendingClaims.length > 0 ? (
              pendingClaims.slice(0, 3).map((claim) => (
                <Link key={claim.id} href={`/siniestros/${claim.id}`}>
                  <div className="flex items-center gap-4 p-4 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-xl hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700 transition-colors group">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-apple-gray-900 dark:text-apple-white truncate">
                        {claim.type}
                      </p>
                      <p className="text-sm text-apple-gray-500">
                        {claim.claimNumber} - {claim.status}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-apple-gray-400 group-hover:text-occident transition-colors" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-apple-gray-300 dark:text-apple-gray-600 mx-auto mb-3" />
                <p className="text-apple-gray-500 dark:text-apple-gray-400">
                  No tienes siniestros en curso
                </p>
                <p className="text-sm text-apple-gray-400 dark:text-apple-gray-500 mt-1">
                  Excelente! Sigue asi
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Soriano Club Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${levelBenefits[userLevel].color} rounded-xl flex items-center justify-center text-white`}>
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-apple-white">
                Soriano Club
              </h3>
              <p className="text-sm text-apple-gray-500">
                Nivel {userLevel}
              </p>
            </div>
          </div>
          <Link
            href="/soriano-club"
            className="flex items-center gap-2 px-4 py-2 bg-occident text-white rounded-xl text-sm font-medium hover:bg-occident-600 transition-colors"
          >
            Ver detalles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {gamification && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-apple-gray-500">Progreso hacia {gamification.nextLevel || 'nivel maximo'}</span>
                <span className="font-medium text-apple-gray-900 dark:text-apple-white">
                  {gamification.pointsToNextLevel > 0
                    ? `${gamification.pointsToNextLevel} pts restantes`
                    : 'Nivel maximo alcanzado'}
                </span>
              </div>
              <div className="h-3 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${gamification.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full bg-gradient-to-r ${levelBenefits[userLevel].color} rounded-full`}
                />
              </div>
            </div>

            {gamification.badges.length > 0 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-apple-gray-500">Insignias:</span>
                <div className="flex -space-x-2">
                  {gamification.badges.slice(0, 5).map((badge) => (
                    <div
                      key={badge.id}
                      className="w-8 h-8 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 border-2 border-apple-white dark:border-apple-gray-900 flex items-center justify-center text-xs"
                      title={badge.name}
                      style={{ backgroundColor: badge.color + '20', color: badge.color }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                  ))}
                  {gamification.badges.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 border-2 border-apple-white dark:border-apple-gray-900 flex items-center justify-center text-xs font-medium text-apple-gray-500">
                      +{gamification.badges.length - 5}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
