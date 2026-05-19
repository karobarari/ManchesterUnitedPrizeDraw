import { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

const scrollSections: Record<string, string> = {
  '/prizes':    'prizes',
  '/subscribe': 'subscribe',
  '/about':     'about',
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e: React.MouseEvent, path: string) => {
    const section = scrollSections[path]
    if (!section) return

    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
    setMenuOpen(false)
  }

  return (
    <nav className="w-full bg-red-600 border-b border-white/10 sticky top-0 z-50">
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
          {['/', '/login', '/profile', '/prizes', '/subscribe', '/about'].map((path, i) => {
            const labels = ['HOME', 'LOGIN', 'ACCOUNT', 'PRIZES', 'SUBSCRIBE', 'ABOUT']
            const isScrollLink = path in scrollSections
            return isScrollLink ? (
              <a
                key={path}
                href={path}
                onClick={e => handleClick(e, path)}
                className="text-sm transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                {labels[i]}
              </a>
            ) : (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
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

        <a
          href="/subscribe"
          onClick={e => handleClick(e, '/subscribe')}
          className="hidden md:block bg-utd-gold text-utd-black text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
        >
          Sign up
        </a>

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
          {[['/', 'Home'], ['/login', 'Login'], ['/profile', 'Account'], ['/prizes', 'Prizes'], ['/subscribe', 'Subscribe'], ['/about', 'About']].map(
            ([path, label]) => {
              const isScrollLink = path in scrollSections
              return isScrollLink ? (
                <a
                  key={path}
                  href={path}
                  onClick={e => handleClick(e, path)}
                  className="text-sm text-white/80 cursor-pointer"
                >
                  {label}
                </a>
              ) : (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm ${isActive ? 'text-utd-gold font-medium' : 'text-white/80'}`
                  }
                >
                  {label}
                </NavLink>
              )
            }
          )}
          <a
            href="/subscribe"
            onClick={e => handleClick(e, '/subscribe')}
            className="bg-utd-gold text-utd-black text-sm font-medium px-4 py-2 rounded-lg text-center mt-1"
          >
            Sign up
          </a>
        </div>
      )}
    </nav>
  )
}