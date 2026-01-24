'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Car, Home, Heart, Stethoscope, PiggyBank, Shield,
  Building, Bike, ArrowRight, Sparkles
} from 'lucide-react'
import { INSURANCE_PRODUCTS } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Car, Bike, Home, Heart, Stethoscope, PiggyBank, Shield, Building,
}

const products = [
  {
    ...INSURANCE_PRODUCTS.auto,
    gradient: 'from-blue-500 to-blue-600',
    lightGradient: 'from-blue-50 to-blue-100',
  },
  {
    ...INSURANCE_PRODUCTS.hogar,
    gradient: 'from-emerald-500 to-emerald-600',
    lightGradient: 'from-emerald-50 to-emerald-100',
  },
  {
    ...INSURANCE_PRODUCTS.vida,
    gradient: 'from-rose-500 to-rose-600',
    lightGradient: 'from-rose-50 to-rose-100',
  },
  {
    ...INSURANCE_PRODUCTS.salud,
    gradient: 'from-violet-500 to-violet-600',
    lightGradient: 'from-violet-50 to-violet-100',
  },
  {
    ...INSURANCE_PRODUCTS.ahorro,
    gradient: 'from-amber-500 to-amber-600',
    lightGradient: 'from-amber-50 to-amber-100',
  },
  {
    ...INSURANCE_PRODUCTS.moto,
    gradient: 'from-orange-500 to-orange-600',
    lightGradient: 'from-orange-50 to-orange-100',
  },
]

export function ProductsSection() {
  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-[#111111]">
      <div className="container-premium">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-950/30 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#E30613]" />
            <span className="text-sm font-semibold text-[#CC050F] dark:text-[#E30613]">Nuestros Seguros</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-6"
          >
            Protección completa para{' '}
            <span className="bg-gradient-to-r from-[#E30613] to-[#CC050F] bg-clip-text text-transparent">cada momento</span> de tu vida
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600 dark:text-neutral-400"
          >
            Desde tu coche hasta tu jubilación, te acompañamos con las mejores coberturas
            de Occident adaptadas a tus necesidades.
          </motion.p>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const Icon = iconMap[product.icon]
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/seguros/${product.slug}`}>
                  <div className="group card-premium h-full">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.lightGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-soriano-dark mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-soriano-gray mb-4">{product.description}</p>

                    {/* Features preview */}
                    <ul className="space-y-2 mb-6">
                      {product.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-soriano-gray">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price indicator */}
                    {product.types[0] && (
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-soriano-gray">{product.types[0].price}</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                          Ver más
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/seguros">
            <button className="btn-secondary group">
              Ver todos los seguros
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
