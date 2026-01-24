import Groq from 'groq-sdk'
import { SORI_SYSTEM_PROMPT, SORI_KNOWLEDGE_BASE } from './sori-prompts'

const groqApiKey = process.env.GROQ_API_KEY

let groq: Groq | null = null

if (groqApiKey) {
  groq = new Groq({
    apiKey: groqApiKey,
  })
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SoriResponse {
  response: string
  success: boolean
  provider: 'groq' | 'anthropic' | 'fallback'
  error?: string
}

/**
 * Genera una respuesta de SORI usando Groq (LLaMA 3.3 70B - Ultra rápido)
 */
export async function generateGroqResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<SoriResponse> {
  if (!groq) {
    return {
      response: '',
      success: false,
      provider: 'fallback',
      error: 'GROQ_API_KEY no configurada',
    }
  }

  try {
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SORI_SYSTEM_PROMPT + "\n\n## BASE DE CONOCIMIENTO\n" + SORI_KNOWLEDGE_BASE,
      },
      ...conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: userMessage,
      },
    ]

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
    })

    const responseText = response.choices[0]?.message?.content || ''

    return {
      response: responseText,
      success: true,
      provider: 'groq',
    }
  } catch (error) {
    console.error('Error al llamar a Groq API:', error)
    return {
      response: '',
      success: false,
      provider: 'fallback',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

/**
 * Verifica si Groq API está configurada
 */
export function isGroqConfigured(): boolean {
  return !!groqApiKey
}
