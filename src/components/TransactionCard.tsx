import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import type { Transaction } from '../types/transaction'
import { formatCurrency, formatTransactionDate } from '../utils/formatters'
import { getTransactionVisual } from '../utils/getTransactionVisual'

interface TransactionCardProps {
  transaction: Transaction
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { icon, bgColor } = getTransactionVisual(transaction.name)
  const dateLine = `${transaction.authorizedUser ? `[${transaction.authorizedUser}] - ` : ''}${formatTransactionDate(transaction.date)}`
  const description = `${transaction.isPending ? 'Pending - ' : ''}${transaction.description}`
  const sign = transaction.type.toLowerCase() === 'payment' ? '+' : ''
  const utilization = `${Math.min(99, Math.max(1, Math.round((transaction.amount / 1500) * 100)))}%`

  return (
    <Link
      to={`/transactions/${transaction.id}`}
      className="flex items-center gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm text-white"
        style={{ backgroundColor: bgColor }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[1.02rem] font-semibold leading-5 text-slate-900">
          {transaction.name}
        </p>
        <p className="truncate text-[0.95rem] leading-5 text-slate-500">{description}</p>
        <p className="truncate text-sm leading-5 text-slate-500">{dateLine}</p>
      </div>

      <div className="text-right">
        <p className="text-[1.02rem] font-semibold leading-5 text-slate-900">
          {sign}
          {formatCurrency(transaction.amount)}
        </p>
        <p className="text-xs text-slate-500 bg-gray-100 rounded-lg py-1 w-min px-2 float-right">{utilization}</p>
      </div>
      <FontAwesomeIcon icon={faChevronRight} className="text-xs text-slate-400" />
    </Link>
  )
}
