'use client'

import Link from 'next/link'
import {
  Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin,
  Twitter, ArrowRight, Shield, Award, CheckCircle, Users
} from 'lucide-react'
import { COMPANY_INFO, INSURANCE_PRODUCTS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'

const quickLinks = [
  { name: 'Quiénes Somos', href: '/quienes-somos' },
  { name: 'Particulares', href: '/particulares' },
  { name: 'Autónomos', href: '/autonomos' },
  { name: 'Empresas', href: '/empresas' },
  { name: 'Soriano Club', href: '/comunidad' },
  { name: 'Contacto', href: '/contacto' },
]

const legalLinks = [
  { name: 'Aviso Legal', href: '/legal/aviso-legal' },
  { name: 'Política de Privacidad', href: '/legal/privacidad' },
  { name: 'Política de Cookies', href: '/legal/cookies' },
  { name: 'Canal de Denuncias', href: '/legal/canal-denuncias' },
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: COMPANY_INFO.social.facebook },
  { name: 'Instagram', icon: Instagram, href: COMPANY_INFO.social.instagram },
  { name: 'LinkedIn', icon: Linkedin, href: COMPANY_INFO.social.linkedin },
  { name: 'Twitter', icon: Twitter, href: COMPANY_INFO.social.twitter },
]

const trustBadges = [
  {
    icon: Shield,
    title: 'Mediador Autorizado',
    subtitle: `DGSFP ${COMPANY_INFO.legal.dgsfp}`,
    color: 'text-[#E30613]'
  },
  {
    icon: Award,
    title: '+25 Años',
    subtitle: 'De experiencia',
    color: 'text-amber-400'
  },
  {
    icon: CheckCircle,
    title: '8.4/10',
    subtitle: 'Satisfacción clientes',
    color: 'text-emerald-400'
  },
  {
    icon: Users,
    title: '4M+ Clientes',
    subtitle: 'Grupo Occident',
    color: 'text-[#E30613]/80'
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-800 dark:bg-[#0D0D0D] text-white">
      {/* Trust badges */}
      <div className="border-b border-neutral-800">
        <div className="container-premium py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-neutral-800/80 flex items-center justify-center">
                  <badge.icon className={`w-7 h-7 ${badge.color}`} />
                </div>
                <div>
                  <div className="text-base font-bold text-white">{badge.title}</div>
                  <div className="text-sm text-neutral-400">{badge.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-premium py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo variant="white" className="h-10 w-auto mb-6" />
            <p className="text-neutral-400 mb-8 max-w-sm leading-relaxed text-base">
              Mediadores de seguros de confianza. Protegemos lo que más te importa
              con las mejores coberturas de Occident y un servicio personalizado.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-occident-500 flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-medium">{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-occident-500 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-start gap-3 text-neutral-400">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="pt-2">{COMPANY_INFO.address.full}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span>L-V: {COMPANY_INFO.schedule.weekdays}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-neutral-800 flex items-center justify-center hover:bg-occident-500 transition-all duration-200 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Seguros */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5">Seguros</h4>
            <ul className="space-y-3">
              {Object.values(INSURANCE_PRODUCTS).slice(0, 6).map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/seguros/${product.slug}`}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    {product.name}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces rapidos */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5">Empresa</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <div>
              {currentYear} {COMPANY_INFO.fullName}. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-3">
              <span>Mediador exclusivo de</span>
              <span className="font-bold text-occident-500">Occident</span>
              <span className="w-px h-4 bg-neutral-700" />
              <span className="text-neutral-400">Grupo Catalana Occidente</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
