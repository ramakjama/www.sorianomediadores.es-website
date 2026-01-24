'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Trophy, Star, Users, Gift, Crown, Zap, Heart, Shield,
  ArrowRight, CheckCircle, Sparkles, Medal, Target, TrendingUp
} from 'lucide-react'

// Niveles del programa
const LEVELS = [
  {
    name: 'Bronce',
    icon: Shield,
    minPoints: 0,
    maxPoints: 999,
    discount: '0%',
    color: 'from-amber-600 to-amber-700',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    textColor: 'text-amber-700 dark:text-amber-400',
    benefits: [
      'Acceso a area de clientes',
      'Newsletter exclusiva',
      'Soporte prioritario basico',
    ],
  },
  {
    name: 'Plata',
    icon: Medal,
    minPoints: 1000,
    maxPoints: 4999,
    discount: '5%',
    color: 'from-gray-400 to-gray-500',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    textColor: 'text-gray-600 dark:text-gray-300',
    benefits: [
      '5% descuento en nuevas polizas',
      'Atencion prioritaria',
      'Acceso a webinars exclusivos',
      'Regalos por renovacion',
    ],
  },
  {
    name: 'Oro',
    icon: Trophy,
    minPoints: 5000,
    maxPoints: 14999,
    discount: '10%',
    color: 'from-yellow-400 to-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-700 dark:text-yellow-400',
    benefits: [
      '10% descuento en todas las polizas',
      'Gestor personal dedicado',
      'Invitaciones a eventos VIP',
      'Revision anual gratuita',
      'Parking gratuito en visitas',
    ],
  },
  {
    name: 'Platino',
    icon: Crown,
    minPoints: 15000,
    maxPoints: Infinity,
    discount: '15%',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-700 dark:text-purple-400',
    benefits: [
      '15% descuento permanente',
      'Linea directa con direccion',
      'Regalos exclusivos anuales',
      'Acceso beta a nuevos productos',
      'Eventos privados',
      'Servicio de conserjeria',
    ],
  },
]

// Como ganar puntos
const POINT_ACTIONS = [
  { action: 'Completar tu perfil', points: 100, icon: Users, once: true },
  { action: 'Contratar nueva poliza', points: 500, icon: Shield, once: false },
  { action: 'Renovar poliza existente', points: 300, icon: TrendingUp, once: false },
  { action: 'Referir un amigo', points: 200, icon: Heart, once: false },
  { action: 'Amigo contrata poliza', points: 500, icon: Gift, once: false },
  { action: 'Dejar una resena', points: 100, icon: Star, once: true },
  { action: 'Asistir a webinar', points: 75, icon: Zap, once: false },
  { action: 'Login diario', points: 5, icon: Sparkles, once: false },
]

// Badges disponibles
const BADGES = [
  { name: 'Early Adopter', icon: '🚀', description: 'Primeros 100 miembros', points: 100 },
  { name: 'Policy Master', icon: '🛡️', description: '5+ polizas activas', points: 250 },
  { name: 'Campeon Referidos', icon: '👥', description: '10+ amigos referidos', points: 500 },
  { name: 'Leyenda Fiel', icon: '⭐', description: '5+ anos como cliente', points: 1000 },
  { name: 'Amigo de SORI', icon: '🤖', description: '50+ conversaciones con SORI', points: 150 },
  { name: 'Sin Siniestros', icon: '🏆', description: '3 anos sin reclamaciones', points: 300 },
  { name: 'Cobertura Total', icon: '💯', description: 'Todas las coberturas', points: 400 },
  { name: 'Conductor Verde', icon: '🌱', description: 'Vehiculo electrico asegurado', points: 200 },
]

