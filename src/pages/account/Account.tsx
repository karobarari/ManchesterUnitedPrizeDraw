import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Profile',       to: '/profile'               },
  { label: 'Subscriptions', to: '/profile/subscriptions' },
  { label: 'Payments',      to: '/profile/payments'      },
]

export default function Account() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex" style={{ background: '#f3f4f6' }}>

      {/* ── Mobile overlay backdrop ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar — slides in on mobile, always visible on desktop ── */}
      <AnimatePresence>
        {(sidebarOpen) && (
          <motion.aside
            key="sidebar-mobile"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-56 bg-utd-black z-30 flex flex-col items-center py-10 px-6 md:hidden"
          >
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar — always visible, not animated */}
      <aside className="hidden md:flex w-56 shrink-0 bg-utd-black min-h-screen flex-col items-center py-10 px-6">
        <SidebarContent />
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col">

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-4 bg-utd-black px-4 py-3 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-1"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img
            src="/images/man-utd-logo.svg"
            alt="Manchester United"
            className="h-7 w-7"
          />
          <span className="text-white text-sm font-medium">Manchester United Prize Draw</span>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-10 bg-white">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

// ── Sidebar content — shared between mobile and desktop ──────────────────

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <>
      {/* Close button — mobile only */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Logo */}
      <img
        src="/images/man-utd-logo.svg"
        alt="Manchester United Foundation"
        className="w-20 h-20 object-contain"
      />

      {/* Gold divider */}
      <div className="w-8 h-0.5 bg-utd-gold rounded-full mt-4 mb-10" />

      {/* Nav links */}
      <nav className="flex flex-col items-center gap-7 flex-1">
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/profile'}
            onClick={onClose}
            className={({ isActive }) =>
              `text-xs font-medium tracking-widest uppercase transition ${
                isActive
                  ? 'text-utd-gold'
                  : 'text-white/50 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button className="bg-utd-red text-white text-xs font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition mt-auto">
        Logout
      </button>
    </>
  )
}