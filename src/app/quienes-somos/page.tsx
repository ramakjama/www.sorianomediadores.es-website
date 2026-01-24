'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users, Award, Heart, Target, CheckCircle, ArrowRight,
  Building2, MapPin, Phone, Mail, Linkedin, Shield, Sparkles
} from 'lucide-react'
import { COMPANY_INFO, OCCIDENT_INFO } from '@/lib/constants'

// Equipo real de Soriano Mediadores
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Ramón Soriano Agulló',
    role: 'Director de Agencia',
    email: 'ramon.soriano@sorianomediadores.es',
    phone: '+34 659 022 007',
    description: 'Fundador y alma de Soriano Mediadores. Más de 25 años dedicados a proteger familias y empresas.',
    initials: 'RS',
    color: 'from-occident to-occident-600',
  },
  {
    id: 2,
    name: 'Héctor Nolivos Álvarez',
    role: 'Responsable TIC',
    email: 'hector.nolivos@sorianomediadores.es',
    phone: '+1 786 710 0087',
    description: 'Liderando la transformación digital y la innovación tecnológica de la agencia.',
    initials: 'HN',
    color: 'from-accent-blue to-blue-600',
  },
  {
    id: 3,
    name: 'Pau Ripoll Llorca',
    role: 'Subdirector y Agente Atención Cliente',
    email: 'pau.ripoll@sorianomediadores.es',
    phone: '+34 637 050 271',
    description: 'Garantizando la excelencia en cada interacción con nuestros clientes.',
    initials: 'PR',
    color: 'from-accent-green to-green-600',
  },
  {
    id: 4,
    name: 'Juan Ignacio Pérez Caracciolo',
    role: 'Responsable Asesor Comercial',
    email: 'juan.ignacio@sorianomediadores.es',
    phone: '+34 669 461 509',
    description: 'Experto en encontrar la solución perfecta para cada necesidad de protección.',
    initials: 'JP',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 5,
    name: 'Toni Medina Llorca',
    role: 'Asesor Comercial',
    email: 'toni.medina@sorianomediadores.es',
    phone: '+34 656 264 694',
    description: 'Comprometido con ofrecer el mejor asesoramiento personalizado.',
    initials: 'TM',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 6,
    name: 'Alberto Alcalá Tomás',
    role: 'Agente Atención al Cliente',
    email: 'alberto.alcala@sorianomediadores.es',
    phone: '+34 604 400 171',
    description: 'Siempre disponible para resolver cualquier duda o gestión.',
    initials: 'AA',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 7,
    name: 'Laura Fernández Such',
    role: 'Responsable Agente Atención Cliente',
    email: 'laura.fernandez@sorianomediadores.es',
    phone: '+34 626 098 014',
    description: 'Liderando un equipo enfocado en la satisfacción del cliente.',
    initials: 'LF',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 8,
    name: 'Tania Zhyla',
    role: 'Asesora Comercial',
    email: null,
    phone: null,
    description: 'Aportando perspectiva internacional y dedicación en cada proyecto.',
    initials: 'TZ',
    color: 'from-indigo-500 to-indigo-600',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Compromiso',
    description: 'Cada cliente es parte de nuestra familia. Tu tranquilidad es nuestra prioridad absoluta.',
  },
  {
    icon: Award,
    title: 'Excelencia',
    description: 'Buscamos la perfección en cada gestión, ofreciendo siempre las mejores soluciones.',
  },
  {
    icon: Target,
    title: 'Transparencia',
    description: 'Sin letra pequeña ni sorpresas. Comunicación clara, honesta y directa.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Conocemos tu nombre, tu historia y tus necesidades. Estamos aquí para ti.',
  },
]

