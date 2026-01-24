import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ReceiptStatus, Prisma, Receipt } from '@prisma/client'

// GET - Listar recibos del usuario
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const policyId = searchParams.get('policyId')

    const where: Prisma.ReceiptWhereInput = {
      userId: session.user.id,
    }

    if (status && Object.values(ReceiptStatus).includes(status as ReceiptStatus)) {
      where.status = status as ReceiptStatus
    }
    if (policyId) where.policyId = policyId

    const receipts = await prisma.receipt.findMany({
      where,
      orderBy: { dueDate: 'desc' },
      include: {
        policy: {
          select: {
            policyNumber: true,
            type: true,
            description: true,
          },
        },
        history: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    })

    // Estadisticas
    const stats = {
      total: receipts.length,
      pendientes: receipts.filter((r: Receipt) => r.status === 'PENDIENTE').length,
      pagados: receipts.filter((r: Receipt) => r.status === 'PAGADO').length,
      vencidos: receipts.filter((r: Receipt) => r.status === 'VENCIDO').length,
      totalPendiente: receipts
        .filter((r: Receipt) => r.status === 'PENDIENTE')
        .reduce((sum: number, r: Receipt) => sum + Number(r.totalAmount), 0),
      totalPagado: receipts
        .filter((r: Receipt) => r.status === 'PAGADO')
        .reduce((sum: number, r: Receipt) => sum + Number(r.totalAmount), 0),
    }

    return NextResponse.json({ receipts, stats })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
