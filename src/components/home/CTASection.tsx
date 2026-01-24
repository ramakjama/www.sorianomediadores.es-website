'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-display-md md:text-display-lg font-display font-bold text-white mb-6">
              ¿Listo para proteger lo que más importa?
            </h2>

            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Contacta con nosotros hoy y descubre cómo podemos ayudarte
              a encontrar el seguro perfecto para ti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contacto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-2xl shadow-lg shadow-black/10 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Solicitar Presupuesto Gratis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* Right - Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-6">Información de contacto</h3>

            <div className="space-y-6">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="flex items-start gap-4 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Teléfono</div>
                  <div>{COMPANY_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start gap-4 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <div>{COMPANY_INFO.email}</div>
                </div>
              </a>

              <div className="flex items-start gap-4 text-white/80">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Dirección</div>
                  <div>{COMPANY_INFO.address.full}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white/80">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Horario</div>
                  <div>L-V: {COMPANY_INFO.schedule.weekdays}</div>
                  <div>Sáb: {COMPANY_INFO.schedule.saturday}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
