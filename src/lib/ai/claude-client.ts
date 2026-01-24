import Anthropic from '@anthropic-ai/sdk'
import { SORI_SYSTEM_PROMPT, SORI_KNOWLEDGE_BASE } from './sori-prompts'
import { generateGroqResponse, isGroqConfigured } from './groq-client'

// Verificar que la API key está configurada
const apiKey = process.env.ANTHROPIC_API_KEY

// Cliente de Anthropic (solo se inicializa si hay API key)
let anthropic: Anthropic | null = null

if (apiKey) {
  anthropic = new Anthropic({
    apiKey: apiKey,
  })
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SoriResponse {
  response: string
  success: boolean
  provider?: 'groq' | 'anthropic' | 'fallback'
  error?: string
}

/**
 * Genera una respuesta de SORI
 * Orden de prioridad: Groq (más rápido) → Claude (más inteligente) → Fallback
 */
export async function generateSoriResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<SoriResponse> {

  // 1. Intentar con Groq primero (ultra-rápido, ~200ms)
  if (isGroqConfigured()) {
    const groqResult = await generateGroqResponse(userMessage, conversationHistory)
    if (groqResult.success) {
      return {
        response: groqResult.response,
        success: true,
        provider: 'groq',
      }
    }
    console.warn('Groq falló, intentando con Claude:', groqResult.error)
  }

  // 2. Fallback a Claude si Groq no está disponible
  if (anthropic) {
    try {
      const messages: Anthropic.MessageParam[] = [
        ...conversationHistory.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        {
          role: 'user' as const,
          content: userMessage,
        },
      ]

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SORI_SYSTEM_PROMPT + "\n\n## BASE DE CONOCIMIENTO\n" + SORI_KNOWLEDGE_BASE,
        messages: messages,
      })

      const textContent = response.content.find(block => block.type === 'text')
      const responseText = textContent && 'text' in textContent ? textContent.text : ''

      return {
        response: responseText,
        success: true,
        provider: 'anthropic',
      }
    } catch (error) {
      console.error('Error al llamar a Claude API:', error)
    }
  }

  // 3. Fallback local si ninguna API funciona
  console.warn('APIs no disponibles, usando respuesta de fallback')
  return generateFallbackResponse(userMessage)
}

/**
 * Respuesta de fallback cuando ninguna API está disponible
 */
