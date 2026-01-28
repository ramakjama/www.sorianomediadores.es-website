import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email/send-email'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Manejar el evento
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const receiptId = session.metadata?.receiptId

      if (receiptId) {
        try {
          // Actualizar recibo a PAGADO
          const receipt = await prisma.receipt.update({
            where: { id: receiptId },
            data: {
              status: 'PAGADO',
              paidDate: new Date(),
              paymentMethod: 'TARJETA',
            },
            include: {
              user: true,
              policy: true,
            },
          })

          // Crear historial de pago
          await prisma.receiptHistory.create({
            data: {
              receiptId: receipt.id,
              status: 'PAGADO',
              action: 'PAGO_REALIZADO',
              description: 'Pago realizado mediante tarjeta (Stripe)',
              metadata: {
                stripeSessionId: session.id,
                paymentIntentId: typeof session.payment_intent === 'string'
                  ? session.payment_intent
                  : session.payment_intent?.id || null,
              },
            },
          })

          console.log(`✅ Recibo ${receipt.receiptNumber} marcado como PAGADO`)

          // Enviar email de confirmación (opcional)
          if (receipt.user.email) {
            await sendEmail({
              to: receipt.user.email,
              subject: `Pago confirmado - ${receipt.receiptNumber}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h1 style="color: #E30613;">Pago confirmado</h1>
                  <p>Tu pago de ${Number(receipt.totalAmount).toFixed(2)}€ ha sido procesado correctamente.</p>
                  <p><strong>Recibo:</strong> ${receipt.receiptNumber}</p>
                  <p><strong>Póliza:</strong> ${receipt.policy.policyNumber}</p>
                </div>
              `,
            })
          }
        } catch (error) {
          console.error('Error procesando pago:', error)
        }
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error('Pago fallido:', paymentIntent.id)
      break
    }

    default:
      console.log(`Evento no manejado: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// Importante: deshabilitar el parsing del body para Stripe webhooks
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
