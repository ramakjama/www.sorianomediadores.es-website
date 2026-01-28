import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { receiptId } = body

    if (!receiptId) {
      return NextResponse.json({ error: 'receiptId requerido' }, { status: 400 })
    }

    // Buscar recibo
    const receipt = await prisma.receipt.findUnique({
      where: {
        id: receiptId,
        userId: session.user.id,
      },
      include: {
        policy: {
          select: {
            policyNumber: true,
            type: true,
          },
        },
      },
    })

    if (!receipt) {
      return NextResponse.json({ error: 'Recibo no encontrado' }, { status: 404 })
    }

    if (receipt.status === 'PAGADO') {
      return NextResponse.json({ error: 'Este recibo ya está pagado' }, { status: 400 })
    }

    // Crear sesión de Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Recibo ${receipt.receiptNumber}`,
              description: `Póliza: ${receipt.policy.policyNumber} - ${receipt.concept}`,
              metadata: {
                receiptId: receipt.id,
                policyNumber: receipt.policy.policyNumber,
              },
            },
            unit_amount: Math.round(Number(receipt.totalAmount) * 100), // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/recibos?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/recibos?canceled=true`,
      metadata: {
        receiptId: receipt.id,
        userId: session.user.id,
        policyNumber: receipt.policy.policyNumber,
      },
      customer_email: session.user.email || undefined,
    })

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url
    })
  } catch (error) {
    console.error('Error creando checkout:', error)
    return NextResponse.json(
      { error: 'Error creando sesión de pago' },
      { status: 500 }
    )
  }
}
