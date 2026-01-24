'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Briefcase, Shield, Stethoscope, Car, Building2, Scale,
  ArrowRight, CheckCircle, Phone, Sparkles, Target, TrendingUp
} from 'lucide-react'
import { COMPANY_INFO, TESTIMONIALS_CATEGORIZED } from '@/lib/constants'

const products = [
  {
    key: 'rc-profesional',
    name: 'RC Profesional',
    icon: Scale,
    description: 'Proteccion ante reclamaciones por errores u omisiones en tu actividad',
    from: '150',
    features: ['Defensa juridica', 'Reclamaciones de terceros', 'Cobertura retroactiva'],
    color: 'from-indigo-500 to-indigo-600',
    popular: true,
  },
  {
    key: 'multirriesgo',
    name: 'Multirriesgo Autonomos',
    icon: Building2,
    description: 'Todo en uno: local, contenido, RC y mucho mas',
    from: '250',
    features: ['Local y contenido', 'Robo y danos', 'Perdida de beneficios'],
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    key: 'salud-autonomos',
    name: 'Seguro de Salud',
    icon: Stethoscope,
    description: 'Cuidate para poder cuidar de tu negocio',
    from: '45',
    period: 'mes',
    features: ['Cuadro medico completo', 'Videoconsulta 24h', 'Deducible como gasto'],
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    key: 'vehiculo-profesional',
    name: 'Vehiculo Profesional',
    icon: Car,
    description: 'Tu vehiculo de trabajo con coberturas especificas',
    from: '320',
    features: ['Uso profesional cubierto', 'Herramientas incluidas', 'Asistencia 24/7'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    key: 'accidentes',
    name: 'Accidentes Laborales',
    icon: Shield,
    description: 'Proteccion ante accidentes durante tu actividad profesional',
    from: '12',
    period: 'mes',
    features: ['Invalidez temporal', 'Invalidez permanente', 'Gastos medicos'],
    color: 'from-rose-500 to-rose-600',
  },
  {
    key: 'vida-autonomo',
    name: 'Vida Key Person',
    icon: Briefcase,
    description: 'Protege tu negocio y a tu familia ante imprevistos',
    from: '15',
    period: 'mes',
    features: ['Capital flexible', 'Cobertura hipoteca', 'Enfermedades graves'],
    color: 'from-purple-500 to-purple-600',
  },
]

const benefits = [
  { icon: Target, title: 'Asesoramiento especializado', desc: 'Expertos en seguros para autonomos y profesionales' },
  { icon: TrendingUp, title: 'Optimizacion fiscal', desc: 'Todos nuestros seguros son deducibles como gasto' },
  { icon: Shield, title: 'Coberturas a medida', desc: 'Adaptamos cada poliza a tu actividad especifica' },
  { icon: Sparkles, title: 'Gestion integral', desc: 'Un solo interlocutor para todos tus seguros' },
]

export default function AutonomosPage() {
  const testimonials = TESTIMONIALS_CATEGORIZED.autonomos

  return (
    <>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-apple-white to-apple-white dark:from-indigo-950/20 dark:via-apple-black dark:to-apple-black" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-8">
              <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Seguros para Autonomos</span>
            </div>

            <h1 className="text-headline mb-8">
              Tu negocio{' '}
              <span className="gradient-text">protegido</span>
            </h1>

            <p className="text-subheadline max-w-2xl mx-auto mb-10">
              Soluciones de seguro disenadas para profesionales independientes.
              Protege tu actividad, tu patrimonio y tu tranquilidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <button className="btn-primary group">
                  <span className="flex items-center gap-2">
                    Solicitar presupuesto
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                <button className="btn-secondary">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar ahora
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-apple-gray-50 dark:bg-apple-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-apple-white dark:bg-apple-gray-800 rounded-2xl"
              >
                <div className="w-12 h-12 bg-occident/10 dark:bg-occident/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-occident" />
                </div>
                <div>
                  <h3 className="font-semibold text-apple-gray-900 dark:text-apple-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-apple-gray-500 dark:text-apple-gray-400">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-apple-white dark:bg-apple-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Seguros para tu actividad
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400">
              Coberturas especificas para profesionales autonomos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 bg-occident text-white text-xs font-semibold rounded-full">
                      Mas solicitado
                    </span>
                  </div>
                )}

                <div className={`card-premium h-full flex flex-col ${product.popular ? 'ring-2 ring-occident' : ''}`}>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <product.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-apple-gray-500 dark:text-apple-gray-400 mb-4 flex-1">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-apple-gray-600 dark:text-apple-gray-400">
                        <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-apple-gray-100 dark:border-apple-gray-800 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-apple-gray-500">Desde</span>
                      <p className="text-2xl font-bold text-apple-gray-900 dark:text-apple-white">
                        {product.from}€
                        <span className="text-sm font-normal text-apple-gray-500">/{product.period || 'ano'}</span>
                      </p>
                    </div>
                    <Link href="/contacto">
                      <button className="px-4 py-2 bg-apple-gray-100 dark:bg-apple-gray-800 hover:bg-occident hover:text-white text-apple-gray-900 dark:text-apple-white rounded-full text-sm font-medium transition-colors">
                        Cotizar
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Autonomos que confian en nosotros
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400">
              Profesionales como tu que ya protegen su actividad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-apple-gray-600 dark:text-apple-gray-400 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-apple-gray-100 dark:border-apple-gray-800">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-apple-gray-900 dark:text-apple-white">{testimonial.name}</p>
                    <p className="text-sm text-apple-gray-500">{testimonial.profession} - {testimonial.location}</p>
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-xs text-indigo-600 dark:text-indigo-400">
                  <Briefcase className="w-3 h-3" />
                  {testimonial.product}
                </div>
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
            className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-12 text-center text-white"
          >
            <Briefcase className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Tu actividad merece la mejor proteccion
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Hablemos de tus necesidades. Te asesoramos sin compromiso sobre las mejores opciones para tu perfil profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-white/90 transition-colors">
                  Solicitar asesoria gratuita
                </button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                <button className="px-8 py-4 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  {COMPANY_INFO.phone}
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
