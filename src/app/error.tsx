'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCcw, Home, Phone, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-apple-white dark:bg-apple-black flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-occident/10 to-occident/20 dark:from-occident/20 dark:to-occident/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-occident" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-apple-gray-900 dark:text-apple-white mb-4">
            ¡Ups! Algo salió mal
          </h1>
          <p className="text-lg text-apple-gray-500 dark:text-apple-gray-400 mb-8 max-w-md mx-auto">
            Ha ocurrido un error inesperado. Nuestro equipo técnico ha sido notificado
            y estamos trabajando para solucionarlo.
          </p>
        </motion.div>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 p-4 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl text-left"
          >
            <p className="text-sm font-mono text-apple-gray-600 dark:text-apple-gray-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-apple-gray-400 dark:text-apple-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-occident text-white rounded-2xl font-semibold hover:bg-occident-600 transition-colors shadow-lg shadow-occident/25"
          >
            <RefreshCcw className="w-5 h-5" />
            Intentar de nuevo
          </motion.button>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-900 dark:text-apple-white rounded-2xl font-semibold hover:bg-apple-gray-200 dark:hover:bg-apple-gray-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </motion.button>
          </Link>
        </motion.div>

        {/* Contact support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-apple-gray-200 dark:border-apple-gray-800"
        >
          <p className="text-sm text-apple-gray-500 dark:text-apple-gray-400 mb-4">
            Si el problema persiste, contáctanos:
          </p>
          <a
            href="tel:+34966810290"
            className="inline-flex items-center gap-2 text-occident hover:text-occident-600 font-semibold transition-colors"
          >
            <Phone className="w-5 h-5" />
            966 810 290
          </a>
        </motion.div>
      </div>
    </div>
  )
}
