'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Users, Award, Phone, CheckCircle } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    title: 'Mediador Autorizado',
    description: 'Registro DGSFP',
    color: 'text-primary-500',
    bg: 'bg-primary-50',
  },
  {
    icon: Clock,
    title: 'Atención 24/7',
    description: 'Siempre disponibles',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Users,
    title: '+4 Millones',
    description: 'Clientes satisfechos',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Award,
    title: '25+ Años',
    description: 'De experiencia',
    color: 'text-accent-gold',
    bg: 'bg-amber-50',
  },
  {
    icon: Phone,
    title: 'Sin Compromiso',
    description: 'Presupuesto gratis',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: CheckCircle,
    title: '8.4/10',
    description: 'Nota satisfacción',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
]

export function TrustBadges() {
  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 ${badge.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
              </div>
              <div>
                <div className="text-sm font-semibold text-soriano-dark">{badge.title}</div>
                <div className="text-xs text-soriano-gray">{badge.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
