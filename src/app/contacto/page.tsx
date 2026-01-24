'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  User, MessageSquare, ArrowRight
} from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'
import toast from 'react-hot-toast'

const insuranceTypes = [
  'Seguro de Coche',
  'Seguro de Moto',
  'Seguro de Hogar',
  'Seguro de Vida',
  'Seguro de Salud',
  'Plan de Ahorro',
  'Seguro de Decesos',
  'Seguro de Comunidades',
  'Seguro para Empresas',
  'Otro',
]

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insurance: '',
    message: '',
    privacy: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.privacy) {
      toast.error('Debes aceptar la política de privacidad')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast.success('¡Mensaje enviado! Te contactaremos pronto.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  if (isSubmitted) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-display-sm font-display font-bold text-soriano-dark mb-4">
              ¡Gracias por contactarnos!
            </h1>
            <p className="text-lg text-soriano-gray mb-8">
              Hemos recibido tu mensaje. Uno de nuestros asesores te contactará
              en las próximas 24 horas para ayudarte.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
            >
              <MessageSquare className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Contacto</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-md md:text-display-lg font-display font-bold text-soriano-dark mb-6"
            >
              ¿En qué podemos{' '}
              <span className="gradient-text">ayudarte?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-soriano-gray"
            >
              Estamos aquí para resolver todas tus dudas y ofrecerte el mejor
              asesoramiento personalizado. Sin compromiso.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold text-soriano-dark mb-6">
                Información de contacto
              </h2>

              <div className="space-y-6">
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <Phone className="w-5 h-5 text-primary-600 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-soriano-dark">Teléfono</div>
                    <div className="text-soriano-gray">{COMPANY_INFO.phone}</div>
                    <div className="text-sm text-primary-600 mt-1">Llamar ahora</div>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <Mail className="w-5 h-5 text-primary-600 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-soriano-dark">Email</div>
                    <div className="text-soriano-gray">{COMPANY_INFO.email}</div>
                    <div className="text-sm text-primary-600 mt-1">Enviar email</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-soriano-dark">Dirección</div>
                    <div className="text-soriano-gray">{COMPANY_INFO.address.street}</div>
                    <div className="text-soriano-gray">{COMPANY_INFO.address.postalCode} {COMPANY_INFO.address.city}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-soriano-dark">Horario</div>
                    <div className="text-soriano-gray">Lunes a Viernes: {COMPANY_INFO.schedule.weekdays}</div>
                    <div className="text-soriano-gray">Sábado: {COMPANY_INFO.schedule.saturday}</div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3126.1234567890123!2d-0.232!3d38.507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDMwJzI1LjIiTiAwwrAxMyc1NS4yIlc!5e0!3m2!1ses!2ses!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Soriano Mediadores"
                />
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="card-premium">
                <h2 className="text-2xl font-bold text-soriano-dark mb-6">
                  Envíanos un mensaje
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-soriano-dark mb-2">
                        Nombre completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre"
                          className="input-premium pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-soriano-dark mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          className="input-premium pl-12"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-soriano-dark mb-2">
                        Teléfono *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="600 000 000"
                          className="input-premium pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-soriano-dark mb-2">
                        Tipo de seguro
                      </label>
                      <select
                        name="insurance"
                        value={formData.insurance}
                        onChange={handleChange}
                        className="input-premium"
                      >
                        <option value="">Selecciona una opción</option>
                        {insuranceTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-soriano-dark mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                      className="input-premium resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="privacy"
                      id="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="privacy" className="text-sm text-soriano-gray">
                      He leído y acepto la{' '}
                      <a href="/legal/privacidad" className="text-primary-600 hover:underline">
                        Política de Privacidad
                      </a>{' '}
                      y consiento el tratamiento de mis datos para la gestión de mi consulta.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Enviar mensaje
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
