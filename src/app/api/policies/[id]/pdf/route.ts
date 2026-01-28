import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generatePolicyDocumentPDF } from '@/lib/pdf/pdf-generator'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Buscar póliza
    const policy = await prisma.policy.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            dni: true,
            address: true,
            city: true,
            postalCode: true,
            phone: true,
            email: true,
          },
        },
      },
    })

    if (!policy) {
      return NextResponse.json({ error: 'Póliza no encontrada' }, { status: 404 })
    }

    // Preparar datos para el PDF
    const policyData = {
      policyNumber: policy.policyNumber,
      type: policy.type,
      holder: {
        name: policy.user.name || 'Sin nombre',
        dni: policy.user.dni || 'Sin DNI',
        address: `${policy.user.address || ''}, ${policy.user.postalCode || ''} ${policy.user.city || ''}`.trim(),
        phone: policy.user.phone || 'Sin teléfono',
        email: policy.user.email || 'Sin email',
      },
      insuredObject: policy.description || 'Objeto asegurado',
      startDate: policy.startDate.toLocaleDateString('es-ES'),
      endDate: policy.endDate.toLocaleDateString('es-ES'),
      premium: Number(policy.premium),
      paymentFrequency: policy.paymentFrequency,
      coverages: [
        {
          name: 'Responsabilidad Civil',
          limit: 'Ilimitado',
          franchise: '-',
        },
        {
          name: 'Daños Propios',
          limit: 'Valor Declarado',
          franchise: '300€',
        },
        {
          name: 'Robo',
          limit: 'Valor Declarado',
          franchise: '150€',
        },
        {
          name: 'Asistencia en Viaje',
          limit: 'Incluida',
          franchise: '-',
        },
      ],
    }

    // Generar PDF
    const pdf = generatePolicyDocumentPDF(policyData)
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    // Devolver PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Poliza_${policy.policyNumber}.pdf"`,
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
