import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciales requeridas')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('Usuario no encontrado')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Contrasena incorrecta')
        }

        if (!user.isActive) {
          throw new Error('Usuario desactivado')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          level: user.level,
          points: user.points,
          avatar: user.avatar,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  pages: {
    signIn: '/acceso-clientes',
    error: '/acceso-clientes',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.level = user.level
        token.points = user.points
        token.avatar = user.avatar ?? undefined
      }

      // Handle session updates
      if (trigger === 'update' && session) {
        token = { ...token, ...session.user }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.level = token.level as string
        session.user.points = token.points as number
        session.user.avatar = token.avatar as string | undefined
      }
      return session
    },
  },
  events: {
    async signIn({ user }) {
      // Actualizar ultimo login y otorgar puntos si es login diario
      if (user?.id) {
        try {
          const lastPointsEntry = await prisma.pointsHistory.findFirst({
            where: {
              userId: user.id,
              action: 'LOGIN_DIARIO',
            },
            orderBy: { createdAt: 'desc' },
          })

          const today = new Date()
          today.setHours(0, 0, 0, 0)

          // Si no hay login hoy, otorgar puntos
          if (!lastPointsEntry || lastPointsEntry.createdAt < today) {
            await prisma.$transaction([
              prisma.user.update({
                where: { id: user.id },
                data: { points: { increment: 5 } },
              }),
              prisma.pointsHistory.create({
                data: {
                  userId: user.id,
                  action: 'LOGIN_DIARIO',
                  points: 5,
                  description: 'Bonus por iniciar sesion',
                },
              }),
            ])
          }
        } catch (error) {
          console.error('Error updating login points:', error)
        }
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
}
