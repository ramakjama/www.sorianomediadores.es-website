import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguros para Empresas | Soriano Mediadores',
  description: 'Seguros empresariales: RC empresarial, flotas, multirriesgo, convenios de salud. Protección integral para tu empresa con Occident.',
  openGraph: {
    title: 'Seguros para Empresas | Soriano Mediadores',
    description: 'Protección integral para tu empresa. Flotas, RC, multirriesgo y más.',
    url: '/empresas',
    type: 'website',
  },
  keywords: ['seguros empresas', 'RC empresarial', 'seguro flotas', 'multirriesgo empresa', 'convenio salud empresa'],
}

export default function EmpresasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
