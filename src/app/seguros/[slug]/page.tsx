'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Car, Home, Heart, Stethoscope, PiggyBank, Shield,
  Building, Bike, ArrowRight, CheckCircle, Phone,
  Star, Users, Clock, FileText, Zap, Award
} from 'lucide-react'
import { INSURANCE_PRODUCTS, COMPANY_INFO } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Car, Bike, Home, Heart, Stethoscope, PiggyBank, Shield, Building,
}

const slugToKey: Record<string, keyof typeof INSURANCE_PRODUCTS> = {
  'seguro-coche': 'auto',
  'coche': 'auto',
  'seguro-moto': 'moto',
  'moto': 'moto',
  'seguro-hogar': 'hogar',
  'hogar': 'hogar',
  'seguro-vida': 'vida',
  'vida': 'vida',
  'seguro-salud': 'salud',
  'salud': 'salud',
  'ahorro-jubilacion': 'ahorro',
  'seguro-ahorro': 'ahorro',
  'ahorro': 'ahorro',
  'seguro-decesos': 'decesos',
  'decesos': 'decesos',
  'seguro-comunidades': 'comunidades',
  'comunidades': 'comunidades',
}

const productColors: Record<string, { gradient: string; light: string; accent: string }> = {
  auto: { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50 dark:bg-blue-950/30', accent: 'text-blue-500' },
  moto: { gradient: 'from-orange-500 to-orange-600', light: 'bg-orange-50 dark:bg-orange-950/30', accent: 'text-orange-500' },
  hogar: { gradient: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50 dark:bg-emerald-950/30', accent: 'text-emerald-500' },
  vida: { gradient: 'from-rose-500 to-rose-600', light: 'bg-rose-50 dark:bg-rose-950/30', accent: 'text-rose-500' },
  salud: { gradient: 'from-violet-500 to-violet-600', light: 'bg-violet-50 dark:bg-violet-950/30', accent: 'text-violet-500' },
  ahorro: { gradient: 'from-amber-500 to-amber-600', light: 'bg-amber-50 dark:bg-amber-950/30', accent: 'text-amber-500' },
  decesos: { gradient: 'from-slate-500 to-slate-600', light: 'bg-slate-50 dark:bg-slate-950/30', accent: 'text-slate-500' },
  comunidades: { gradient: 'from-cyan-500 to-cyan-600', light: 'bg-cyan-50 dark:bg-cyan-950/30', accent: 'text-cyan-500' },
}

const productBenefits: Record<string, { icon: React.ElementType; title: string; description: string }[]> = {
  auto: [
    { icon: Zap, title: 'Asistencia 24/7', description: 'Estés donde estés, a cualquier hora' },
    { icon: Car, title: 'Vehículo de sustitución', description: 'Para que no pares tu día a día' },
    { icon: Shield, title: 'Red AutoPresto', description: 'Más de 1.200 talleres en toda España' },
    { icon: Award, title: 'Defensa jurídica', description: 'Incluida en todas las modalidades' },
  ],
  moto: [
    { icon: Shield, title: 'Equipamiento cubierto', description: 'Casco, guantes, chaqueta y más' },
    { icon: Zap, title: 'Asistencia en carretera', description: 'Para tu moto y para ti' },
    { icon: Award, title: 'RC ampliada', description: 'Cobertura superior a la obligatoria' },
    { icon: Users, title: 'Acompañante incluido', description: 'Protección para dos' },
  ],
  hogar: [
    { icon: Home, title: 'Cobertura total', description: 'Continente y contenido protegidos' },
    { icon: Zap, title: 'Asistencia 24h', description: 'Fontanería, cerrajería, electricidad' },
    { icon: Shield, title: 'RC familiar', description: 'Toda la familia cubierta' },
    { icon: Award, title: 'Bricohogar', description: 'Pequeñas reparaciones incluidas' },
  ],
  vida: [
    { icon: Heart, title: 'Capital flexible', description: 'Adapta la cobertura a tus necesidades' },
    { icon: Shield, title: 'Invalidez incluida', description: 'Protección ante imprevistos' },
    { icon: Award, title: 'Sin reconocimiento', description: 'Hasta 50.000€ sin examen médico' },
    { icon: Users, title: 'Beneficiarios libres', description: 'Tú decides quién recibe el capital' },
  ],
  salud: [
    { icon: Stethoscope, title: '44.000 servicios', description: 'La red médica más completa' },
    { icon: Zap, title: 'Videoconsulta 24h', description: 'Médico online cuando lo necesites' },
    { icon: Award, title: 'Segunda opinión', description: 'Para decisiones importantes' },
    { icon: Clock, title: 'Sin carencias', description: 'Muchas coberturas desde el día 1' },
  ],
  ahorro: [
    { icon: PiggyBank, title: 'Ventajas fiscales', description: 'Ahorra en tu declaración' },
    { icon: Award, title: 'Flexibilidad total', description: 'Aportaciones a tu ritmo' },
    { icon: Shield, title: 'Capital garantizado', description: 'Tu dinero siempre seguro' },
    { icon: Users, title: 'Asesoramiento', description: 'Expertos a tu disposición' },
  ],
  decesos: [
    { icon: Shield, title: 'Cobertura mundial', description: 'Estés donde estés' },
    { icon: Award, title: 'Gestión completa', description: 'Nos ocupamos de todo' },
    { icon: Users, title: 'Familia incluida', description: 'Protección para todos' },
    { icon: FileText, title: 'Servicios digitales', description: 'Testamento online y más' },
  ],
  comunidades: [
    { icon: Building, title: 'Edificio protegido', description: 'Zonas comunes y estructura' },
    { icon: Shield, title: 'RC de la comunidad', description: 'Ante daños a terceros' },
    { icon: Zap, title: 'Asistencia 24h', description: 'Urgencias resueltas al momento' },
    { icon: Award, title: 'Defensa jurídica', description: 'Para la comunidad y vecinos' },
  ],
}

export default function SeguroDetailPage({ params }: { params: { slug: string } }) {
  const productKey = slugToKey[params.slug]

  if (!productKey) {
    notFound()
  }

  const product = INSURANCE_PRODUCTS[productKey]
  const colors = productColors[productKey]
  const benefits = productBenefits[productKey]
  const Icon = iconMap[product.icon]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F5] to-white dark:from-[#0D0D0D] dark:via-[#111111] dark:to-[#0D0D0D]" />

        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial ${colors.light} blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3`} />

        <div className="container-premium relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm mb-6">
                <Link href="/" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                  Inicio
                </Link>
                <span className="text-neutral-400">/</span>
                <Link href="/seguros" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                  Seguros
                </Link>
                <span className="text-neutral-400">/</span>
                <span className="text-neutral-800 dark:text-white font-medium">{product.name}</span>
              </nav>

              {/* Icon */}
              <div className={`w-20 h-20 rounded-3xl ${colors.light} flex items-center justify-center mb-8`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
                {product.name}
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-lg">
                {product.description}. Las mejores coberturas de Occident con asesoramiento personalizado.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-neutral-800 dark:text-white">8.4/10</span>
                  <span className="text-neutral-500 text-sm">satisfacción</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#E30613]" />
                  <span className="font-bold text-neutral-800 dark:text-white">4M+</span>
                  <span className="text-neutral-500 text-sm">clientes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-neutral-800 dark:text-white">24h</span>
                  <span className="text-neutral-500 text-sm">asistencia</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contacto">
                  <button className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E30613] text-white font-semibold rounded-full hover:bg-[#CC050F] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#E30613]/20 hover:shadow-xl hover:shadow-[#E30613]/25">
                    Solicitar presupuesto
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                  <button className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white dark:bg-white/10 text-neutral-800 dark:text-white font-semibold rounded-full border border-neutral-200 dark:border-white/15 hover:bg-neutral-50 dark:hover:bg-white/15 active:scale-[0.98] transition-all duration-200 shadow-sm">
                    <Phone className="w-5 h-5 text-[#E30613]" />
                    {COMPANY_INFO.phone}
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Card with pricing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl shadow-neutral-900/5 dark:shadow-none border border-neutral-100 dark:border-neutral-800 p-8 lg:p-10"
            >
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">
                Modalidades disponibles
              </h2>

              <div className="space-y-4 mb-8">
                {product.types.map((type, index) => (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      index === 0
                        ? 'border-[#E30613] bg-red-50/50 dark:bg-red-950/20'
                        : 'border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-800 dark:text-white">
                          {type.name}
                        </h3>
                        {index === 0 && (
                          <span className="text-xs text-[#E30613] font-medium">Más popular</span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${colors.accent}`}>
                          {type.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Precio orientativo. Solicita tu presupuesto personalizado sin compromiso.
                </p>
                <Link href="/contacto" className="block">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#E30613] text-white font-semibold rounded-xl hover:bg-[#CC050F] transition-all">
                    Calcular mi precio
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-[#0D0D0D]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Ventajas exclusivas
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Descubre por qué miles de clientes confían en Soriano Mediadores para su {product.name.toLowerCase()}.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-neutral-50 dark:bg-neutral-900 rounded-2xl hover:bg-white dark:hover:bg-neutral-800 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${colors.light} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className={`w-7 h-7 ${colors.accent}`} />
                </div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F5F5F5] dark:bg-[#111111]">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                Coberturas incluidas
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Todas nuestras pólizas incluyen las coberturas esenciales para tu tranquilidad, con opciones de personalización.
              </p>

              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full ${colors.light} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <CheckCircle className={`w-4 h-4 ${colors.accent}`} />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E30613] to-[#CC050F] flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
                    Respaldo Occident
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Grupo Catalana Occidente
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <div className="text-3xl font-bold text-[#E30613] mb-1">4M+</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Clientes</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <div className="text-3xl font-bold text-[#E30613] mb-1">1.200</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Oficinas</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <div className="text-3xl font-bold text-[#E30613] mb-1">8.4</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Satisfacción</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <div className="text-3xl font-bold text-[#E30613] mb-1">25+</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Años</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#E30613] to-[#CC050F]">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para proteger lo que más te importa?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Solicita tu presupuesto gratuito y sin compromiso. Te asesoramos personalmente.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#E30613] font-semibold rounded-full hover:bg-neutral-100 active:scale-[0.98] transition-all shadow-lg">
                    Solicitar presupuesto
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 active:scale-[0.98] transition-all">
                    <Phone className="w-5 h-5" />
                    Llamar ahora
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-white dark:bg-[#0D0D0D]">
        <div className="container-premium">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
            Otros seguros que te pueden interesar
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(INSURANCE_PRODUCTS)
              .filter(([key]) => key !== productKey)
              .slice(0, 3)
              .map(([key, prod]) => {
                const ProdIcon = iconMap[prod.icon]
                const prodColors = productColors[key]
                return (
                  <Link key={key} href={`/seguros/${prod.slug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group p-6 bg-neutral-50 dark:bg-neutral-900 rounded-2xl hover:bg-white dark:hover:bg-neutral-800 hover:shadow-lg border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700 transition-all duration-300"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${prodColors.light} flex items-center justify-center mb-4`}>
                        <ProdIcon className={`w-7 h-7 ${prodColors.accent}`} />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-2 group-hover:text-[#E30613] transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                        {prod.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E30613] group-hover:gap-2 transition-all">
                        Ver detalles
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.div>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}
