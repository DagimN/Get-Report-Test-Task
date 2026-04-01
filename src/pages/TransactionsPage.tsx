import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'
import { TransactionCard } from '../components/TransactionCard'
import { useTransactions } from '../hooks/useTransactions'
import { calculateDailyPoints } from '../utils/calculateDailyPoints'
import { formatCurrency } from '../utils/formatters'

const MAX_LIMIT = 1500

export const TransactionsPage = () => {
  const { transactions, loading, error } = useTransactions()
  const displayTransactions = transactions.slice(0, 10)
  const balance = useMemo(
    () => Number((Math.random() * MAX_LIMIT).toFixed(2)),
    [],
  )
  const available = Number((MAX_LIMIT - balance).toFixed(2))
  const dailyPoints = calculateDailyPoints(new Date())

  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#e8eaef] px-2.5 py-4 text-[#1b1f24]">
      <section className="grid grid-cols-2 gap-1.5">
        <div className="rounded-xl bg-[#f3f4f6] px-3 py-2.5">
          <p className="text-sm text-slate-600">Card Balance</p>
          <p className="text-[2rem] font-bold leading-none">{formatCurrency(balance)}</p>
          <p className="mt-1 text-sm text-slate-500">{formatCurrency(available)} Available</p>
        </div>
        <div className="row-span-2 flex flex-col justify-between rounded-xl bg-[#f3f4f6] px-3 py-2.5">
          <div>
            <p className="text-sm text-slate-700 font-semibold">No Payment Due</p>
            <p className="mt-0.5 text-sm leading-5 text-slate-400">
              You&apos;ve paid your balance.
            </p>
          </div>
          <div className="self-end rounded-full bg-[#e3e4e6] w-18 p-4 text-[1.8rem] text-black">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
        <div className="rounded-xl bg-[#f3f4f6] px-3 py-2.5">
          <p className="text-sm font-medium text-slate-700">Daily Points</p>
          <p className="mt-1 text-xl text-gray-500 leading-none">{dailyPoints}</p>
        </div>
      </section>

      <section className="mt-8 pb-8">
        <h2 className="px-1 text-2xl font-semibold tracking-tight text-slate-900">
          Latest Transactions
        </h2>
        {loading && <p className="text-sm text-slate-500">Loading transactions...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading &&
          !error &&
          (
            <div className="mt-3 overflow-hidden rounded-xl bg-white">
              {displayTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}
      </section>
    </main>
  )
}
