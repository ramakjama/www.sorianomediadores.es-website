import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { SessionProvider } from '@/components/providers/SessionProvider'

// Lazy load heavy components
const ChatWidget = dynamic(() => import('@/components/ui/ChatWidget').then(mod => ({ default: mod.ChatWidget })), {
  ssr: false,
  loading: () => null,
})

const Toaster = dynamic(() => import('react-hot-toast').then(mod => ({ default: mod.Toaster })), {
  ssr: false,
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Soriano Mediadores | Tu tranquilidad, nuestra prioridad',
    template: '%s | Soriano Mediadores'
  },
  description: 'Mediadores de seguros de confianza. Protegemos lo que mas te importa con las mejores coberturas de Occident.',
  keywords: ['seguros', 'mediador de seguros', 'Occident', 'seguro coche', 'seguro hogar', 'Villajoyosa'],
  metadataBase: new URL('https://www.sorianomediadores.es'),
  openGraph: {
    title: 'Soriano Mediadores',
    description: 'Mediadores de seguros de confianza',
    url: 'https://www.sorianomediadores.es',
    siteName: 'Soriano Mediadores',
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#E30613',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="top-right" />
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <ChatWidget />
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