const timeline = [
  { year: '1998', event: 'Fundación de Soriano Mediadores en Villajoyosa', icon: Sparkles },
  { year: '2005', event: 'Expansión a toda la provincia de Alicante', icon: MapPin },
  { year: '2010', event: 'Alianza estrategica con Occident', icon: Shield },
  { year: '2015', event: 'Digitalizacion completa de procesos', icon: Building2 },
  { year: '2020', event: 'Lanzamiento de portal online para clientes', icon: Users },
  { year: '2024', event: 'Renovacion premium: El Apple del seguro', icon: Award },
]

export default function QuienesSomosPage() {
  return (
    <>
      {/* Hero Section - Apple Style */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-apple-gray-50 to-apple-white dark:from-apple-gray-900 dark:to-apple-black" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-occident/10 dark:bg-occident/20 rounded-full mb-8">
              <Users className="w-4 h-4 text-occident" />
              <span className="text-sm font-medium text-occident">Nuestro Equipo</span>
            </div>

            <h1 className="text-headline mb-8">
              Las personas detras de{' '}
              <span className="gradient-text">tu tranquilidad</span>
            </h1>

            <p className="text-subheadline max-w-2xl mx-auto">
              Un equipo de profesionales apasionados, dedicados a proteger lo que mas te importa
              con cercania, experiencia y tecnologia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid - Premium Cards */}
      <section className="section-padding bg-apple-white dark:bg-apple-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Conoce al equipo
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400">
              8 profesionales comprometidos con tu bienestar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card-premium h-full flex flex-col">
                  {/* Avatar */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-semibold shadow-lg`}>
                      {member.initials}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-apple-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-occident mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-apple-gray-500 dark:text-apple-gray-400 mb-4 flex-1">
                      {member.description}
                    </p>

                    {/* Contact */}
                    {member.email && (
                      <div className="pt-4 border-t border-apple-gray-100 dark:border-apple-gray-800 space-y-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center gap-2 text-sm text-apple-gray-600 dark:text-apple-gray-400 hover:text-occident transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{member.email.split('@')[0]}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Timeline */}
      <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-8">
                Nuestra historia
              </h2>

              <div className="space-y-6 text-lg text-apple-gray-600 dark:text-apple-gray-400">
                <p>
                  <strong className="text-apple-gray-900 dark:text-apple-white">Soriano Mediadores</strong> nacio en 1998 en
                  Villajoyosa, Alicante, con una mision clara: ofrecer a las familias y empresas de
                  nuestra comunidad un servicio de mediacion de seguros cercano, profesional y transparente.
                </p>
                <p>
                  Lo que comenzo como una pequena oficina familiar se ha convertido en una referencia
                  en la Comunidad Valenciana, manteniendo siempre nuestros valores fundacionales:
                  <strong className="text-apple-gray-900 dark:text-apple-white"> compromiso, honestidad y cercania</strong>.
                </p>
                <p>
                  Nuestra alianza con <strong className="text-occident">Occident - Grupo Catalana Occidente</strong>,
                  una de las aseguradoras mas solidas de Espana, nos permite ofrecer las mejores
                  coberturas del mercado con el respaldo de mas de 4 millones de clientes satisfechos.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-occident">25+</div>
                  <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">Anos de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-occident">1000+</div>
                  <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">Familias protegidas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-occident">98%</div>
                  <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">Renovaciones</div>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-6 top-0 bottom-0 w-px bg-apple-gray-200 dark:bg-apple-gray-700" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-0 w-12 h-12 bg-apple-white dark:bg-apple-gray-800 border-2 border-occident rounded-full flex items-center justify-center shadow-lg">
                      <item.icon className="w-5 h-5 text-occident" />
                    </div>
                    <div className="text-sm font-bold text-occident mb-1">{item.year}</div>
                    <div className="text-apple-gray-900 dark:text-apple-white font-medium">{item.event}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-apple-white dark:bg-apple-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Nuestros valores
            </h2>
            <p className="text-xl text-apple-gray-500 dark:text-apple-gray-400">
              Los principios que guian cada decision y accion de nuestro equipo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-occident/10 dark:bg-occident/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-occident" />
                </div>
                <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white mb-3">{value.title}</h3>
                <p className="text-apple-gray-500 dark:text-apple-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Occident */}
      <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/10 rounded-full mb-6">
                <Building2 className="w-4 h-4 text-accent-blue" />
                <span className="text-sm font-semibold text-accent-blue">Nuestro Partner</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-semibold text-apple-gray-900 dark:text-apple-white mb-6">
                Respaldados por Occident
              </h2>

              <p className="text-lg text-apple-gray-600 dark:text-apple-gray-400 mb-8">
                Occident forma parte del <strong className="text-apple-gray-900 dark:text-apple-white">Grupo Catalana Occidente</strong>,
                uno de los grupos aseguradores mas solidos y con mayor trayectoria de Espana,
                con mas de 150 anos de historia.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-apple-white dark:bg-apple-gray-800 rounded-2xl">
                  <div className="text-3xl font-bold text-apple-gray-900 dark:text-apple-white">{OCCIDENT_INFO.clients.toLocaleString()}</div>
                  <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">Clientes</div>
                </div>
                <div className="p-6 bg-apple-white dark:bg-apple-gray-800 rounded-2xl">
                  <div className="text-3xl font-bold text-apple-gray-900 dark:text-apple-white">{OCCIDENT_INFO.satisfaction}/10</div>
                  <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">Satisfaccion</div>
                </div>
                <div className="p-6 bg-apple-white dark:bg-apple-gray-800 rounded-2xl">
                  <div className="text-3xl font-bold text-apple-gray-900 dark:text-apple-white">{OCCIDENT_INFO.offices}</div>
                  <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">Oficinas</div>
                </div>
                <div className="p-6 bg-apple-white dark:bg-apple-gray-800 rounded-2xl">
                  <div className="text-3xl font-bold text-apple-gray-900 dark:text-apple-white">{OCCIDENT_INFO.medicalServices.toLocaleString()}</div>
                  <div className="text-sm text-apple-gray-500 dark:text-apple-gray-400">Servicios medicos</div>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  'Solvencia financiera garantizada',
                  'Atencion al cliente 24/7',
                  'Red de profesionales en toda Espana',
                  'Innovacion constante en productos',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-apple-gray-600 dark:text-apple-gray-400">
                    <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#003366] to-[#004d99] rounded-3xl p-12 text-white"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Occident</div>
                  <div className="text-white/70">Grupo Catalana Occidente</div>
                </div>
              </div>

              <blockquote className="text-xl text-white/90 italic mb-8">
                "Nuestra mision es proteger lo que mas importa a las personas,
                ofreciendo soluciones aseguradoras que aporten tranquilidad y confianza."
              </blockquote>

              <div className="pt-6 border-t border-white/20">
                <div className="text-sm text-white/70">Mas de 150 anos de historia aseguradora</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-apple-white dark:bg-apple-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-premium p-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-apple-gray-900 dark:text-apple-white mb-4">
              Quieres conocernos mejor?
            </h2>
            <p className="text-lg text-apple-gray-500 dark:text-apple-gray-400 mb-8 max-w-2xl mx-auto">
              Visitanos en nuestra oficina o contacta con nosotros. Estaremos encantados
              de atenderte y resolver todas tus dudas.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <div className="flex items-center justify-center gap-2 text-apple-gray-600 dark:text-apple-gray-400">
                <MapPin className="w-5 h-5 text-occident" />
                {COMPANY_INFO.address.full}
              </div>
              <div className="flex items-center justify-center gap-2 text-apple-gray-600 dark:text-apple-gray-400">
                <Phone className="w-5 h-5 text-occident" />
                {COMPANY_INFO.phone}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <button className="btn-primary group">
                  <span className="flex items-center gap-2">
                    Contactar ahora
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                <button className="btn-secondary">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
