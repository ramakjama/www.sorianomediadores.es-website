'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Car, Home, Heart, Stethoscope, PiggyBank, Shield, ArrowRight,
  CheckCircle, Phone, Users, Sparkles
} from 'lucide-react'
import { COMPANY_INFO, INSURANCE_PRODUCTS, TESTIMONIALS_CATEGORIZED } from '@/lib/constants'

const products = [
  {
    key: 'auto',
    name: 'Seguro de Coche',
    icon: Car,
    description: 'Protege tu vehiculo con las mejores coberturas del mercado',
    from: '180',
    features: ['Asistencia 24/7', 'Vehiculo sustitucion', 'Defensa juridica'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    key: 'hogar',
    name: 'Seguro de Hogar',
    icon: Home,
    description: 'Tu hogar, tu refugio. Protegelo como se merece',
    from: '150',
    features: ['Danos por agua', 'Robo y vandalismo', 'Asistencia hogar'],
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    key: 'vida',
    name: 'Seguro de Vida',
    icon: Heart,
    description: 'Protege el futuro de los que mas quieres',
    from: '8',
    period: 'mes',
    features: ['Capital flexible', 'Invalidez incluida', 'Sin reconocimiento'],
    color: 'from-rose-500 to-rose-600',
  },
  {
    key: 'salud',
    name: 'Seguro de Salud',
    icon: Stethoscope,
    description: 'Tu salud es lo primero. Cuidate con las mejores coberturas',
    from: '35',
    period: 'mes',
    features: ['44.000 servicios', 'Videoconsulta 24h', 'Sin carencias'],
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    key: 'ahorro',
    name: 'Ahorro y Jubilacion',
    icon: PiggyBank,
    description: 'Planifica tu futuro financiero con tranquilidad',
    from: '50',
    period: 'mes',
    features: ['Ventajas fiscales', 'Flexibilidad', 'Asesoramiento'],
    color: 'from-amber-500 to-amber-600',
  },
  {
    key: 'decesos',
    name: 'Seguro de Decesos',
    icon: Shield,
    description: 'Tranquilidad para ti y los tuyos en momentos dificiles',
    from: '6',
    period: 'mes',
    features: ['Cobertura mundial', 'Gestion completa', 'Asistencia familiar'],
    color: 'from-violet-500 to-violet-600',
  },
]

export default function ParticularesPage() {
  const testimonials = TESTIMONIALS_CATEGORIZED.particulares

  return (
    <>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-apple-gray-50 to-apple-white dark:from-apple-gray-900 dark:to-apple-black" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/10 rounded-full mb-8">
              <Users className="w-4 h-4 text-accent-blue" />
              <span className="text-sm font-medium text-accent-blue">Seguros para Particulares</span>
            </div>

            <h1 className="text-headline mb-8">
              Protege lo que{' '}
              <span className="gradient-text">mas te importa</span>
            </h1>

            <p className="text-subheadline max-w-2xl mx-auto mb-10">
              Soluciones de seguro pensadas para ti y tu familia. Coberturas completas,
              precios competitivos y un servicio excepcional.
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
              Nuestros seguros
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400">
              La proteccion que necesitas, adaptada a tu vida
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
                className="group"
              >
                <div className="card-premium h-full flex flex-col">
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
                    <Link href={`/seguros/${product.key === 'auto' ? 'coche' : product.key}`}>
                      <button className="px-4 py-2 bg-apple-gray-100 dark:bg-apple-gray-800 hover:bg-occident hover:text-white text-apple-gray-900 dark:text-apple-white rounded-full text-sm font-medium transition-colors">
                        Ver mas
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
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400">
              Familias que confian en nosotros
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-occident to-occident-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-apple-gray-900 dark:text-apple-white">{testimonial.name}</p>
                    <p className="text-sm text-apple-gray-500">{testimonial.product} - {testimonial.location}</p>
                  </div>
                </div>

                {testimonial.verified && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-accent-green">
                    <CheckCircle className="w-3 h-3" />
                    Cliente verificado
                  </div>
                )}
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
            className="bg-gradient-to-br from-occident to-occident-600 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Calcula tu presupuesto en 2 minutos
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Sin compromiso, sin letra pequena. Descubre cuanto puedes ahorrar con Soriano Mediadores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <button className="px-8 py-4 bg-white text-occident font-semibold rounded-full hover:bg-white/90 transition-colors">
                  Calcular ahora
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
