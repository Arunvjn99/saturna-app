import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

const STEPS = [
  { path: '/enrollment', title: 'Deferral Rate', desc: 'Set how much to defer into the plan' },
  { path: '/enrollment/investments', title: 'Investment Election', desc: 'Choose funds and allocation' },
  { path: '/enrollment/summary', title: 'Summary', desc: 'Confirm elections before you enroll' }
]

export default function EnrollmentLayout() {
  const { pathname } = useLocation()
  const currentIndex = Math.max(
    0,
    STEPS.reduce((best, step, i) => (pathname.startsWith(step.path) && step.path.length >= STEPS[best].path.length ? i : best), 0)
  )

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <aside className="steps">
          <Link className="back" to="/">
            ‹ Back
          </Link>
          <h1>Plan Enrollment</h1>
          <div className="divider" />
          {STEPS.map((step, i) => (
            <div key={step.path} className={`step${i === currentIndex ? ' current' : i < currentIndex ? ' complete' : ''}`} role="button">
              <div className="rail">
                <div className="num">{i + 1}</div>
                {i < STEPS.length - 1 && <i className="rail-line" />}
              </div>
              <div className="body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i === currentIndex && (
                  <span className="step-status">
                    <span className="spinner" /> In Progress
                  </span>
                )}
              </div>
            </div>
          ))}
        </aside>
        <div className="main">
          <div className="detail-head">
            <div className="eyebrow">Plan Details</div>
            <h2>401(k) Company Plan High Returns</h2>
            <div className="plan-meta">
              <span>
                Plan ID <b>124542</b>
              </span>
            </div>
          </div>
          <div className="detail-body enroll-simple">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
