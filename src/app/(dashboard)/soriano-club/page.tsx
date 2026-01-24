'use client'

import { motion } from 'framer-motion'
import {
  Trophy, Sparkles, Users, Gift, Star, ChevronRight,
  Shield, CheckCircle, Lock, TrendingUp, Award
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useGamificationStats, useLeaderboard, useBadges } from '@/hooks/useGamification'
import { cn } from '@/lib/utils'

const levelConfig = {
  BRONCE: {
    name: 'Bronce',
    icon: Shield,
    color: 'from-amber-600 to-amber-700',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    minPoints: 0,
    maxPoints: 999,
    discount: 0,
    benefits: ['Acceso basico', 'Asistente SORI', 'Area de cliente'],
  },
  PLATA: {
    name: 'Plata',
    icon: Star,
    color: 'from-slate-400 to-slate-500',
    textColor: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
    minPoints: 1000,
    maxPoints: 4999,
    discount: 5,
    benefits: ['5% descuento', 'Prioridad atencion', 'Ofertas exclusivas'],
  },
  ORO: {
    name: 'Oro',
    icon: Award,
    color: 'from-yellow-400 to-yellow-500',
    textColor: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    minPoints: 5000,
    maxPoints: 14999,
    discount: 10,
    benefits: ['10% descuento', 'Gestor dedicado', 'Eventos VIP'],
  },
  PLATINO: {
    name: 'Platino',
    icon: Trophy,
    color: 'from-violet-400 to-violet-500',
    textColor: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    minPoints: 15000,
    maxPoints: Infinity,
    discount: 15,
    benefits: ['15% descuento', 'Linea directa', 'Regalos exclusivos', 'Prioridad maxima'],
  },
}

const pointsActions = [
  { action: 'Nueva poliza', points: 500, icon: Shield },
  { action: 'Renovacion', points: 300, icon: CheckCircle },
  { action: 'Referido registrado', points: 200, icon: Users },
  { action: 'Referido convierte', points: 500, icon: Gift },
  { action: 'Perfil completo', points: 100, icon: Star },
  { action: 'Chat con SORI', points: 10, icon: Sparkles },
]

