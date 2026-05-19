import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-red-600 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">

        {/* Gold accent bar + logo */}
        <div className="w-1 h-6 bg-utd-gold rounded-full shrink-0" />
        <Link to="/" className="mr-auto flex items-center gap-3">
  <img
    src="/images/man-utd-logo.svg"
    alt="Manchester United"
    className="h-9 w-9"
  />
  <span className="text-white font-medium text-sm tracking-wide hidden sm:block">
    Manchester United Prize Draw
  </span>
</Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {['/', '/login', '/profile', '/prizes', '/subscribe',  '/about'].map((path, i) => {
            const labels = ['HOME','LOGIN', 'ACCOUNT', 'PRIZES', 'SUBSCRIBE',  'ABOUT']
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive ? 'text-utd-gold font-medium' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {labels[i]}
              </NavLink>
            )
          })}
        </div>

        {/* CTA */}
        <Link
          to="/subscribe"
          className="hidden md:block bg-utd-gold text-utd-black text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Sign up
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-utd-red border-t border-white/10 px-4 py-3 flex flex-col gap-3">
          {[['/', 'Home'], ['/login', 'Login'], ['/profile', 'Account'], ['/prizes', 'Prizes'], ['/subscribe', 'Subscribe'],  ['/about', 'About']].map(
            ([path, label]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm ${isActive ? 'text-utd-gold font-medium' : 'text-white/80'}`
                }
              >
                {label}
              </NavLink>
            )
          )}
          <Link
            to="/subscribe"
            onClick={() => setMenuOpen(false)}
            className="bg-utd-gold text-utd-black text-sm font-medium px-4 py-2 rounded-lg text-center mt-1"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  )
}