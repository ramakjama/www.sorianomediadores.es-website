import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguros para Particulares | Soriano Mediadores',
  description: 'Seguros para particulares: coche, hogar, vida, salud, decesos y ahorro. Protege a tu familia con las mejores coberturas de Occident.',
  openGraph: {
    title: 'Seguros para Particulares | Soriano Mediadores',
    description: 'Protege a tu familia con las mejores coberturas. Coche, hogar, vida, salud y más.',
    url: '/particulares',
    type: 'website',
  },
  keywords: ['seguros particulares', 'seguro coche', 'seguro hogar', 'seguro vida', 'seguro salud', 'Alicante'],
}

export default function ParticularesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
