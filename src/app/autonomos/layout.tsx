import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguros para Autónomos | Soriano Mediadores',
  description: 'Seguros especializados para autónomos: RC Profesional, multirriesgo, salud y ahorro. Protege tu negocio y a ti mismo con Occident.',
  openGraph: {
    title: 'Seguros para Autónomos | Soriano Mediadores',
    description: 'Protege tu negocio con seguros especializados para autónomos.',
    url: '/autonomos',
    type: 'website',
  },
  keywords: ['seguros autónomos', 'RC profesional', 'seguro autónomo', 'multirriesgo negocio', 'Alicante'],
}

export default function AutonomosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
