import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soriano Club | Programa de Fidelización',
  description: 'Únete a Soriano Club y acumula puntos con tus pólizas. Niveles exclusivos, descuentos y beneficios para clientes fieles. ¡Empieza a ganar hoy!',
  openGraph: {
    title: 'Soriano Club | Programa de Fidelización',
    description: 'Programa de fidelización con niveles, puntos y descuentos exclusivos.',
    url: '/comunidad',
    type: 'website',
  },
  keywords: ['Soriano Club', 'fidelización seguros', 'puntos', 'descuentos', 'beneficios clientes'],
}

export default function ComunidadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
