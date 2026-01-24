import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DocumentType, Prisma } from '@prisma/client'

// GET - Listar documentos del usuario
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const policyId = searchParams.get('policyId')
    const claimId = searchParams.get('claimId')
    const type = searchParams.get('type')

    const where: Prisma.DocumentWhereInput = {
      userId: session.user.id,
    }

    if (policyId) where.policyId = policyId
    if (claimId) where.claimId = claimId
    if (type && Object.values(DocumentType).includes(type as DocumentType)) {
      where.type = type as DocumentType
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        policy: {
          select: {
            policyNumber: true,
            type: true,
          },
        },
        claim: {
          select: {
            claimNumber: true,
            type: true,
          },
        },
      },
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
