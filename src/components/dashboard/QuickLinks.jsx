import { Users, FileText, TrendingUp } from 'lucide-react'

const LINKS = [
  { href: '#', label: 'Add Beneficiary', icon: Users },
  { href: '/reports', label: 'My Documents', icon: FileText },
  { href: '/portfolio', label: 'My Portfolio', icon: TrendingUp }
]

export default function QuickLinks() {
  return (
    <section>
      <h2 className="section-title">Quick Links</h2>
      <div className="quick-grid">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <a className="quick-link" href={href} key={label}>
            <span className="q-ico" aria-hidden="true">
              <Icon size={18} strokeWidth={2} />
            </span>
            <span className="q-label">{label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
