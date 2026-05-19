import { useState } from 'react'

interface Plan {
  id: string
  label: string
  amount: number
  tickets: number
  current?: boolean
}

const plans: Plan[] = [
  { id: 'bronze',   label: 'Bronze',   amount: 5,  tickets: 20  },
  { id: 'silver',   label: 'Silver',   amount: 10, tickets: 50  },
  { id: 'gold',     label: 'Gold',     amount: 15, tickets: 100 },
  { id: 'platinum', label: 'Platinum', amount: 25, tickets: 150 },
]

// Placeholder — replace with real API data in step 5
const subscription = {
  plan:        'Silver',
  amount:      10,
  tickets:     50,
  totalEntries: 100,
  nextDraw:    '28/06/2026',
  renewsOn:    '28TH JUNE 2026 - 12:00 PM',
  validSince:  '19/05/2026',
}

export default function Subscriptions() {
  const [currentPlan, setCurrentPlan] = useState('bronze')
  const [loading, setLoading] = useState<string | null>(null)
  const [cancelled, setCancelled] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const handleChoosePlan = async (planId: string) => {
    setLoading(planId)
    // TODO: wire to Stripe API in step 5
    await new Promise(r => setTimeout(r, 800))
    setCurrentPlan(planId)
    setLoading(null)
  }

  const handleCancel = async () => {
    setLoading('cancel')
    await new Promise(r => setTimeout(r, 800))
    setCancelled(true)
    setLoading(null)
    setShowCancelConfirm(false)
  }

  return (
    <div className="max-w-3xl">

      {/* Header */}
      <div className="mb-6">
        <p className="text-utd-red text-xs uppercase tracking-widest mb-1">Account</p>
        <h1 className="text-2xl font-medium text-gray-900">Monthly Prize Draw</h1>
      </div>

      {/* Draw info */}
      <div className="flex items-center gap-6 mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Next Draw:</span> {subscription.nextDraw}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Total Entries:</span> {subscription.totalEntries}
        </p>
      </div>

      {/* Subscription details table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
        {/* Table header */}
        <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200 px-5 py-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Amount</span>
        </div>

        {/* Row 1 — plan */}
        <div className="grid grid-cols-2 px-5 py-3 border-b border-gray-100">
          <span className="text-sm text-gray-700">
            {subscription.plan} — Monthly Subscription
          </span>
          <span className="text-sm text-gray-700 text-right">£{subscription.amount}.00</span>
        </div>

        {/* Row 2 — tickets */}
        <div className="grid grid-cols-2 px-5 py-3 border-b border-gray-100">
          <span className="text-sm text-gray-400">Includes</span>
          <span className="text-sm text-gray-700 text-right">
            {subscription.tickets} x tickets
          </span>
        </div>

        {/* Row 3 — renewal */}
        <div className="grid grid-cols-2 px-5 py-3 bg-gray-50">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Subscription renews on
          </span>
          <span className="text-xs font-medium text-gray-700 text-right">
            {subscription.renewsOn}
          </span>
        </div>
      </div>

      {/* Active plan banner */}
      {!cancelled && (
        <div className="flex items-center justify-between bg-utd-red rounded-xl px-5 py-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-utd-gold text-sm">★</span>
            <span className="text-white text-sm font-medium uppercase tracking-wide">
              {subscription.plan} Season Pass (Active)
            </span>
          </div>
          <div className="text-right">
            <p className="text-white text-sm font-medium">£{subscription.amount * 12}.00 / year</p>
          </div>
        </div>
      )}

      {cancelled && (
        <div className="bg-gray-100 border border-gray-200 rounded-xl px-5 py-4 mb-8 text-center">
          <p className="text-gray-500 text-sm">
            Your subscription has been cancelled. It will remain active until {subscription.renewsOn}.
          </p>
        </div>
      )}

      {/* Valid since */}
      <div className="flex justify-between text-xs text-gray-400 mb-8 px-1">
        <span>Includes: {subscription.tickets} x tickets per draw</span>
        <span>Valid Since: {subscription.validSince}</span>
      </div>

      {/* Change subscription */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Change Your Subscription</h2>
        <ul className="text-sm text-gray-500 space-y-1 mb-6 list-disc list-inside">
          <li>
            If you <span className="font-medium text-gray-700">upgrade</span> to a higher package,
            your current subscription will end instantly and you will be charged for your new plan
            in full for the following month.
          </li>
          <li>
            If you <span className="font-medium text-gray-700">downgrade</span> to a lower package,
            your subscription will remain the same until its renewal date at which point it will
            switch to your new plan.
          </li>
        </ul>

        {/* Plan cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {plans.map(plan => {
            const isCurrent = plan.id === currentPlan
            return (
              <div
                key={plan.id}
                className={`rounded-xl border-2 p-4 flex flex-col items-center text-center transition ${
                  isCurrent
                    ? 'border-utd-red bg-utd-red/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <h3 className={`text-sm font-medium uppercase tracking-wider mb-3 ${
                  isCurrent ? 'text-utd-red' : 'text-gray-700'
                }`}>
                  {plan.label}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  Price: <span className="font-medium text-gray-700">£{plan.amount}.00 /per Month</span>
                </p>
                <p className="text-xs text-gray-500 mb-4 uppercase leading-tight">
                  Includes: {plan.tickets} tickets into monthly prize draw
                </p>

                {isCurrent ? (
                  <span className="text-xs border border-utd-red text-utd-red px-4 py-1.5 rounded-lg">
                    Current Plan
                  </span>
                ) : (
                  <button
                    onClick={() => handleChoosePlan(plan.id)}
                    disabled={loading === plan.id}
                    className="text-xs bg-utd-black text-white px-4 py-1.5 rounded-lg hover:opacity-80 transition disabled:opacity-50"
                  >
                    {loading === plan.id ? 'Updating...' : 'Choose Plan'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Cancel subscription */}
      {!cancelled && (
        <div className="border-t border-gray-100 pt-6 mt-6">
          {!showCancelConfirm ? (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="text-sm text-gray-400 hover:text-red-500 transition"
            >
              Cancel subscription
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Are you sure you want to cancel?
              </p>
              <p className="text-xs text-gray-500 mb-4">
                You will keep access until {subscription.renewsOn}. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={loading === 'cancel'}
                  className="text-sm bg-utd-red text-white px-5 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading === 'cancel' ? 'Cancelling...' : 'Yes, cancel'}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="text-sm border border-gray-200 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Keep subscription
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  )
}