interface Payment {
  id: number
  date: string
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
}

// Placeholder — replace with real API data in step 5
const payments: Payment[] = [
  { id: 1, date: '01 May 2026', description: 'Bronze — Monthly Subscription', amount: 5, status: 'paid' },
  { id: 2, date: '01 Apr 2026', description: 'Bronze — Monthly Subscription', amount: 5, status: 'paid' },
  { id: 3, date: '01 Mar 2026', description: 'Bronze — Monthly Subscription', amount: 5, status: 'paid' },
  { id: 4, date: '01 Feb 2026', description: 'Bronze — Monthly Subscription', amount: 5, status: 'failed' },
  { id: 5, date: '01 Jan 2026', description: 'Bronze — Monthly Subscription', amount: 5, status: 'paid' },
]

const statusStyles: Record<Payment['status'], string> = {
  paid: 'bg-green-50 text-green-700 border border-green-200',
  pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  failed: 'bg-red-50 text-red-600 border border-red-200',
}

export default function Payments() {
  const hasPayments = payments.length > 0

  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="mb-8">
        <p className="text-utd-red text-xs uppercase tracking-widest mb-1">Account</p>
        <h1 className="text-2xl font-medium text-gray-900">
          Welcome to Manchester United Prize Draw
        </h1>
      </div>

      {/* Billing details card */}
      <div className="border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-base font-medium text-gray-900 mb-2">Billing Details</h2>
        <p className="text-sm text-gray-500 mb-5">
          Manage your billing details, payment methods, and invoices
          through our secure billing portal.
        </p>
        <button
          className="bg-utd-red text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition"
          onClick={() => {
            // TODO: redirect to Stripe billing portal in step 5
            alert('Redirecting to billing portal...')
          }}
        >
          Update Billing Info
        </button>
      </div>

      {/* Payment history */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">

        {/* Table header */}
        <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 px-5 py-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider col-span-1">Date</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">Description</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Amount</span>
        </div>

        {hasPayments ? (
          <>
            {payments.map((payment, i) => (
              <div
                key={payment.id}
                className={`grid grid-cols-4 items-center px-5 py-3.5 ${i !== payments.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
              >
                <span className="text-xs text-gray-400 col-span-1">
                  {payment.date}
                </span>
                <span className="text-sm text-gray-700 col-span-2">
                  {payment.description}
                </span>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-sm text-gray-700">
                    £{payment.amount.toFixed(2)}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[payment.status]}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="grid grid-cols-4 items-center px-5 py-3 bg-gray-50 border-t border-gray-200">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider col-span-3">
                Total paid
              </span>
              <span className="text-sm font-medium text-gray-900 text-right">
                £{payments
                  .filter(p => p.status === 'paid')
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-gray-400">
              You haven't made any payments yet.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}