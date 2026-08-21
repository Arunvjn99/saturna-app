import { Link } from 'react-router-dom'

export default function PlanCard({ plan }) {
  const link = plan.noticeLink
  return (
    <article className={`plan-card ${plan.cardClass || ''}`}>
      <div className="pc-top">
        <div>
          <h3 className="pc-name">{plan.name}</h3>
          <div className="pc-type">{plan.type}</div>
          <div className="pc-meta">{plan.meta}</div>
        </div>
        <span className={`plan-badge ${plan.badgeClass || ''}`}>{plan.badge}</span>
      </div>
      {plan.notice && (
        <p className={`plan-notice ${plan.noticeClass || ''}`}>
          {plan.notice}{' '}
          {link &&
            (link.details ? (
              <Link to={`/plans/${plan.id}`}>{link.label}</Link>
            ) : (
              <Link to={link.to}>{link.label}</Link>
            ))}
        </p>
      )}
      {plan.stats && (
        <div className="plan-stats">
          <div className="plan-stat balance">
            <div className="k">Balance</div>
            <div className="v">{plan.stats.balance}</div>
          </div>
          <div className="plan-stat vested">
            <div className="k">Vested</div>
            <div className="v">{plan.stats.vested}</div>
          </div>
        </div>
      )}
    </article>
  )
}
