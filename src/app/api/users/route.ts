import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET current user profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        dni: true,
        address: true,
        city: true,
        postalCode: true,
        birthDate: true,
        role: true,
        level: true,
        points: true,
        createdAt: true,
        _count: {
          select: {
            policies: true,
            claims: true,
            badges: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// PATCH update user profile
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, address, city, postalCode, birthDate } = body

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone,
        address,
        city,
        postalCode,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        city: true,
        postalCode: true,
        birthDate: true,
        level: true,
        points: true,
      },
    })

    // Check if profile is now complete and award points
    const isProfileComplete =
      updatedUser.name &&
      updatedUser.phone &&
      updatedUser.address &&
      updatedUser.city &&
      updatedUser.postalCode

    if (isProfileComplete) {
      const existingPoints = await prisma.pointsHistory.findFirst({
        where: {
          userId: session.user.id,
          action: 'PERFIL_COMPLETO',
        },
      })

      if (!existingPoints) {
        await prisma.$transaction([
          prisma.user.update({
            where: { id: session.user.id },
            data: { points: { increment: 100 } },
          }),
          prisma.pointsHistory.create({
            data: {
              userId: session.user.id,
              action: 'PERFIL_COMPLETO',
              points: 100,
              description: 'Perfil completado al 100%',
            },
          }),
        ])
      }
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
