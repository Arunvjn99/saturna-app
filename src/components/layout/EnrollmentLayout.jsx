import { Link, Outlet, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'

const STEPS = [
  { path: '/enrollment', title: 'Deferral Election', desc: 'Choose your pre-tax and Roth deferral rates.' },
  { path: '/enrollment/investments', title: 'Investment Elections', desc: 'Pick how your contributions are invested.' },
  { path: '/enrollment/summary', title: 'Summary', desc: 'Review and confirm your elections.' }
]

export default function EnrollmentLayout() {
  const { pathname } = useLocation()
  const currentIndex = Math.max(
    0,
    STEPS.reduce((best, step, i) => (pathname.startsWith(step.path) && step.path.length >= STEPS[best].path.length ? i : best), 0)
  )

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <img src="/saturna_logo.png" alt="Saturna Capital" />
        </div>
        <div className="top-right">
          <Link className="icon-btn" to="/" aria-label="Close enrollment">
            <X size={20} strokeWidth={2} />
          </Link>
        </div>
      </header>
      <div className="layout">
        <aside className="steps">
          <Link className="back" to="/">
            ‹ Back To Dashboard
          </Link>
          <h1>Enrollment</h1>
          <div className="divider" />
          {STEPS.map((step, i) => (
            <div key={step.path} className={`step${i === currentIndex ? ' current' : ''}${i < currentIndex ? ' complete' : ''}`}>
              <div className="rail">
                <span className="num">{i + 1}</span>
                <span className="rail-line" />
              </div>
              <div className="body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </aside>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  )
}
