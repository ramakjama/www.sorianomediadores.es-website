import 'next-auth'
import { UserRole, UserLevel } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    role: UserRole
    level: UserLevel
    points: number
    avatar?: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: string
      level: string
      points: number
      avatar?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    level: string
    points: number
    avatar?: string
  }
}
