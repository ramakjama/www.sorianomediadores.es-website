import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  avatar: string | null
  dni: string | null
  address: string | null
  city: string | null
  postalCode: string | null
  birthDate: string | null
  role: string
  level: string
  points: number
  createdAt: string
  _count: {
    policies: number
    claims: number
    badges: number
  }
}

async function fetchUser(): Promise<User> {
  const response = await fetch('/api/users')
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

async function updateUser(data: Partial<User>): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update user')
  }
  return response.json()
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
