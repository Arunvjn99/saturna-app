import { Link } from 'react-router-dom'

export default function Transactions({ rows }) {
  return (
    <section className="section-card tx-compact">
      <div className="section-head">
        <h3>Recent Transactions</h3>
        <Link className="text-link" to="/transactions">
          View All
        </Link>
      </div>
      {!rows?.length ? (
        <div className="tx-empty">No transactions yet.</div>
      ) : (
        <div className="tx-list">
          {rows.map((tx, i) => (
            <div className={`tx-row ${tx.kind}`} key={i}>
              <div className="tx-date">{tx.date}</div>
              <div>
                <span className="tx-type">{tx.type}</span>
                <span className="tx-plan">{tx.plan}</span>
              </div>
              <div className="tx-amt">{tx.amt}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
