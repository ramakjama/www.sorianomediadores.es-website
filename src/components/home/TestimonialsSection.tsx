'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-primary-600 fill-current" />
            <span className="text-sm font-semibold text-primary-700">Testimonios</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-display-md md:text-display-lg font-display font-bold text-soriano-dark mb-6"
          >
            Lo que dicen{' '}
            <span className="gradient-text">nuestros clientes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-soriano-gray"
          >
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
            Más de 4 millones de personas confían en nosotros.
          </motion.p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 rounded-3xl p-8 md:p-12 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-primary-500" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent-gold fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl text-soriano-dark font-medium leading-relaxed mb-8">
                "{TESTIMONIALS[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {TESTIMONIALS[currentIndex].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-soriano-dark">
                    {TESTIMONIALS[currentIndex].name}
                  </div>
                  <div className="text-sm text-soriano-gray">
                    {TESTIMONIALS[currentIndex].role} • {TESTIMONIALS[currentIndex].product}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary-300 hover:bg-primary-50 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-soriano-dark" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-500 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-primary-300 hover:bg-primary-50 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-soriano-dark" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-100"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-soriano-dark">8.4/10</div>
            <div className="text-sm text-soriano-gray">Satisfacción media</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-soriano-dark">98%</div>
            <div className="text-sm text-soriano-gray">Renovaciones</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-soriano-dark">10.8</div>
            <div className="text-sm text-soriano-gray">Años de fidelidad media</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-soriano-dark">24/7</div>
            <div className="text-sm text-soriano-gray">Disponibilidad</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
