'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface PaymentButtonProps {
  receiptId: string
  amount: number
  receiptNumber: string
}

export function PaymentButton({ receiptId, amount, receiptNumber }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiptId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error creando sesión de pago')
      }

      // Redirigir a Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Error procesando pago')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E30613] text-white rounded-lg hover:bg-[#CC050F] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Procesando...
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5" />
          Pagar {amount.toFixed(2)}€
        </>
      )}
    </button>
  )
}
