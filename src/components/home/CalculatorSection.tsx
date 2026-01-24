'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Home, Heart, Stethoscope, ArrowRight, Calculator, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const calculatorTypes = [
  {
    id: 'coche',
    name: 'Coche',
    icon: Car,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    activeBg: 'bg-blue-500',
  },
  {
    id: 'hogar',
    name: 'Hogar',
    icon: Home,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    activeBg: 'bg-emerald-500',
  },
  {
    id: 'vida',
    name: 'Vida',
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    activeBg: 'bg-rose-500',
  },
  {
    id: 'salud',
    name: 'Salud',
    icon: Stethoscope,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    activeBg: 'bg-violet-500',
  },
]

export function CalculatorSection() {
  const [selectedType, setSelectedType] = useState('coche')
  const [step, setStep] = useState(1)

  const selectedCalc = calculatorTypes.find((c) => c.id === selectedType)

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Calculadora de Seguros</span>
            </div>

            <h2 className="text-display-md md:text-display-lg font-display font-bold text-soriano-dark mb-6">
              Calcula tu seguro{' '}
              <span className="gradient-text">en segundos</span>
            </h2>

            <p className="text-lg text-soriano-gray mb-8">
              Obtén un presupuesto personalizado al instante. Sin compromiso,
              sin llamadas, sin esperas. Tú eliges cuándo y cómo.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Presupuesto instantáneo y sin compromiso',
                'Comparamos las mejores coberturas para ti',
                'Contratación 100% online si lo deseas',
                'Asesoramiento personalizado incluido',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-soriano-dark">{item}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-soriano-gray">
              ¿Prefieres hablar con un experto?{' '}
              <Link href="/contacto" className="text-primary-600 font-medium hover:underline">
                Contacta con nosotros
              </Link>
            </p>
          </motion.div>

          {/* Right - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-premium p-8">
              {/* Type selector */}
              <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-xl">
                {calculatorTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type.id)
                      setStep(1)
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                      selectedType === type.id
                        ? `${type.activeBg} text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{type.name}</span>
                  </button>
                ))}
              </div>

              {/* Calculator form */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedType}-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-soriano-dark mb-6">
                        Calcular Seguro de {selectedCalc?.name}
                      </h3>

                      {selectedType === 'coche' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Matrícula del vehículo
                            </label>
                            <input
                              type="text"
                              placeholder="1234 ABC"
                              className="input-premium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Fecha de nacimiento
                            </label>
                            <input
                              type="date"
                              className="input-premium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Código postal
                            </label>
                            <input
                              type="text"
                              placeholder="03570"
                              className="input-premium"
                            />
                          </div>
                        </>
                      )}

                      {selectedType === 'hogar' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Código postal de la vivienda
                            </label>
                            <input
                              type="text"
                              placeholder="03570"
                              className="input-premium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Tipo de vivienda
                            </label>
                            <select className="input-premium">
                              <option>Piso / Apartamento</option>
                              <option>Casa / Chalet</option>
                              <option>Ático</option>
                              <option>Dúplex</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Metros cuadrados
                            </label>
                            <input
                              type="number"
                              placeholder="80"
                              className="input-premium"
                            />
                          </div>
                        </>
                      )}

                      {selectedType === 'vida' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Fecha de nacimiento
                            </label>
                            <input
                              type="date"
                              className="input-premium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Capital a asegurar
                            </label>
                            <select className="input-premium">
                              <option>50.000 €</option>
                              <option>100.000 €</option>
                              <option>150.000 €</option>
                              <option>200.000 €</option>
                              <option>300.000 €</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              ¿Fumador?
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2">
                                <input type="radio" name="fumador" className="text-primary-500" />
                                <span>No</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="radio" name="fumador" className="text-primary-500" />
                                <span>Sí</span>
                              </label>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedType === 'salud' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Fecha de nacimiento
                            </label>
                            <input
                              type="date"
                              className="input-premium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Código postal
                            </label>
                            <input
                              type="text"
                              placeholder="03570"
                              className="input-premium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-soriano-dark mb-2">
                              Tipo de cobertura
                            </label>
                            <select className="input-premium">
                              <option>Con copago</option>
                              <option>Sin copago</option>
                              <option>Reembolso</option>
                            </select>
                          </div>
                        </>
                      )}

                      <button
                        onClick={() => setStep(2)}
                        className="btn-primary w-full mt-6 group"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Calcular precio
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="text-center py-8">
                      <div className={`w-20 h-20 ${selectedCalc?.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        {selectedCalc && <selectedCalc.icon className={`w-10 h-10 ${selectedCalc.color}`} />}
                      </div>

                      <h3 className="text-2xl font-bold text-soriano-dark mb-2">
                        Tu presupuesto estimado
                      </h3>

                      <div className="my-8">
                        <span className="text-sm text-soriano-gray">Desde</span>
                        <div className="text-5xl font-bold gradient-text">
                          {selectedType === 'coche' && '18€'}
                          {selectedType === 'hogar' && '12€'}
                          {selectedType === 'vida' && '8€'}
                          {selectedType === 'salud' && '35€'}
                          <span className="text-xl font-normal text-soriano-gray">/mes</span>
                        </div>
                      </div>

                      <p className="text-soriano-gray mb-6">
                        Este es un precio orientativo. Contacta con nosotros para un presupuesto
                        personalizado con todas las coberturas.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/contacto" className="flex-1">
                          <button className="btn-primary w-full">
                            Solicitar presupuesto exacto
                          </button>
                        </Link>
                        <button
                          onClick={() => setStep(1)}
                          className="btn-secondary flex-1"
                        >
                          Calcular otro
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary-100/50 to-accent-gold/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
