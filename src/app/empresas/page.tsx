import { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2, Users, Car, Shield, Briefcase, FileText,
  CheckCircle, ArrowRight, Phone, Truck, HardHat, Store
} from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Seguros para Empresas',
  description: 'Soluciones de seguros para empresas y autónomos. Responsabilidad civil, flotas, convenios de salud, multirriesgo comercial y más.',
}

const solutions = [
  {
    icon: Shield,
    title: 'Responsabilidad Civil',
    description: 'Protege tu empresa ante reclamaciones de terceros. RC profesional, de explotación y productos.',
    features: ['RC Profesional', 'RC Explotación', 'RC Productos', 'D&O Directivos'],
  },
  {
    icon: Car,
    title: 'Flotas de Vehículos',
    description: 'Gestión integral de la flota de tu empresa con las mejores condiciones y servicio.',
    features: ['Condiciones especiales', 'Gestión centralizada', 'Asistencia 24h', 'Renting incluido'],
  },
  {
    icon: Users,
    title: 'Convenios de Salud',
    description: 'Cuida de tus empleados con seguros de salud colectivos con condiciones ventajosas.',
    features: ['Sin cuestionario de salud', 'Precios especiales', 'Cobertura completa', 'Videoconsulta'],
  },
  {
    icon: Store,
    title: 'Multirriesgo Comercial',
    description: 'Protección integral para tu negocio, local comercial y su contenido.',
    features: ['Daños materiales', 'Pérdida de beneficios', 'Robo', 'RC del local'],
  },
  {
    icon: HardHat,
    title: 'Accidentes Convenio',
    description: 'Cumple con la normativa laboral y protege a tus trabajadores.',
    features: ['Cobertura 24h', 'Accidente laboral', 'Invalidez', 'Fallecimiento'],
  },
  {
    icon: Truck,
    title: 'Transporte de Mercancías',
    description: 'Protege tus envíos y mercancías durante el transporte.',
    features: ['Transporte nacional', 'Transporte internacional', 'Mercancía en depósito', 'Responsabilidad del transportista'],
  },
]

const sectors = [
  'Comercio minorista',
  'Hostelería y restauración',
  'Construcción',
  'Transporte y logística',
  'Servicios profesionales',
  'Sanidad y farmacias',
  'Industria',
  'Tecnología',
]

export default function EmpresasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-soriano-dark to-primary-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-semibold text-primary-300">Empresas y Autónomos</span>
            </div>

            <h1 className="text-display-md md:text-display-lg font-display font-bold text-white mb-6">
              Soluciones de seguros{' '}
              <span className="text-primary-400">para tu negocio</span>
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Protege tu empresa, tus empleados y tu patrimonio con coberturas diseñadas
              específicamente para el mundo empresarial. Asesoramiento experto y condiciones especiales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacto">
                <button className="btn-primary group">
                  <span className="flex items-center gap-2">
                    Solicitar presupuesto
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                <button className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar ahora
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits bar */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, text: 'Asesoramiento especializado' },
              { icon: FileText, text: 'Gestión integral de pólizas' },
              { icon: Users, text: 'Atención personalizada' },
              { icon: Shield, text: 'Respaldo de Occident' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium text-soriano-dark">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-display-sm font-display font-bold text-soriano-dark mb-6">
              Soluciones para cada necesidad
            </h2>
            <p className="text-lg text-soriano-gray">
              Ofrecemos una gama completa de seguros empresariales adaptados a cada
              tipo de negocio y sector de actividad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div key={solution.title} className="card-premium group">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                  <solution.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-soriano-dark mb-3">{solution.title}</h3>
                <p className="text-soriano-gray mb-4">{solution.description}</p>

                <ul className="space-y-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-soriano-gray">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-display-sm font-display font-bold text-soriano-dark mb-6">
                Experiencia en tu sector
              </h2>

              <p className="text-lg text-soriano-gray mb-8">
                Trabajamos con empresas de todos los sectores y tamaños. Nuestra experiencia
                nos permite entender las necesidades específicas de cada actividad y ofrecer
                soluciones a medida.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {sectors.map((sector) => (
                  <span key={sector} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-soriano-dark">
                    {sector}
                  </span>
                ))}
              </div>

              <Link href="/contacto">
                <button className="btn-primary group">
                  <span className="flex items-center gap-2">
                    Consulta tu caso
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-2xl p-6">
                  <Briefcase className="w-8 h-8 text-primary-600 mb-4" />
                  <div className="text-3xl font-bold text-soriano-dark">500+</div>
                  <div className="text-sm text-soriano-gray">Empresas confían en nosotros</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <Shield className="w-8 h-8 text-green-600 mb-4" />
                  <div className="text-3xl font-bold text-soriano-dark">25+</div>
                  <div className="text-sm text-soriano-gray">Años de experiencia</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <Users className="w-8 h-8 text-blue-600 mb-4" />
                  <div className="text-3xl font-bold text-soriano-dark">98%</div>
                  <div className="text-sm text-soriano-gray">Renovaciones</div>
                </div>
                <div className="bg-accent-gold/10 rounded-2xl p-6">
                  <FileText className="w-8 h-8 text-accent-gold mb-4" />
                  <div className="text-3xl font-bold text-soriano-dark">24h</div>
                  <div className="text-sm text-soriano-gray">Emisión de certificados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-display-sm font-display font-bold mb-6">
              ¿Necesitas un seguro para tu empresa?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Contacta con nosotros para un estudio personalizado sin compromiso.
              Te llamamos en menos de 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <button className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group">
                  Solicitar presupuesto
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phoneClean}`}>
                <button className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5 mr-2" />
                  {COMPANY_INFO.phone}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
