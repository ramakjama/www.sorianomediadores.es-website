import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HeroSection } from '@/components/home/HeroSection'

// Lazy load all below-the-fold components with loading states
const TrustBadges = dynamic(() => import('@/components/home/TrustBadges').then(m => m.TrustBadges), { ssr: true })
const ProductsSection = dynamic(() => import('@/components/home/ProductsSection').then(m => m.ProductsSection), { ssr: false })
const WhyUsSection = dynamic(() => import('@/components/home/WhyUsSection').then(m => m.WhyUsSection), { ssr: false })
const StatsSection = dynamic(() => import('@/components/home/StatsSection').then(m => m.StatsSection), { ssr: false })
const CalculatorSection = dynamic(() => import('@/components/home/CalculatorSection').then(m => m.CalculatorSection), { ssr: false })
const TestimonialsTabs = dynamic(() => import('@/components/home/TestimonialsTabs').then(m => m.TestimonialsTabs), { ssr: false })
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection').then(m => m.PartnersSection), { ssr: false })
const FAQSection = dynamic(() => import('@/components/home/FAQSection').then(m => m.FAQSection), { ssr: false })
const CTASection = dynamic(() => import('@/components/home/CTASection').then(m => m.CTASection), { ssr: false })

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={null}>
        <TrustBadges />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <ProductsSection />
      </Suspense>
      <Suspense fallback={null}>
        <WhyUsSection />
        <StatsSection />
        <CalculatorSection />
        <TestimonialsTabs />
        <PartnersSection />
        <FAQSection />
        <CTASection />
      </Suspense>
    </>
  )
}
