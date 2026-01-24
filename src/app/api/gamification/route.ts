import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Level thresholds
const LEVEL_THRESHOLDS = {
  BRONCE: 0,
  PLATA: 1000,
  ORO: 5000,
  PLATINO: 15000,
}

function calculateLevel(points: number): 'BRONCE' | 'PLATA' | 'ORO' | 'PLATINO' {
  if (points >= LEVEL_THRESHOLDS.PLATINO) return 'PLATINO'
  if (points >= LEVEL_THRESHOLDS.ORO) return 'ORO'
  if (points >= LEVEL_THRESHOLDS.PLATA) return 'PLATA'
  return 'BRONCE'
}

// GET gamification data
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // Get user stats
    if (action === 'stats') {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          points: true,
          level: true,
          badges: {
            include: {
              badge: true,
            },
          },
          pointsHistory: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 10,
          },
          referralsMade: {
            where: {
              status: {
                in: ['REGISTRADO', 'CONVERTIDO'],
              },
            },
          },
        },
      })

      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
      }

      const currentLevel = user.level
      const nextLevel = currentLevel === 'PLATINO' ? null :
        currentLevel === 'ORO' ? 'PLATINO' :
        currentLevel === 'PLATA' ? 'ORO' : 'PLATA'

      const nextLevelThreshold = nextLevel ? LEVEL_THRESHOLDS[nextLevel] : null
      const currentLevelThreshold = LEVEL_THRESHOLDS[currentLevel]
      const progress = nextLevelThreshold
        ? ((user.points - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100
        : 100

      return NextResponse.json({
        points: user.points,
        level: user.level,
        nextLevel,
        pointsToNextLevel: nextLevelThreshold ? nextLevelThreshold - user.points : 0,
        progress: Math.min(progress, 100),
        badges: user.badges.map(ub => ({
          ...ub.badge,
          earnedAt: ub.earnedAt,
        })),
        recentPoints: user.pointsHistory,
        referralsCount: user.referralsMade.length,
      })
    }

    // Get leaderboard
    if (action === 'leaderboard') {
      const leaderboard = await prisma.user.findMany({
        where: {
          role: 'CLIENTE',
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          points: true,
          level: true,
          _count: {
            select: {
              badges: true,
            },
          },
        },
        orderBy: {
          points: 'desc',
        },
        take: 20,
      })

      // Find user's rank
      const userRank = await prisma.user.count({
        where: {
          points: {
            gt: (await prisma.user.findUnique({
              where: { id: session.user.id },
              select: { points: true },
            }))?.points || 0,
          },
          role: 'CLIENTE',
          isActive: true,
        },
      })

      return NextResponse.json({
        leaderboard: leaderboard.map((u, index) => ({
          rank: index + 1,
          id: u.id,
          name: u.name,
          avatar: u.avatar,
          points: u.points,
          level: u.level,
          badgesCount: u._count.badges,
          isCurrentUser: u.id === session.user.id,
        })),
        userRank: userRank + 1,
      })
    }

    // Get all badges
    if (action === 'badges') {
      const allBadges = await prisma.badge.findMany({
        where: {
          isSecret: false,
        },
      })

      const userBadges = await prisma.userBadge.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          badgeId: true,
          earnedAt: true,
        },
      })

      const userBadgeIds = new Set(userBadges.map(ub => ub.badgeId))

      return NextResponse.json({
        badges: allBadges.map(badge => ({
          ...badge,
          earned: userBadgeIds.has(badge.id),
          earnedAt: userBadges.find(ub => ub.badgeId === badge.id)?.earnedAt,
        })),
      })
    }

    return NextResponse.json({ error: 'Accion no valida' }, { status: 400 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// POST add points or check badges
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { action } = body

    // Check and award badges
    if (action === 'check-badges') {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          policies: true,
          claims: true,
          conversations: true,
          referralsMade: {
            where: { status: { in: ['REGISTRADO', 'CONVERTIDO'] } },
          },
          badges: {
            select: { badgeId: true },
          },
        },
      })

      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
      }

      const earnedBadgeIds = new Set(user.badges.map(b => b.badgeId))
      const newBadges: string[] = []

      // Check each badge condition
      const allBadges = await prisma.badge.findMany()

      for (const badge of allBadges) {
        if (earnedBadgeIds.has(badge.id)) continue

        let shouldAward = false

        switch (badge.code) {
          case 'POLICY_MASTER':
            shouldAward = user.policies.length >= 5
            break
          case 'REFERRAL_CHAMPION':
            shouldAward = user.referralsMade.length >= 10
            break
          case 'SORI_FRIEND':
            shouldAward = user.conversations.length >= 50
            break
          case 'NO_CLAIMS':
            const threeYearsAgo = new Date()
            threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)
            shouldAward = user.claims.length === 0 && user.createdAt < threeYearsAgo
            break
          case 'FULL_COVERAGE':
            const policyTypes = new Set(user.policies.map(p => p.type))
            shouldAward = policyTypes.size >= 4
            break
        }

        if (shouldAward) {
          await prisma.userBadge.create({
            data: {
              userId: session.user.id,
              badgeId: badge.id,
            },
          })
          newBadges.push(badge.name)

          // Create notification
          await prisma.notification.create({
            data: {
              userId: session.user.id,
              title: 'Nueva insignia desbloqueada',
              message: `Has conseguido la insignia "${badge.name}": ${badge.description}`,
              type: 'success',
              link: '/soriano-club',
            },
          })
        }
      }

      // Update user level if needed
      const newLevel = calculateLevel(user.points)
      if (newLevel !== user.level) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { level: newLevel },
        })

        await prisma.notification.create({
          data: {
            userId: session.user.id,
            title: 'Has subido de nivel',
            message: `Enhorabuena! Ahora eres miembro ${newLevel} del Soriano Club.`,
            type: 'success',
            link: '/soriano-club',
          },
        })
      }

      return NextResponse.json({
        newBadges,
        levelUpdated: newLevel !== user.level,
        newLevel,
      })
    }

    return NextResponse.json({ error: 'Accion no valida' }, { status: 400 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
