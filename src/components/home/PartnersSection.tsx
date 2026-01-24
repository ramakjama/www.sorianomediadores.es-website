'use client'

import { motion } from 'framer-motion'
import { Building2, Shield } from 'lucide-react'

export function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-soriano-gray uppercase tracking-wider mb-4">
            Respaldados por
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004d99] rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-soriano-dark">Occident</div>
                <div className="text-xs text-soriano-gray">Grupo Catalana Occidente</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-soriano-gray">
            Occident forma parte del <span className="font-semibold text-soriano-dark">Grupo Catalana Occidente</span>,
            uno de los grupos aseguradores más sólidos de España con más de 150 años de historia.
            Con más de <span className="font-semibold text-soriano-dark">4 millones de clientes</span> y
            una nota media de satisfacción de <span className="font-semibold text-soriano-dark">8.4/10</span>,
            ofrecemos las mejores garantías del mercado.
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-12 border-t border-gray-200"
        >
          <div className="flex items-center gap-2 text-sm text-soriano-gray">
            <Shield className="w-4 h-4 text-primary-500" />
            <span>Mediador inscrito en DGSFP</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2 text-sm text-soriano-gray">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Protección de datos RGPD</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2 text-sm text-soriano-gray">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>Conexión segura SSL</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
