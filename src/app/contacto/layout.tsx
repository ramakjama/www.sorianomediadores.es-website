import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto | Soriano Mediadores',
  description: 'Contacta con Soriano Mediadores. Llámanos al 966 810 290 o visítanos en Villajoyosa, Alicante. Asesoramiento personalizado sin compromiso.',
  openGraph: {
    title: 'Contacto | Soriano Mediadores',
    description: 'Contacta con nosotros. Asesoramiento personalizado sin compromiso.',
    url: '/contacto',
    type: 'website',
  },
  keywords: ['contacto seguros', 'teléfono Soriano', 'dirección', 'Villajoyosa', 'presupuesto seguros'],
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
