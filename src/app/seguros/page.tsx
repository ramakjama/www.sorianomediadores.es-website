'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Car, Home, Heart, Stethoscope, PiggyBank, Shield,
  Building, Bike, ArrowRight, CheckCircle
} from 'lucide-react'
import { INSURANCE_PRODUCTS } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Car, Bike, Home, Heart, Stethoscope, PiggyBank, Shield, Building,
}

const products = [
  {
    ...INSURANCE_PRODUCTS.auto,
    gradient: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    color: 'text-blue-500',
  },
  {
    ...INSURANCE_PRODUCTS.moto,
    gradient: 'from-orange-500 to-orange-600',
    lightBg: 'bg-orange-50 dark:bg-orange-950/30',
    color: 'text-orange-500',
  },
  {
    ...INSURANCE_PRODUCTS.hogar,
    gradient: 'from-emerald-500 to-emerald-600',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    color: 'text-emerald-500',
  },
  {
    ...INSURANCE_PRODUCTS.vida,
    gradient: 'from-rose-500 to-rose-600',
    lightBg: 'bg-rose-50 dark:bg-rose-950/30',
    color: 'text-rose-500',
  },
  {
    ...INSURANCE_PRODUCTS.salud,
    gradient: 'from-violet-500 to-violet-600',
    lightBg: 'bg-violet-50 dark:bg-violet-950/30',
    color: 'text-violet-500',
  },
  {
    ...INSURANCE_PRODUCTS.ahorro,
    gradient: 'from-amber-500 to-amber-600',
    lightBg: 'bg-amber-50 dark:bg-amber-950/30',
    color: 'text-amber-500',
  },
  {
    ...INSURANCE_PRODUCTS.decesos,
    gradient: 'from-slate-500 to-slate-600',
    lightBg: 'bg-slate-50 dark:bg-slate-950/30',
    color: 'text-slate-500',
  },
  {
    ...INSURANCE_PRODUCTS.comunidades,
    gradient: 'from-cyan-500 to-cyan-600',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/30',
    color: 'text-cyan-500',
  },
]

export default function SegurosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F5] to-white dark:from-[#0D0D0D] dark:via-[#111111] dark:to-[#0D0D0D]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-rose-100/40 to-transparent dark:from-rose-950/20 blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="container-premium relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E30613]/10 rounded-full mb-6"
            >
              <Shield className="w-4 h-4 text-[#E30613]" />
              <span className="text-sm font-semibold text-[#E30613]">Nuestros Seguros</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight"
            >
              Proteccion integral para{' '}
              <span className="bg-gradient-to-r from-[#E30613] to-[#CC050F] bg-clip-text text-transparent">
                cada etapa de tu vida
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-8"
            >
              Desde tu primer coche hasta tu jubilacion, te ofrecemos las mejores
              coberturas de Occident con un servicio 100% personalizado.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20 bg-white dark:bg-[#0D0D0D]">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product, index) => {
              const Icon = iconMap[product.icon]
              return (
                <Link key={product.slug} href={`/seguros/${product.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-xl border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700 transition-all duration-300"
                  >
                    <div className="flex gap-5">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl ${product.lightBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-2 group-hover:text-[#E30613] transition-colors">
                          {product.name}
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">{product.description}</p>

                        {/* Features */}
                        <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                          {product.features.slice(0, 4).map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle className={`w-4 h-4 ${product.color} flex-shrink-0`} />
                              <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Types */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.types.slice(0, 3).map((type) => (
                            <span key={type.name} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs text-neutral-600 dark:text-neutral-400">
                              {type.name}
                            </span>
                          ))}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                          <span className="text-sm text-neutral-500">{product.types[0]?.price}</span>
                          <span className="flex items-center gap-1 text-sm font-medium text-[#E30613] group-hover:gap-2 transition-all">
                            Ver detalles
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-[#111111]">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
              No encuentras lo que buscas?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Tenemos soluciones para todas tus necesidades. Contacta con nosotros
              y te asesoraremos sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <button type="button" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E30613] text-white font-semibold rounded-full hover:bg-[#CC050F] transition-all shadow-lg shadow-[#E30613]/20">
                  Solicitar asesoramiento
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/empresas">
                <button type="button" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white font-semibold rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all">
                  Ver seguros para empresas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
