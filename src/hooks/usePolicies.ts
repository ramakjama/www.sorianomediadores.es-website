import { useQuery } from '@tanstack/react-query'

interface Policy {
  id: string
  policyNumber: string
  type: string
  status: string
  description: string | null
  premium: number
  paymentFrequency: string
  startDate: string
  endDate: string
  renewalDate: string | null
  coverages: any
  metadata: any
  createdAt: string
  _count: {
    claims: number
    documents: number
  }
  payments: Array<{
    id: string
    amount: number
    status: string
    dueDate: string
  }>
}

interface PolicyStats {
  stats: Array<{
    status: string
    _count: number
  }>
  totalPremium: number
  byType: Array<{
    type: string
    _count: number
  }>
}

async function fetchPolicies(status?: string, type?: string): Promise<Policy[]> {
  const params = new URLSearchParams()
  if (status) params.set('status', status)
  if (type) params.set('type', type)

  const response = await fetch(`/api/policies?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch policies')
  }
  return response.json()
}

async function fetchPolicyStats(): Promise<PolicyStats> {
  const response = await fetch('/api/policies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'stats' }),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch policy stats')
  }
  return response.json()
}

export function usePolicies(status?: string, type?: string) {
  return useQuery({
    queryKey: ['policies', status, type],
    queryFn: () => fetchPolicies(status, type),
  })
}

export function usePolicyStats() {
  return useQuery({
    queryKey: ['policyStats'],
    queryFn: fetchPolicyStats,
  })
}
