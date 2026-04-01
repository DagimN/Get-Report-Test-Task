export interface Transaction {
  id: string
  type: string
  amount: number
  name: string
  description: string
  date: string
  isPending: boolean
  authorizedUser?: string
}

export interface TransactionsResponse {
  transactions: Transaction[]
}
