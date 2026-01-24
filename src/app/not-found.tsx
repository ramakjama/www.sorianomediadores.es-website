'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, Phone, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-apple-white dark:bg-apple-black flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[180px] md:text-[240px] font-bold leading-none tracking-tighter">
            <span className="bg-gradient-to-r from-occident via-occident-400 to-occident-600 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
            Página no encontrada
          </h2>
          <p className="text-lg text-apple-gray-500 dark:text-apple-gray-400 mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
            Pero no te preocupes, estamos aquí para ayudarte.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-occident text-white rounded-2xl font-semibold hover:bg-occident-600 transition-colors shadow-lg shadow-occident/25"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </motion.button>
          </Link>
          <Link href="/contacto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-900 dark:text-apple-white rounded-2xl font-semibold hover:bg-apple-gray-200 dark:hover:bg-apple-gray-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Contactar
            </motion.button>
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-apple-gray-200 dark:border-apple-gray-800"
        >
          <p className="text-sm text-apple-gray-500 dark:text-apple-gray-400 mb-4">
            Quizás buscabas:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Seguros de Coche', href: '/seguros/coche' },
              { name: 'Seguros de Hogar', href: '/seguros/hogar' },
              { name: 'Seguros de Vida', href: '/seguros/vida' },
              { name: 'Área Cliente', href: '/acceso-clientes' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-600 dark:text-apple-gray-400 rounded-full hover:bg-occident/10 hover:text-occident transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
