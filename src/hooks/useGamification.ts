import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Badge {
  id: string
  code: string
  name: string
  description: string
  icon: string
  color: string
  requirement: string
  earned?: boolean
  earnedAt?: string
}

interface PointsEntry {
  id: string
  action: string
  points: number
  description: string | null
  createdAt: string
}

interface GamificationStats {
  points: number
  level: string
  nextLevel: string | null
  pointsToNextLevel: number
  progress: number
  badges: Badge[]
  recentPoints: PointsEntry[]
  referralsCount: number
}

interface LeaderboardEntry {
  rank: number
  id: string
  name: string | null
  avatar: string | null
  points: number
  level: string
  badgesCount: number
  isCurrentUser: boolean
}

interface LeaderboardData {
  leaderboard: LeaderboardEntry[]
  userRank: number
}

async function fetchGamificationStats(): Promise<GamificationStats> {
  const response = await fetch('/api/gamification?action=stats')
  if (!response.ok) {
    throw new Error('Failed to fetch gamification stats')
  }
  return response.json()
}

async function fetchLeaderboard(): Promise<LeaderboardData> {
  const response = await fetch('/api/gamification?action=leaderboard')
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard')
  }
  return response.json()
}

async function fetchBadges(): Promise<{ badges: Badge[] }> {
  const response = await fetch('/api/gamification?action=badges')
  if (!response.ok) {
    throw new Error('Failed to fetch badges')
  }
  return response.json()
}

async function checkBadges(): Promise<{
  newBadges: string[]
  levelUpdated: boolean
  newLevel?: string
}> {
  const response = await fetch('/api/gamification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'check-badges' }),
  })
  if (!response.ok) {
    throw new Error('Failed to check badges')
  }
  return response.json()
}

export function useGamificationStats() {
  return useQuery({
    queryKey: ['gamification', 'stats'],
    queryFn: fetchGamificationStats,
  })
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ['gamification', 'leaderboard'],
    queryFn: fetchLeaderboard,
  })
}

export function useBadges() {
  return useQuery({
    queryKey: ['gamification', 'badges'],
    queryFn: fetchBadges,
  })
}

export function useCheckBadges() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: checkBadges,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamification'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
