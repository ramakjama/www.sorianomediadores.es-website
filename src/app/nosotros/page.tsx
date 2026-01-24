import { Metadata } from 'next'
import Link from 'next/link'
import {
  Users, Award, Heart, Target, CheckCircle, ArrowRight,
  Building2, MapPin, Phone, Mail
} from 'lucide-react'
import { COMPANY_INFO, OCCIDENT_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce a Soriano Mediadores, tu correduría de seguros de confianza con más de 25 años de experiencia. Descubre nuestra historia, valores y equipo.',
}

const values = [
  {
    icon: Heart,
    title: 'Compromiso',
    description: 'Nos comprometemos con cada cliente como si fuera de nuestra familia. Tu tranquilidad es nuestra prioridad.',
  },
  {
    icon: Award,
    title: 'Excelencia',
    description: 'Buscamos la excelencia en cada gestión, ofreciendo las mejores soluciones del mercado.',
  },
  {
    icon: Target,
    title: 'Transparencia',
    description: 'Sin letra pequeña ni sorpresas. Te explicamos todo de forma clara y honesta.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Estamos cerca de ti, conocemos tu nombre, tu historia y tus necesidades.',
  },
]

const timeline = [
  { year: '1998', event: 'Fundación de Soriano Mediadores en Villajoyosa' },
  { year: '2005', event: 'Expansión a toda la provincia de Alicante' },
  { year: '2010', event: 'Alianza estratégica con Occident' },
  { year: '2015', event: 'Digitalización completa de procesos' },
  { year: '2020', event: 'Lanzamiento de portal online para clientes' },
  { year: '2024', event: 'Renovación de imagen y servicios premium' },
]

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Sobre Nosotros</span>
            </div>

            <h1 className="text-display-md md:text-display-lg font-display font-bold text-soriano-dark mb-6">
              Más de 25 años{' '}
              <span className="gradient-text">protegiendo familias</span>
            </h1>

            <p className="text-lg text-soriano-gray">
              Somos una correduría de seguros familiar, comprometida con ofrecer el mejor
              asesoramiento y las coberturas más completas para cada uno de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-display-sm font-display font-bold text-soriano-dark mb-6">
                Nuestra historia
              </h2>

              <div className="space-y-4 text-soriano-gray">
                <p>
                  <strong className="text-soriano-dark">Soriano Mediadores</strong> nació en 1998 en
                  Villajoyosa, Alicante, con una misión clara: ofrecer a las familias y empresas de
                  nuestra comunidad un servicio de mediación de seguros cercano, profesional y transparente.
                </p>
                <p>
                  Lo que comenzó como una pequeña oficina familiar se ha convertido en una correduría
                  de referencia en la Comunidad Valenciana, manteniendo siempre los valores que nos
                  vieron nacer: <strong className="text-soriano-dark">compromiso, honestidad y cercanía</strong>.
                </p>
                <p>
                  Nuestra alianza con <strong className="text-soriano-dark">Occident - Grupo Catalana Occidente</strong>,
                  una de las aseguradoras más sólidas de España, nos permite ofrecer las mejores
                  coberturas del mercado con el respaldo de más de 4 millones de clientes satisfechos.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">25+</div>
                  <div className="text-sm text-soriano-gray">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">1000+</div>
                  <div className="text-sm text-soriano-gray">Familias protegidas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">98%</div>
                  <div className="text-sm text-soriano-gray">Renovaciones</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={item.year} className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 bg-white border-2 border-primary-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <div className="text-sm font-bold text-primary-600 mb-1">{item.year}</div>
                    <div className="text-soriano-dark">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-display-sm font-display font-bold text-soriano-dark mb-6">
              Nuestros valores
            </h2>
            <p className="text-lg text-soriano-gray">
              Los principios que guían cada una de nuestras acciones y decisiones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="card-premium text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-soriano-dark mb-2">{value.title}</h3>
                <p className="text-soriano-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Nuestro Partner</span>
              </div>

              <h2 className="text-display-sm font-display font-bold text-soriano-dark mb-6">
                Respaldados por Occident
              </h2>

              <p className="text-soriano-gray mb-6">
                Occident forma parte del <strong className="text-soriano-dark">Grupo Catalana Occidente</strong>,
                uno de los grupos aseguradores más sólidos y con mayor trayectoria de España,
                con más de 150 años de historia.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-soriano-dark">{OCCIDENT_INFO.clients.toLocaleString()}</div>
                  <div className="text-sm text-soriano-gray">Clientes</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-soriano-dark">{OCCIDENT_INFO.satisfaction}/10</div>
                  <div className="text-sm text-soriano-gray">Satisfacción</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-soriano-dark">{OCCIDENT_INFO.offices}</div>
                  <div className="text-sm text-soriano-gray">Oficinas</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-soriano-dark">{OCCIDENT_INFO.medicalServices.toLocaleString()}</div>
                  <div className="text-sm text-soriano-gray">Servicios médicos</div>
                </div>
              </div>

              <ul className="space-y-2">
                {[
                  'Solvencia financiera garantizada',
                  'Atención al cliente 24/7',
                  'Red de profesionales en toda España',
                  'Innovación constante en productos',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-soriano-gray">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#003366] to-[#004d99] rounded-3xl p-12 text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Occident</div>
                  <div className="text-white/70">Grupo Catalana Occidente</div>
                </div>
              </div>

              <blockquote className="text-lg text-white/90 italic mb-6">
                "Nuestra misión es proteger lo que más importa a las personas,
                ofreciendo soluciones aseguradoras que aporten tranquilidad y confianza."
              </blockquote>

              <div className="pt-6 border-t border-white/20">
                <div className="text-sm text-white/70">Más de 150 años de historia aseguradora</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="card-premium p-12 text-center">
            <h2 className="text-display-sm font-display font-bold text-soriano-dark mb-4">
              ¿Quieres conocernos mejor?
            </h2>
            <p className="text-lg text-soriano-gray mb-8 max-w-2xl mx-auto">
              Visítanos en nuestra oficina o contacta con nosotros. Estaremos encantados
              de atenderte y resolver todas tus dudas.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <div className="flex items-center justify-center gap-2 text-soriano-gray">
                <MapPin className="w-5 h-5 text-primary-500" />
                {COMPANY_INFO.address.full}
              </div>
              <div className="flex items-center justify-center gap-2 text-soriano-gray">
                <Phone className="w-5 h-5 text-primary-500" />
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
          </div>
        </div>
      </section>
    </>
  )
}
