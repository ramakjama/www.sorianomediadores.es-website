import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const claimSchema = z.object({
  policyId: z.string(),
  type: z.string(),
  description: z.string().min(10),
  incidentDate: z.string(),
  location: z.string().optional(),
  amount: z.number().optional(),
})

// GET user's claims
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const claims = await prisma.claim.findMany({
      where: {
        userId: session.user.id,
        ...(status && { status: status as any }),
      },
      include: {
        policy: {
          select: {
            policyNumber: true,
            type: true,
          },
        },
        timeline: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            documents: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(claims)
  } catch (error) {
    console.error('Error fetching claims:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// POST create new claim
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = claimSchema.parse(body)

    // Verify policy belongs to user
    const policy = await prisma.policy.findFirst({
      where: {
        id: validatedData.policyId,
        userId: session.user.id,
      },
    })

    if (!policy) {
      return NextResponse.json({ error: 'Poliza no encontrada' }, { status: 404 })
    }

    // Generate claim number
    const claimCount = await prisma.claim.count()
    const claimNumber = `SIN-${new Date().getFullYear()}-${String(claimCount + 1).padStart(6, '0')}`

    const claim = await prisma.claim.create({
      data: {
        claimNumber,
        policyId: validatedData.policyId,
        userId: session.user.id,
        type: validatedData.type,
        description: validatedData.description,
        incidentDate: new Date(validatedData.incidentDate),
        location: validatedData.location,
        amount: validatedData.amount,
        status: 'COMUNICADO',
        timeline: {
          create: {
            status: 'COMUNICADO',
            title: 'Siniestro comunicado',
            description: 'El siniestro ha sido registrado en el sistema',
          },
        },
      },
      include: {
        policy: true,
        timeline: true,
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: 'Siniestro registrado',
        message: `Tu siniestro ${claimNumber} ha sido registrado. Te mantendremos informado del progreso.`,
        type: 'info',
        link: `/siniestros/${claim.id}`,
      },
    })

    return NextResponse.json(claim, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos invalidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating claim:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
