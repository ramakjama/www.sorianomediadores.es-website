'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'default' | 'white' | 'dark' | 'color'
  showTagline?: boolean
}

export function Logo({ className, variant = 'default', showTagline = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Logo real de Soriano Mediadores */}
      <Image
        src="/images/logos/soriano-logo.png"
        alt="Soriano Mediadores"
        width={180}
        height={60}
        className="h-10 w-auto object-contain"
        priority
      />
    </div>
  )
}

// Logo compacto solo isotipo
export function LogoIcon({ className, variant = 'color' }: { className?: string; variant?: 'color' | 'white' | 'dark' }) {
  const bgColor = variant === 'white'
    ? '#FFFFFF'
    : variant === 'dark'
      ? '#171717'
      : '#E30613'

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-10 w-10', className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Soriano Mediadores"
    >
      <circle cx="24" cy="24" r="24" fill={bgColor} />
      <path
        d="M33.5 18.5C33.5 14.4 30.1 11 26 11H15V15H26C27.9 15 29.5 16.6 29.5 18.5C29.5 20.4 27.9 22 26 22H18C13.9 22 10.5 25.4 10.5 29.5C10.5 33.6 13.9 37 18 37H29V33H18C16.1 33 14.5 31.4 14.5 29.5C14.5 27.6 16.1 26 18 26H26C30.1 26 33.5 22.6 33.5 18.5Z"
        fill={variant === 'color' ? 'white' : variant === 'white' ? '#E30613' : 'white'}
      />
    </svg>
  )
}

// Logo de Occident
export function OccidentLogo({ className, variant = 'color' }: { className?: string; variant?: 'color' | 'white' | 'dark' }) {
  const textColor = variant === 'white'
    ? '#FFFFFF'
    : variant === 'dark'
      ? '#171717'
      : '#E30613'

  return (
    <svg
      viewBox="0 0 140 32"
      className={cn('h-6 w-auto', className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Occident"
    >
      <g fill={textColor}>
        {/* O */}
        <path d="M13 4C6.4 4 1 9.4 1 16s5.4 12 12 12 12-5.4 12-12S19.6 4 13 4zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
        {/* c */}
        <path d="M38 10c-5 0-9 4-9 9s4 9 9 9c3 0 5.5-1.5 7-3.5l-3-2c-1 1.2-2.3 2-4 2-3 0-5.5-2.2-5.5-5.5S35 14 38 14c1.7 0 3 .8 4 2l3-2c-1.5-2-4-4-7-4z"/>
        {/* c */}
        <path d="M58 10c-5 0-9 4-9 9s4 9 9 9c3 0 5.5-1.5 7-3.5l-3-2c-1 1.2-2.3 2-4 2-3 0-5.5-2.2-5.5-5.5S55 14 58 14c1.7 0 3 .8 4 2l3-2c-1.5-2-4-4-7-4z"/>
        {/* i */}
        <path d="M72 5h4v4h-4V5zm0 6h4v16h-4V11z"/>
        {/* d */}
        <path d="M90 10c-2.5 0-4.5 1-6 3V4h-4v23h4v-2.5c1.5 2 3.5 3 6 3 5 0 9-4 9-9s-4-8.5-9-8.5zm-.5 14c-3 0-5.5-2.2-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.2 5.5 5.5-2.5 5.5-5.5 5.5z"/>
        {/* e */}
        <path d="M112 10c-5 0-9 4-9 9s4 9 9 9c3.5 0 6.5-2 8-5l-3.5-1.5c-1 2-2.5 3-4.5 3-2.5 0-4.5-1.5-5-4h14v-1.5c0-5-4-9-9-9zm-5 7c.5-2.5 2.5-4 5-4s4.5 1.5 5 4h-10z"/>
        {/* n */}
        <path d="M134 10c-2 0-4 1-5 2.5V11h-4v16h4v-9c0-2.5 2-4.5 4.5-4.5s4 2 4 4.5v9h4V17c0-4-3-7-7.5-7z"/>
        {/* t */}
        <path d="M151 5v6h-3v3.5h3V27h4V14.5h3V11h-3V5h-4z"/>
      </g>
    </svg>
  )
}

// Badge "Powered by Occident"
export function PoweredByOccident({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        Mediador exclusivo de
      </span>
      <OccidentLogo className="h-4" variant="color" />
    </div>
  )
}
