import { useEffect, useState } from 'react'
import type { Transaction, TransactionsResponse } from '../types/transaction'

interface UseTransactionsResult {
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

export const useTransactions = (): UseTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadTransactions = async (): Promise<void> => {
      try {
        const response = await fetch('/data.json')

        if (!response.ok) {
          throw new Error('Failed to fetch transactions.')
        }

        const data = (await response.json()) as TransactionsResponse

        if (isMounted) {
          setTransactions(data.transactions)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load transaction data.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTransactions()

    return () => {
      isMounted = false
    }
  }, [])

  return { transactions, loading, error }
}
