import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET user's policies
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    const policies = await prisma.policy.findMany({
      where: {
        userId: session.user.id,
        ...(status && { status: status as any }),
        ...(type && { type: type as any }),
      },
      include: {
        _count: {
          select: {
            claims: true,
            documents: true,
          },
        },
        payments: {
          where: {
            status: 'PENDIENTE',
          },
          orderBy: {
            dueDate: 'asc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(policies)
  } catch (error) {
    console.error('Error fetching policies:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// GET policy stats
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()

    if (body.action === 'stats') {
      const stats = await prisma.policy.groupBy({
        by: ['status'],
        where: {
          userId: session.user.id,
        },
        _count: true,
      })

      const totalPremium = await prisma.policy.aggregate({
        where: {
          userId: session.user.id,
          status: 'ACTIVA',
        },
        _sum: {
          premium: true,
        },
      })

      const byType = await prisma.policy.groupBy({
        by: ['type'],
        where: {
          userId: session.user.id,
        },
        _count: true,
      })

      return NextResponse.json({
        stats,
        totalPremium: totalPremium._sum.premium || 0,
        byType,
      })
    }

    return NextResponse.json({ error: 'Accion no valida' }, { status: 400 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
