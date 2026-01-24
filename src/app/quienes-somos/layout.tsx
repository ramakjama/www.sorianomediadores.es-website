import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Soriano Mediadores',
  description: 'Conoce al equipo de Soriano Mediadores. Más de 25 años protegiendo familias y empresas en la Comunidad Valenciana. Mediadores de seguros de confianza.',
  openGraph: {
    title: 'Quiénes Somos | Soriano Mediadores',
    description: 'Conoce al equipo de Soriano Mediadores. Más de 25 años protegiendo familias y empresas.',
    url: '/quienes-somos',
    type: 'website',
  },
  keywords: ['equipo Soriano', 'mediadores seguros Alicante', 'quiénes somos', 'sobre nosotros', 'Villajoyosa'],
}

export default function QuienesSomosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
