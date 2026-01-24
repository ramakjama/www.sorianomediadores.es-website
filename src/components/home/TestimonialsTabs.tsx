'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, User, Briefcase, Building2 } from 'lucide-react'
import { TESTIMONIALS_CATEGORIZED } from '@/lib/constants'

const categories = [
  { id: 'particulares', label: 'Particulares', icon: User },
  { id: 'autonomos', label: 'Autónomos', icon: Briefcase },
  { id: 'empresas', label: 'Empresas', icon: Building2 },
]

export function TestimonialsTabs() {
  const [activeCategory, setActiveCategory] = useState<'particulares' | 'autonomos' | 'empresas'>('particulares')

  const currentTestimonials = TESTIMONIALS_CATEGORIZED[activeCategory]

  return (
    <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400 max-w-2xl mx-auto">
            Más de 1000 familias y empresas confían en nosotros
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-apple-white dark:bg-apple-gray-800 rounded-2xl p-2 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-occident text-white shadow-lg'
                    : 'text-apple-gray-600 dark:text-apple-gray-400 hover:text-apple-gray-900 dark:hover:text-apple-white'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-premium relative"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-occident/10 dark:bg-occident/20 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-occident" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-apple-gray-600 dark:text-apple-gray-400 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-apple-gray-100 dark:border-apple-gray-800">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                    index === 0 ? 'from-occident to-occident-600' :
                    index === 1 ? 'from-accent-blue to-blue-600' :
                    'from-accent-green to-green-600'
                  } flex items-center justify-center text-white font-semibold`}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-apple-gray-900 dark:text-apple-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Product badge */}
                <div className="absolute bottom-6 right-6">
                  <span className="px-3 py-1 bg-apple-gray-100 dark:bg-apple-gray-800 text-xs font-medium text-apple-gray-600 dark:text-apple-gray-400 rounded-full">
                    {testimonial.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
