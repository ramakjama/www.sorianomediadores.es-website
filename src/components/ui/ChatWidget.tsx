'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Phone, Mail, Sparkles, ArrowRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { COMPANY_INFO } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
}

const quickActions = [
  { label: 'Seguro de Coche', value: 'Quiero información sobre seguro de coche', icon: '🚗' },
  { label: 'Seguro de Hogar', value: 'Quiero información sobre seguro de hogar', icon: '🏠' },
  { label: 'Tengo un siniestro', value: 'Necesito comunicar un siniestro', icon: '⚠️' },
  { label: 'Solicitar presupuesto', value: 'Quiero solicitar un presupuesto', icon: '💰' },
]

const suggestions = [
  '¿Qué coberturas tiene el seguro de coche?',
  '¿Cuánto cuesta el seguro de hogar?',
  '¿Cómo puedo contactar con un agente?',
  '¿Qué es el Soriano Club?',
]

export function ChatWidget() {
  const { isChatOpen, toggleChat } = useStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (value?: string) => {
    const messageContent = value || inputValue.trim()
    if (!messageContent || isTyping) return

    setShowWelcome(false)

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageContent,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          conversationId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.conversationId) {
          setConversationId(data.conversationId)
        }

        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: data.response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        throw new Error(data.error || 'Error al procesar mensaje')
      }
    } catch (error) {
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o contáctanos al 966 810 290.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    handleSend(action)
  }

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <>
      {/* Chat button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-occident to-occident-600 rounded-full shadow-xl shadow-occident/30 flex items-center justify-center text-white hover:shadow-2xl hover:shadow-occident/40 transition-all duration-300"
            aria-label="Abrir chat con SORI"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[650px] max-h-[calc(100vh-100px)] bg-apple-white dark:bg-apple-gray-900 rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/50 flex flex-col overflow-hidden border border-apple-gray-200 dark:border-apple-gray-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-occident to-occident-600 text-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">SORI</div>
                    <div className="text-sm text-white/80 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Asistente IA de Soriano
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="w-10 h-10 rounded-xl hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome screen */}
              {showWelcome && messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-occident/10 to-occident/20 dark:from-occident/20 dark:to-occident/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-10 h-10 text-occident" />
                  </div>
                  <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-apple-white mb-2">
                    Hola, soy SORI
                  </h3>
                  <p className="text-apple-gray-500 dark:text-apple-gray-400 text-sm mb-6 max-w-xs mx-auto">
                    Tu asistente virtual de Soriano Mediadores. Puedo ayudarte con información sobre seguros, presupuestos y mucho más.
                  </p>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.value}
                        onClick={() => handleQuickAction(action.value)}
                        className="flex items-center gap-2 px-4 py-3 text-sm bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl hover:bg-occident hover:text-white text-apple-gray-700 dark:text-apple-gray-300 transition-all duration-200 text-left group"
                      >
                        <span className="text-lg">{action.icon}</span>
                        <span className="flex-1">{action.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-3',
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0',
                      message.type === 'bot'
                        ? 'bg-occident/10 dark:bg-occident/20 text-occident'
                        : 'bg-apple-gray-200 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300'
                    )}
                  >
                    {message.type === 'bot' ? (
                      <Sparkles className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line',
                      message.type === 'bot'
                        ? 'bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-800 dark:text-apple-gray-200 rounded-tl-md'
                        : 'bg-occident text-white rounded-tr-md'
                    )}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-occident/10 dark:bg-occident/20 text-occident flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-apple-gray-100 dark:bg-apple-gray-800 rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-apple-gray-400 dark:bg-apple-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-apple-gray-400 dark:bg-apple-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-apple-gray-400 dark:bg-apple-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length > 0 && messages.length < 4 && !isTyping && (
              <div className="px-4 py-2 border-t border-apple-gray-100 dark:border-apple-gray-800">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {suggestions.slice(0, 2).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      className="flex-shrink-0 px-3 py-1.5 text-xs bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-600 dark:text-apple-gray-400 rounded-full hover:bg-occident/10 hover:text-occident transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick contact */}
            <div className="px-4 py-2 bg-apple-gray-50 dark:bg-apple-gray-800/50 border-t border-apple-gray-100 dark:border-apple-gray-800 flex gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-apple-gray-600 dark:text-apple-gray-400 hover:text-occident hover:bg-white dark:hover:bg-apple-gray-800 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                Llamar
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-apple-gray-600 dark:text-apple-gray-400 hover:text-occident hover:bg-white dark:hover:bg-apple-gray-800 rounded-xl transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-apple-gray-100 dark:border-apple-gray-800 bg-apple-white dark:bg-apple-gray-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-xl text-sm text-apple-gray-900 dark:text-apple-white placeholder-apple-gray-500 focus:outline-none focus:ring-2 focus:ring-occident/30 focus:bg-white dark:focus:bg-apple-gray-700 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 bg-occident text-white rounded-xl flex items-center justify-center hover:bg-occident-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-apple-gray-400 dark:text-apple-gray-500 text-center mt-2">
                SORI puede cometer errores. Consulta con un agente para información oficial.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
