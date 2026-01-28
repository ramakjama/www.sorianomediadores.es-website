import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateReceiptPDF } from '@/lib/pdf/pdf-generator'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Buscar recibo
    const receipt = await prisma.receipt.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        policy: {
          select: {
            policyNumber: true,
            type: true,
          },
        },
        user: {
          select: {
            name: true,
            dni: true,
            address: true,
            city: true,
            postalCode: true,
          },
        },
      },
    })

    if (!receipt) {
      return NextResponse.json({ error: 'Recibo no encontrado' }, { status: 404 })
    }

    // Preparar datos para el PDF
    const receiptData = {
      receiptNumber: receipt.receiptNumber,
      policyNumber: receipt.policy.policyNumber,
      policyType: receipt.policy.type,
      concept: receipt.concept,
      period: receipt.period,
      amount: Number(receipt.amount),
      tax: Number(receipt.tax),
      totalAmount: Number(receipt.totalAmount),
      issueDate: receipt.issueDate.toLocaleDateString('es-ES'),
      dueDate: receipt.dueDate.toLocaleDateString('es-ES'),
      paidDate: receipt.paidDate?.toLocaleDateString('es-ES'),
      paymentMethod: receipt.paymentMethod || undefined,
      bankAccount: receipt.bankAccount || undefined,
      clientName: receipt.user.name || 'Sin nombre',
      clientDni: receipt.user.dni || 'Sin DNI',
      clientAddress: `${receipt.user.address || ''}, ${receipt.user.postalCode || ''} ${receipt.user.city || ''}`.trim(),
    }

    // Generar PDF
    const pdf = generateReceiptPDF(receiptData)
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    // Devolver PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Recibo_${receipt.receiptNumber}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generando PDF:', error)
    return NextResponse.json(
      { error: 'Error generando PDF' },
      { status: 500 }
    )
  }
}