export default function SorianoClubPage() {
  const { data: session } = useSession()
  const { data: stats, isLoading: statsLoading } = useGamificationStats()
  const { data: leaderboardData, isLoading: leaderboardLoading } = useLeaderboard()
  const { data: badgesData, isLoading: badgesLoading } = useBadges()

  const userLevel = (session?.user?.level as keyof typeof levelConfig) || 'BRONCE'
  const currentLevelConfig = levelConfig[userLevel]
  const levels = Object.entries(levelConfig)

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'bg-gradient-to-br text-white rounded-3xl p-8',
          currentLevelConfig.color
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <currentLevelConfig.icon className="w-6 h-6" />
              <span className="text-sm font-medium text-white/80">
                Nivel {currentLevelConfig.name}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {stats?.points?.toLocaleString() || 0} puntos
            </h1>
            <p className="text-white/80">
              {stats?.pointsToNextLevel && stats.pointsToNextLevel > 0
                ? `${stats.pointsToNextLevel.toLocaleString()} puntos para nivel ${stats.nextLevel}`
                : 'Has alcanzado el nivel maximo!'}
            </p>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            <Trophy className="w-10 h-10" />
          </div>
        </div>

        {/* Progress bar */}
        {stats?.progress !== undefined && stats.nextLevel && (
          <div className="mt-6">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-white/60">
              <span>{currentLevelConfig.name}</span>
              <span>{stats.nextLevel}</span>
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800 p-6"
        >
          <h2 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white mb-6">
            Niveles y beneficios
          </h2>
          <div className="space-y-4">
            {levels.map(([key, level], index) => {
              const isCurrentLevel = key === userLevel
              const isUnlocked = stats?.points !== undefined && stats.points >= level.minPoints

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border transition-all',
                    isCurrentLevel
                      ? 'border-occident bg-occident/5'
                      : 'border-apple-gray-100 dark:border-apple-gray-800',
                    !isUnlocked && 'opacity-60'
                  )}
                >
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center',
                    isUnlocked ? level.bgColor : 'bg-apple-gray-100 dark:bg-apple-gray-800'
                  )}>
                    {isUnlocked ? (
                      <level.icon className={cn('w-7 h-7', level.textColor)} />
                    ) : (
                      <Lock className="w-6 h-6 text-apple-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={cn(
                        'font-semibold',
                        isUnlocked
                          ? 'text-apple-gray-900 dark:text-apple-white'
                          : 'text-apple-gray-400'
                      )}>
                        {level.name}
                      </h3>
                      {isCurrentLevel && (
                        <span className="px-2 py-0.5 bg-occident text-white text-xs rounded-full">
                          Actual
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-apple-gray-500">
                      {level.minPoints.toLocaleString()} - {level.maxPoints === Infinity ? '∞' : level.maxPoints.toLocaleString()} pts
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'text-2xl font-bold',
                      isUnlocked ? level.textColor : 'text-apple-gray-400'
                    )}>
                      {level.discount}%
                    </p>
                    <p className="text-xs text-apple-gray-500">descuento</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Earn points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800 p-6"
        >
          <h2 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white mb-6">
            Como ganar puntos
          </h2>
          <div className="space-y-3">
            {pointsActions.map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-xl"
              >
                <div className="w-10 h-10 bg-occident/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-occident" />
                </div>
                <span className="flex-1 text-sm text-apple-gray-700 dark:text-apple-gray-300">
                  {item.action}
                </span>
                <span className="font-bold text-occident">+{item.points}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800 p-6"
      >
        <h2 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white mb-6">
          Insignias
        </h2>
        {badgesLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-32 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : badgesData?.badges && badgesData.badges.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {badgesData.badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'flex flex-col items-center p-4 rounded-xl border text-center',
                  badge.earned
                    ? 'border-transparent'
                    : 'border-apple-gray-100 dark:border-apple-gray-800 opacity-50 grayscale'
                )}
                style={{
                  backgroundColor: badge.earned ? badge.color + '10' : undefined,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: badge.earned ? badge.color + '20' : undefined,
                  }}
                >
                  {badge.earned ? (
                    <Sparkles className="w-7 h-7" style={{ color: badge.color }} />
                  ) : (
                    <Lock className="w-6 h-6 text-apple-gray-400" />
                  )}
                </div>
                <h3 className="font-medium text-sm text-apple-gray-900 dark:text-apple-white">
                  {badge.name}
                </h3>
                <p className="text-xs text-apple-gray-500 mt-1">
                  {badge.earned ? badge.description : badge.requirement}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-apple-gray-500 py-8">
            No hay insignias disponibles
          </p>
        )}
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-apple-white dark:bg-apple-gray-900 rounded-2xl border border-apple-gray-100 dark:border-apple-gray-800 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white">
            Ranking
          </h2>
          {leaderboardData?.userRank && (
            <span className="text-sm text-apple-gray-500">
              Tu posicion: <span className="font-bold text-occident">#{leaderboardData.userRank}</span>
            </span>
          )}
        </div>
        {leaderboardLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : leaderboardData?.leaderboard && leaderboardData.leaderboard.length > 0 ? (
          <div className="space-y-2">
            {leaderboardData.leaderboard.slice(0, 10).map((entry, index) => {
              const entryLevel = levelConfig[entry.level as keyof typeof levelConfig] || levelConfig.BRONCE

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'flex items-center gap-4 p-3 rounded-xl',
                    entry.isCurrentUser
                      ? 'bg-occident/10 border border-occident'
                      : 'bg-apple-gray-50 dark:bg-apple-gray-800'
                  )}
                >
                  <span className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                    entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    entry.rank === 2 ? 'bg-slate-300 text-slate-700' :
                    entry.rank === 3 ? 'bg-amber-600 text-amber-100' :
                    'bg-apple-gray-200 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-400'
                  )}>
                    {entry.rank}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-apple-gray-200 dark:bg-apple-gray-700 flex items-center justify-center">
                    {entry.avatar ? (
                      <img src={entry.avatar} alt="" className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      <Users className="w-5 h-5 text-apple-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-medium truncate',
                      entry.isCurrentUser
                        ? 'text-occident'
                        : 'text-apple-gray-900 dark:text-apple-white'
                    )}>
                      {entry.name || 'Usuario'}
                      {entry.isCurrentUser && ' (Tu)'}
                    </p>
                    <p className="text-xs text-apple-gray-500">
                      {entry.badgesCount} insignias
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-apple-gray-900 dark:text-apple-white">
                      {entry.points.toLocaleString()}
                    </p>
                    <p className={cn('text-xs', entryLevel.textColor)}>
                      {entryLevel.name}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-apple-gray-500 py-8">
            No hay datos del ranking disponibles
          </p>
        )}
      </motion.div>
    </div>
  )
}
