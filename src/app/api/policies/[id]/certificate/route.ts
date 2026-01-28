import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generatePolicyCertificatePDF } from '@/lib/pdf/pdf-generator'

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
          },
        },
      },
    })

    if (!policy) {
      return NextResponse.json({ error: 'Póliza no encontrada' }, { status: 404 })
    }

    // Preparar datos para el PDF
    const certificateData = {
      policyNumber: policy.policyNumber,
      type: policy.type,
      holder: {
        name: policy.user.name || 'Sin nombre',
        dni: policy.user.dni || 'Sin DNI',
      },
      insuredObject: policy.description || 'Objeto asegurado',
      startDate: policy.startDate.toLocaleDateString('es-ES'),
      endDate: policy.endDate.toLocaleDateString('es-ES'),
      coverages: [
        'Responsabilidad Civil Ilimitada',
        'Daños Propios por Valor Declarado',
        'Robo e Incendio',
        'Lunas y Cristales',
        'Asistencia en Viaje 24/7',
        'Defensa Jurídica',
      ],
      issueDate: new Date().toISOString(),
    }

    // Generar PDF
    const pdf = generatePolicyCertificatePDF(certificateData)
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    // Devolver PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificado_${policy.policyNumber}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generando certificado:', error)
    return NextResponse.json(
      { error: 'Error generando certificado' },
      { status: 500 }
    )
  }
}