function generateFallbackResponse(message: string): SoriResponse {
  const lower = message.toLowerCase()

  // Saludos
  if (lower.match(/^(hola|hey|buenas|buenos|saludos|hi)/)) {
    return {
      response: '¡Hola! 👋 Soy SORI, tu asistente de Soriano Mediadores. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros seguros, resolver dudas o ponerte en contacto con un agente.',
      success: true,
      provider: 'fallback',
    }
  }

  // Precios
  if (lower.includes('precio') || lower.includes('cuanto') || lower.includes('cuánto') || lower.includes('coste') || lower.includes('cuesta')) {
    return {
      response: 'El precio depende de varios factores como tu perfil y las coberturas elegidas. Para un presupuesto exacto y personalizado, te recomiendo contactar con nuestro equipo al **966 810 290** o solicitar presupuesto en nuestra web. ¡Sin compromiso! 😊',
      success: true,
      provider: 'fallback',
    }
  }

  // Siniestro
  if (lower.includes('siniestro') || lower.includes('accidente') || lower.includes('parte')) {
    return {
      response: `Lamento que hayas tenido un percance 😔. No te preocupes, estamos aquí para ayudarte:

1. **Llama al 966 810 290** (L-V 9-17h)
2. Ten a mano tu **número de póliza**
3. Describe lo ocurrido con detalle

Si es urgente fuera de horario, contacta directamente con Occident al teléfono de asistencia de tu póliza.`,
      success: true,
      provider: 'fallback',
    }
  }

  // Coche
  if (lower.includes('coche') || lower.includes('auto') || lower.includes('vehículo') || lower.includes('vehiculo')) {
    return {
      response: `🚗 Nuestro **Seguro de Coche** con Occident incluye:

• Asistencia en carretera 24/7
• Vehículo de sustitución
• Red de talleres AutoPresto
• Defensa jurídica incluida

Modalidades desde Terceros Básico hasta Todo Riesgo. ¿Te gustaría que un agente te prepare un presupuesto personalizado?`,
      success: true,
      provider: 'fallback',
    }
  }

  // Hogar
  if (lower.includes('hogar') || lower.includes('casa') || lower.includes('vivienda') || lower.includes('piso')) {
    return {
      response: `🏠 Nuestro **Seguro de Hogar** protege lo más importante:

• Incendio y daños por agua
• Robo y vandalismo
• Responsabilidad civil familiar
• Asistencia hogar 24h
• Bricohogar incluido

Desde la modalidad Básica hasta Exclusivo. ¿Quieres que te informemos sin compromiso?`,
      success: true,
      provider: 'fallback',
    }
  }

  // Salud
  if (lower.includes('salud') || lower.includes('médico') || lower.includes('medico')) {
    return {
      response: `🏥 Nuestro **Seguro de Salud** te ofrece:

• Acceso a 44.000 servicios médicos
• Videoconsulta 24h
• Segunda opinión médica
• Sin carencias en muchas coberturas

Modalidades con copago desde 35€/mes. ¿Te gustaría conocer más detalles?`,
      success: true,
      provider: 'fallback',
    }
  }

  // Vida
  if (lower.includes('vida') || lower.includes('fallecimiento') || lower.includes('invalidez')) {
    return {
      response: `❤️ Nuestro **Seguro de Vida** protege a los tuyos:

• Capital asegurado flexible
• Cobertura de invalidez
• Enfermedades graves opcionales
• Sin reconocimiento médico hasta 50.000€

Es una de las mejores formas de dar tranquilidad a tu familia. ¿Quieres más información?`,
      success: true,
      provider: 'fallback',
    }
  }

  // Soriano Club
  if (lower.includes('club') || lower.includes('puntos') || lower.includes('programa') || lower.includes('descuento')) {
    return {
      response: `🌟 ¡Te encantará **Soriano Club**! Es nuestro programa de fidelización:

• Acumula **puntos** con cada actividad
• Sube de **nivel**: Bronce → Plata → Oro → Platino
• Obtén **descuentos** en tus pólizas
• **Trae amigos** y gana puntos extra

¿Ya eres cliente? ¡Accede a tu área de cliente para ver tus puntos!`,
      success: true,
      provider: 'fallback',
    }
  }

  // Contacto
  if (lower.includes('contacto') || lower.includes('llamar') || lower.includes('teléfono') || lower.includes('telefono') || lower.includes('email') || lower.includes('dirección') || lower.includes('direccion')) {
    return {
      response: `📞 Puedes contactarnos por:

• **Teléfono**: 966 810 290
• **Email**: info@sorianomediadores.es
• **Dirección**: Calle Constitución 5, 03570 Villajoyosa

**Horario**: L-V 9:00-17:00, S 10:00-14:00

¡Estaremos encantados de atenderte! 😊`,
      success: true,
      provider: 'fallback',
    }
  }

  // Respuesta genérica
  return {
    response: `Gracias por tu consulta. Para darte la mejor información, te recomiendo:

• **Llamar** al 966 810 290
• **Escribir** a info@sorianomediadores.es
• **Visitar** nuestra oficina en Villajoyosa

O si lo prefieres, cuéntame más sobre lo que necesitas y haré todo lo posible por ayudarte. 😊`,
    success: true,
    provider: 'fallback',
  }
}

/**
 * Verifica si alguna API de IA está configurada
 */
export function isClaudeConfigured(): boolean {
  return !!apiKey || isGroqConfigured()
}

/**
 * Obtiene el proveedor de IA activo
 */
export function getActiveAIProvider(): 'groq' | 'anthropic' | 'none' {
  if (isGroqConfigured()) return 'groq'
  if (apiKey) return 'anthropic'
  return 'none'
}
