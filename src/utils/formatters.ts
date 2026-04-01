export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

export const formatTransactionDate = (dateString: string): string => {
  const transactionDate = new Date(dateString)
  const now = new Date()
  const normalizedNow = new Date(now)
  const normalizedTransactionDate = new Date(transactionDate)
  const msPerDay = 1000 * 60 * 60 * 24
  const diffDays = Math.floor(
    (normalizedNow.setHours(0, 0, 0, 0) -
      normalizedTransactionDate.setHours(0, 0, 0, 0)) /
      msPerDay,
  )

  if (diffDays <= 7) {
    return transactionDate.toLocaleDateString('en-US', { weekday: 'long' })
  }

  return transactionDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
