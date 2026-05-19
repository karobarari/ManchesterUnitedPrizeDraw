import { Link } from 'react-router-dom'

const links = [
  { label: 'Home',         to: '/' },
  { label: 'Account',      to: '/profile' },
  { label: 'Prizes',       to: '/prizes' },
  { label: 'Subscribe',    to: '/subscribe' },
  { label: 'Terms',        to: '/terms' },
  { label: 'Privacy',      to: '/privacy' },
  { label: 'Cookie policy',to: '/cookies' },
  { label: 'Contact',      to: '/contact' },
  { label: 'Claim a prize',to: '/claim' },
]

export default function Footer() {
  return (
    <footer className="bg-utd-black">
      {/* Badge links */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-wrap gap-2">
        {links.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="text-xs text-gray-400 border border-white/10 bg-white/5 hover:bg-white/10 transition px-3 py-1.5 rounded-md"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="text-xs text-gray-600">
          © {new Date().getFullYear()} Manchester United Foundation. All rights reserved.
        </span>
        <span className="text-xs text-utd-gold">
          Powered by Raise Your Game
        </span>
      </div>
    </footer>
  )
}