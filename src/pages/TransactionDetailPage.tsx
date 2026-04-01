import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useParams } from 'react-router-dom'
import { useTransactions } from '../hooks/useTransactions'
import { formatCurrency } from '../utils/formatters'

export const TransactionDetailPage = () => {
  const { id } = useParams()
  const { transactions, loading, error } = useTransactions()
  const transaction = transactions.find((item) => item.id === id)

  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#e8eaef] px-3 py-4">
      <Link
        to="/transactions"
        className="inline-flex items-center rounded-lg px-1 py-1 text-xl text-[#2d64d6]"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading transaction...</p>}
      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      {!loading && !error && !transaction && (
        <p className="mt-6 text-sm text-slate-500">Transaction not found.</p>
      )}

      {transaction && (
        <section className="mt-2">
          <h1 className="text-center text-6xl font-semibold tracking-tight text-black">
            {formatCurrency(transaction.amount)}
          </h1>
          <p className="mt-1 text-center text-xl text-slate-400">{transaction.name}</p>
          <p className="text-center text-md text-slate-400">
            {new Date(transaction.date).toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>

          <div className="mt-5 overflow-hidden rounded-xl bg-white text-[1.12rem] text-slate-700">
            <div className="border-b border-slate-200 px-3 py-2">
              <p className="font-semibold text-slate-900">
                Status: {transaction.isPending ? 'Pending' : 'Settled'}
              </p>
              <p className="text-gray-400 text-sm">{transaction.description}</p>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <p className="font-semibold text-slate-900">Total</p>
              <p className="font-semibold text-slate-900">{formatCurrency(transaction.amount)}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