export default function ComunidadPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-occident via-occident-600 to-occident-700" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl mb-8"
            >
              <Crown className="w-10 h-10" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
              Soriano Club
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10">
              El programa de fidelidad que premia tu confianza. Gana puntos, sube de nivel
              y disfruta de beneficios exclusivos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acceso-clientes">
                <button className="px-8 py-4 bg-white text-occident font-semibold rounded-full hover:bg-white/90 transition-colors">
                  Unirme ahora
                </button>
              </Link>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-xl text-white font-semibold rounded-full hover:bg-white/30 transition-colors">
                Ver mis puntos
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating badges */}
        <motion.div
          className="absolute top-20 left-10 text-4xl"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🏆
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-4xl"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-20 text-4xl hidden lg:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          🎁
        </motion.div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-apple-white dark:bg-apple-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400 max-w-2xl mx-auto">
              Tres simples pasos para empezar a disfrutar de beneficios exclusivos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Registrate', desc: 'Crea tu cuenta de cliente y activa tu membresia automaticamente', icon: Users },
              { step: '02', title: 'Acumula puntos', desc: 'Gana puntos por cada accion: renovaciones, referidos, interacciones', icon: Star },
              { step: '03', title: 'Disfruta beneficios', desc: 'Canjea tus puntos por descuentos, regalos y experiencias exclusivas', icon: Gift },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-occident/10 dark:bg-occident/20 rounded-2xl flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-occident" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-occident text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white mb-2">{item.title}</h3>
                <p className="text-apple-gray-500 dark:text-apple-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Niveles y beneficios
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400 max-w-2xl mx-auto">
              Cuanto mas interactuas con nosotros, mejores beneficios obtienes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEVELS.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium relative overflow-hidden"
              >
                {/* Header gradient */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${level.color}`} />

                <div className="pt-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${level.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                    <level.icon className={`w-7 h-7 ${level.textColor}`} />
                  </div>

                  {/* Level name */}
                  <h3 className="text-2xl font-bold text-apple-gray-900 dark:text-apple-white mb-1">
                    {level.name}
                  </h3>

                  {/* Points range */}
                  <p className="text-sm text-apple-gray-500 dark:text-apple-gray-400 mb-2">
                    {level.minPoints.toLocaleString()} - {level.maxPoints === Infinity ? '∞' : level.maxPoints.toLocaleString()} puntos
                  </p>

                  {/* Discount */}
                  <div className={`inline-block px-3 py-1 ${level.bgColor} rounded-full mb-4`}>
                    <span className={`text-sm font-semibold ${level.textColor}`}>
                      {level.discount} descuento
                    </span>
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2">
                    {level.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-apple-gray-600 dark:text-apple-gray-400">
                        <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to earn points */}
      <section className="section-padding bg-apple-white dark:bg-apple-black">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-6">
                Gana puntos facilmente
              </h2>
              <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400 mb-8">
                Cada interaccion cuenta. Acumula puntos con acciones cotidianas y alcanza
                niveles superiores rapidamente.
              </p>

              <div className="space-y-4">
                {POINT_ACTIONS.map((item, index) => (
                  <motion.div
                    key={item.action}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-apple-gray-50 dark:bg-apple-gray-900 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-occident/10 dark:bg-occident/20 rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-occident" />
                      </div>
                      <div>
                        <p className="font-medium text-apple-gray-900 dark:text-apple-white">{item.action}</p>
                        {item.once && (
                          <span className="text-xs text-apple-gray-500">Solo una vez</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-occident">+{item.points}</span>
                      <span className="text-sm text-apple-gray-500 ml-1">pts</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Points visualization */}
              <div className="bg-gradient-to-br from-occident to-occident-600 rounded-3xl p-8 text-white">
                <div className="text-center mb-8">
                  <p className="text-white/70 mb-2">Tu saldo actual</p>
                  <p className="text-6xl font-bold">2,450</p>
                  <p className="text-white/70">puntos</p>
                </div>

                <div className="bg-white/20 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/80">Nivel actual: Plata</span>
                    <span className="text-white/80">Siguiente: Oro</span>
                  </div>
                  <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '49%' }} />
                  </div>
                  <p className="text-center text-sm text-white/70 mt-2">
                    2,550 puntos mas para Oro
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-white/70 text-sm mb-4">Descuento actual aplicado</p>
                  <p className="text-4xl font-bold">5%</p>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-apple-gray-800 rounded-2xl shadow-xl p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-green/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-apple-gray-900 dark:text-apple-white">+150 pts</p>
                    <p className="text-xs text-apple-gray-500">Esta semana</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Colecciona insignias
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400 max-w-2xl mx-auto">
              Desbloquea logros especiales y gana puntos extra
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BADGES.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-apple-white dark:bg-apple-gray-800 rounded-2xl p-6 text-center border border-apple-gray-100 dark:border-apple-gray-700 hover:border-occident/50 transition-colors"
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-apple-gray-900 dark:text-apple-white mb-1">{badge.name}</h3>
                <p className="text-xs text-apple-gray-500 dark:text-apple-gray-400 mb-2">{badge.description}</p>
                <span className="text-sm font-bold text-occident">+{badge.points} pts</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-apple-white dark:bg-apple-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-occident/10 dark:bg-occident/20 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-occident" />
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-6">
              Empieza a ganar hoy
            </h2>

            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400 mb-10 max-w-2xl mx-auto">
              Unete a Soriano Club y comienza a disfrutar de beneficios exclusivos
              desde el primer dia. Es gratis y automatico para todos nuestros clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acceso-clientes">
                <button className="btn-primary group">
                  <span className="flex items-center gap-2">
                    Crear mi cuenta
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              <Link href="/contacto">
                <button className="btn-secondary">
                  Tengo dudas
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
