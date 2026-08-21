import { useState } from 'react'
import { IdCard, Briefcase, Users } from 'lucide-react'
import { useParticipant } from '../context/ParticipantContext.jsx'

function Field({ label, value }) {
  return (
    <div className="pf-field">
      <span className="pf-k">{label}</span>
      <b className="pf-v">{value}</b>
    </div>
  )
}

const TABS = [
  { id: 'personal', label: 'Personal Details', icon: IdCard },
  { id: 'employment', label: 'Employment', icon: Briefcase },
  { id: 'beneficiaries', label: 'Beneficiaries', icon: Users }
]

export default function Profile() {
  const { participant } = useParticipant()
  const [tab, setTab] = useState('personal')
  const p = participant.profile
  const [first, ...rest] = participant.name.split(' ')
  const last = rest.join(' ')
  const badgeClass =
    participant.id === 'opted-out'
      ? 'red'
      : participant.id === 'not-eligible'
        ? 'amber'
        : participant.id === 'eligible-not-enrolled'
          ? 'navy'
          : 'green'

  return (
    <div className="page-body">
      <div className="hi-bar">
        <h1>Profile</h1>
      </div>

      <section className="profile-hero">
        <img src={participant.avatar} alt="" />
        <div className="profile-hero-copy">
          <h2>{participant.name}</h2>
          <p>{p.email}</p>
          <span className={`badge ${badgeClass}`}>{participant.scenario}</span>
        </div>
      </section>

      <div className="plan-manage">
        <div className="plan-tabs" role="tablist" aria-label="Profile sections">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`plan-tab${tab === id ? ' on' : ''}`}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
            >
              <span className="tab-ico" aria-hidden="true">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              {label}
            </button>
          ))}
        </div>

        <div className="plan-tab-body">
          {tab === 'personal' && (
            <>
              <section className="panel">
                <h3>Personal Information</h3>
                <div className="pf-fields">
                  <Field label="First Name" value={first} />
                  <Field label="Last Name" value={last} />
                  <Field label="Date Of Birth" value={p.dob} />
                  <Field label="Social Security Number" value={p.ssn} />
                  <Field label="Gender" value={p.gender} />
                  <Field label="Marital Status" value={p.maritalStatus} />
                </div>
              </section>
              <section className="panel">
                <h3>Contact</h3>
                <div className="pf-fields">
                  <Field label="Email" value={p.email} />
                  <Field label="Phone" value={p.phone} />
                  <Field label="Street Address" value={p.address} />
                  <Field label="City, State, ZIP" value={p.city} />
                </div>
              </section>
            </>
          )}

          {tab === 'employment' && (
            <section className="panel">
              <h3>Employment</h3>
              <div className="pf-fields">
                <Field label="Employer" value={p.employer} />
                <Field label="Employee ID" value={p.employeeId} />
                <Field label="Hire Date" value={p.hireDate} />
                <Field label="Work Status" value={p.workStatus} />
              </div>
            </section>
          )}

          {tab === 'beneficiaries' && (
            <section className="panel">
              <h3>Beneficiaries</h3>
              {p.beneficiaries.length ? (
                <div className="list">
                  {p.beneficiaries.map((b) => (
                    <div className="list-row" key={b.name}>
                      <span>
                        <strong className="bene-name">{b.name}</strong>
                        {b.relationship}
                      </span>
                      <b>{b.share}</b>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No beneficiaries on file yet.</p>
              )}
              <div className="actions">
                <a className="btn btn-secondary" href="#">
                  Add Beneficiary
                </a>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
