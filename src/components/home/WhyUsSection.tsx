'use client'

import { motion } from 'framer-motion'
import {
  Handshake, Eye, Award, HeadphonesIcon, Zap, Heart,
  CheckCircle, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const reasons = [
  {
    icon: Handshake,
    title: 'Prometer es cumplir',
    description: 'Nuestra palabra es nuestro contrato. Lo que prometemos, lo cumplimos con diligencia y dedicación.',
    color: 'text-primary-500',
    bg: 'bg-primary-50',
  },
  {
    icon: Eye,
    title: 'Transparencia total',
    description: 'Sin letra pequeña ni sorpresas. Te explicamos cada detalle de tu póliza para que tomes decisiones informadas.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Award,
    title: '25+ años de experiencia',
    description: 'Décadas protegiendo familias y empresas nos avalan. La experiencia es nuestro mejor aval.',
    color: 'text-accent-gold',
    bg: 'bg-amber-50',
  },
  {
    icon: HeadphonesIcon,
    title: 'Atención personalizada',
    description: 'No eres un número de póliza. Te conocemos, te escuchamos y adaptamos cada solución a ti.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Zap,
    title: 'Gestión ágil de siniestros',
    description: 'Cuando más nos necesitas, más rápido actuamos. Nos encargamos de todo para que tú no te preocupes.',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
  },
  {
    icon: Heart,
    title: 'Compromiso con el cliente',
    description: 'Tu tranquilidad es nuestra prioridad. Trabajamos para ti, no para la aseguradora.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
]

export function WhyUsSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <CheckCircle className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Por qué elegirnos</span>
            </div>

            <h2 className="text-display-md md:text-display-lg font-display font-bold text-soriano-dark mb-6">
              Más que mediadores,{' '}
              <span className="gradient-text">tu equipo de confianza</span>
            </h2>

            <p className="text-lg text-soriano-gray mb-8">
              En Soriano Mediadores no vendemos seguros, construimos relaciones duraderas
              basadas en la confianza, la transparencia y el compromiso genuino con tu bienestar.
            </p>

            <div className="grid gap-4 mb-8">
              {['Asesoramiento sin compromiso', 'Comparamos las mejores opciones', 'Te acompañamos siempre'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-soriano-dark font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/nosotros">
              <button className="btn-primary group">
                <span className="flex items-center gap-2">
                  Conoce nuestra historia
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Right - Features grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-black/5 border border-transparent hover:border-gray-100 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${reason.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <reason.icon className={`w-6 h-6 ${reason.color}`} />
                </div>
                <h3 className="text-lg font-bold text-soriano-dark mb-2">{reason.title}</h3>
                <p className="text-sm text-soriano-gray">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
