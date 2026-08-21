import { NavLink } from 'react-router-dom'
import { LayoutGrid, UserRound, ArrowLeftRight, FileText, Wallet } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/reports', label: 'Reports & Documents', icon: FileText },
  { to: '/portfolio', label: 'Investment Portfolio', icon: Wallet }
]

export default function Sidebar() {
  return (
    <nav className="nav" aria-label="Primary">
      {LINKS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="ico" aria-hidden="true">
            <Icon size={23} strokeWidth={1.7} />
          </span>
          <span className="nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
