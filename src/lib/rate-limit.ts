// Rate limiting simple usando Map en memoria
// Para producción, usar Redis

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

export interface RateLimitOptions {
  interval: number // en milisegundos
  maxRequests: number
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { interval: 60000, maxRequests: 60 } // default: 60 req/min
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Limpiar entradas expiradas (garbage collection simple)
  if (entry && now > entry.resetTime) {
    rateLimitMap.delete(identifier)
  }

  const currentEntry = rateLimitMap.get(identifier)

  if (!currentEntry) {
    // Primera petición
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + options.interval,
    })
    return {
      success: true,
      remaining: options.maxRequests - 1,
      resetTime: now + options.interval,
    }
  }

  if (currentEntry.count >= options.maxRequests) {
    // Límite excedido
    return {
      success: false,
      remaining: 0,
      resetTime: currentEntry.resetTime,
    }
  }

  // Incrementar contador
  currentEntry.count++
  rateLimitMap.set(identifier, currentEntry)

  return {
    success: true,
    remaining: options.maxRequests - currentEntry.count,
    resetTime: currentEntry.resetTime,
  }
}

// Helper para APIs
export function rateLimitByIP(
  ip: string,
  options?: RateLimitOptions
) {
  return rateLimit(`ip:${ip}`, options)
}

export function rateLimitByUser(
  userId: string,
  options?: RateLimitOptions
) {
  return rateLimit(`user:${userId}`, options)
}

// Cleanup automático cada 5 minutos
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}
