'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { FAQS } from '@/lib/constants'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
                <HelpCircle className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">Preguntas Frecuentes</span>
              </div>

              <h2 className="text-display-md md:text-display-lg font-display font-bold text-soriano-dark mb-6">
                ¿Tienes{' '}
                <span className="gradient-text">dudas?</span>
              </h2>

              <p className="text-lg text-soriano-gray mb-8">
                Aquí encontrarás respuestas a las preguntas más habituales.
                Si no encuentras lo que buscas, no dudes en contactarnos.
              </p>

              <Link href="/contacto">
                <button className="btn-secondary group">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hacer una pregunta
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right - FAQ list */}
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:border-primary-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-soriano-dark pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-soriano-gray flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-soriano-gray">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
