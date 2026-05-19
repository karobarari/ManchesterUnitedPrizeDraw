import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Profile',       to: '/profile'               },
  { label: 'Subscriptions', to: '/profile/subscriptions' },
  { label: 'Payments',      to: '/profile/payments'      },
]

export default function Account() {
  return (
    <div className="min-h-screen flex" style={{ background: '#f3f4f6' }}>

      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-utd-black min-h-screen flex flex-col items-center py-10 px-6">

        {/* Logo circle */}
        <div className="w-20 h-20 rounded-full bg-utd-red flex items-center justify-center mb-2">
          <span className="text-white font-medium text-xs text-center leading-tight px-2">
            MAN UTD<br />FOUNDATION
          </span>
        </div>

        {/* Gold divider */}
        <div className="w-8 h-0.5 bg-utd-gold rounded-full mt-4 mb-10" />

        {/* Nav */}
        <nav className="flex flex-col items-center gap-7 flex-1">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/profile'}
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
      </aside>

      {/* Main content — Outlet renders Profile/Subscriptions/Payments here */}
      <main className="flex-1 p-10 bg-white">
        <Outlet />
      </main>

    </div>
  )
}