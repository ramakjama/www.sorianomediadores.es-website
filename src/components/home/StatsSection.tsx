'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS, OCCIDENT_INFO } from '@/lib/constants'

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
  const hasDecimal = value.includes('.')
  const isMillions = value.includes('M')

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setCount(numericValue)
          clearInterval(timer)
        } else {
          setCount(current)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, numericValue])

  const displayValue = hasDecimal
    ? count.toFixed(1)
    : isMillions
      ? count.toFixed(0) + 'M'
      : count.toFixed(0)

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-soriano-dark via-soriano-dark to-primary-900" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-display font-bold text-white mb-4">
            Los números hablan por nosotros
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Respaldados por Occident - Grupo Catalana Occidente, una de las aseguradoras
            más sólidas de España.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-baseline">
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Occident stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{OCCIDENT_INFO.offices.toLocaleString()}</div>
              <p className="text-sm text-gray-500">Oficinas en España</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{OCCIDENT_INFO.professionals.toLocaleString()}</div>
              <p className="text-sm text-gray-500">Peritos y reparadores</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{OCCIDENT_INFO.medicalServices.toLocaleString()}</div>
              <p className="text-sm text-gray-500">Servicios médicos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{OCCIDENT_INFO.averageRelationYears}</div>
              <p className="text-sm text-gray-500">Años relación media</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
