import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const registerSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  phone: z.string().optional(),
  referralCode: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe una cuenta con este email' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Check referral code
    let referral = null
    if (validatedData.referralCode) {
      referral = await prisma.referral.findUnique({
        where: { code: validatedData.referralCode, status: 'PENDIENTE' },
      })
    }

    // Create user with initial points
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        phone: validatedData.phone,
        points: 50, // Puntos de bienvenida
      },
    })

    // Create initial points history
    await prisma.pointsHistory.create({
      data: {
        userId: user.id,
        action: 'PRIMER_LOGIN',
        points: 50,
        description: 'Bienvenido a Soriano Club',
      },
    })

    // Process referral if exists
    if (referral) {
      await prisma.$transaction([
        // Update referral status
        prisma.referral.update({
          where: { id: referral.id },
          data: {
            referredId: user.id,
            status: 'REGISTRADO',
          },
        }),
        // Give referrer points
        prisma.user.update({
          where: { id: referral.referrerId },
          data: { points: { increment: 200 } },
        }),
        prisma.pointsHistory.create({
          data: {
            userId: referral.referrerId,
            action: 'REFERIDO_REGISTRO',
            points: 200,
            description: `Referido ${validatedData.name} se ha registrado`,
          },
        }),
        // Give referred user extra points
        prisma.user.update({
          where: { id: user.id },
          data: { points: { increment: 100 } },
        }),
        prisma.pointsHistory.create({
          data: {
            userId: user.id,
            action: 'REFERIDO_REGISTRO',
            points: 100,
            description: 'Bonus por registrarte con codigo de referido',
          },
        }),
      ])
    }

    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Bienvenido a Soriano Mediadores',
        message: 'Tu cuenta ha sido creada exitosamente. Explora tu area de cliente y descubre todos los beneficios del Soriano Club.',
        type: 'success',
        link: '/area-cliente',
      },
    })

    return NextResponse.json(
      {
        message: 'Usuario creado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos invalidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Error al crear la cuenta' },
      { status: 500 }
    )
  }
}
