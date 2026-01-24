'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Phone, Star } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

const heroStats = [
  { value: '4M+', label: 'Clientes protegidos' },
  { value: '8.4', label: 'Puntuacion media', highlight: true },
  { value: '25+', label: 'Anos experiencia' },
]

const words = ['tranquilidad', 'seguridad', 'confianza', 'proteccion']

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] to-white dark:from-[#0D0D0D] dark:to-[#111111]" />

      <div className="container-premium relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-full border border-neutral-200/60 dark:border-white/10 mb-10 animate-fade-in">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#E30613]" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Mediadores autorizados DGSFP
              </span>
            </div>
            <span className="w-px h-4 bg-neutral-300 dark:bg-neutral-600" />
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold text-neutral-800 dark:text-white">8.4</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8 animate-fade-in-up delay-100 leading-tight">
            Tu{' '}
            <span className="relative inline-block min-w-[280px] md:min-w-[360px]">
              <span
                key={currentWord}
                className="absolute left-0 bg-gradient-to-r from-[#E30613] to-[#CC050F] bg-clip-text text-transparent transition-opacity duration-300"
              >
                {words[currentWord]}
              </span>
              <span className="invisible">{words[0]}</span>
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            nuestra prioridad.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
            Mediadores de seguros de confianza en Alicante. Protegemos lo que mas te importa
            con las mejores coberturas de{' '}
            <span className="font-semibold text-neutral-800 dark:text-white">Occident</span>.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-300">
            <Link href="/contacto">
              <button type="button" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E30613] text-white font-semibold rounded-full hover:bg-[#CC050F] active:scale-[0.98] transition-all shadow-lg shadow-[#E30613]/20">
                Solicitar presupuesto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <a href={`tel:${COMPANY_INFO.phoneClean}`}>
              <button type="button" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white dark:bg-white/10 text-neutral-800 dark:text-white font-semibold rounded-full border border-neutral-200 dark:border-white/15 hover:bg-neutral-50 dark:hover:bg-white/15 active:scale-[0.98] transition-all shadow-sm">
                <Phone className="w-5 h-5 text-[#E30613]" />
                {COMPANY_INFO.phone}
              </button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 animate-fade-in-up delay-400">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-1.5 ${
                  stat.highlight ? 'text-[#E30613]' : 'text-neutral-800 dark:text-white'
                }`}>
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
