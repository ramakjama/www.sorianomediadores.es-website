import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBadges } from '@/components/home/TrustBadges'
import { ProductsSection } from '@/components/home/ProductsSection'

// Lazy load below-the-fold components
const WhyUsSection = dynamic(() => import('@/components/home/WhyUsSection').then(m => m.WhyUsSection))
const StatsSection = dynamic(() => import('@/components/home/StatsSection').then(m => m.StatsSection))
const CalculatorSection = dynamic(() => import('@/components/home/CalculatorSection').then(m => m.CalculatorSection))
const TestimonialsTabs = dynamic(() => import('@/components/home/TestimonialsTabs').then(m => m.TestimonialsTabs))
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection').then(m => m.PartnersSection))
const FAQSection = dynamic(() => import('@/components/home/FAQSection').then(m => m.FAQSection))
const BlogPreview = dynamic(() => import('@/components/home/BlogPreview').then(m => m.BlogPreview))
const CTASection = dynamic(() => import('@/components/home/CTASection').then(m => m.CTASection))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <ProductsSection />
      <WhyUsSection />
      <StatsSection />
      <CalculatorSection />
      <TestimonialsTabs />
      <PartnersSection />
      <FAQSection />
      <BlogPreview />
      <CTASection />
    </>
  )
}
