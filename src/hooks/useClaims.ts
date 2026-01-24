import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface ClaimTimeline {
  id: string
  status: string
  title: string
  description: string | null
  createdAt: string
}

interface Claim {
  id: string
  claimNumber: string
  policyId: string
  type: string
  description: string
  status: string
  amount: number | null
  approvedAmount: number | null
  incidentDate: string
  reportedDate: string
  resolvedDate: string | null
  location: string | null
  policy: {
    policyNumber: string
    type: string
  }
  timeline: ClaimTimeline[]
  _count: {
    documents: number
  }
}

interface CreateClaimData {
  policyId: string
  type: string
  description: string
  incidentDate: string
  location?: string
  amount?: number
}

async function fetchClaims(status?: string): Promise<Claim[]> {
  const params = new URLSearchParams()
  if (status) params.set('status', status)

  const response = await fetch(`/api/claims?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch claims')
  }
  return response.json()
}

async function createClaim(data: CreateClaimData): Promise<Claim> {
  const response = await fetch('/api/claims', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create claim')
  }
  return response.json()
}

export function useClaims(status?: string) {
  return useQuery({
    queryKey: ['claims', status],
    queryFn: () => fetchClaims(status),
  })
}

export function useCreateClaim() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] })
    },
  })
}
