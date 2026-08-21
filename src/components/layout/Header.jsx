import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, LogOut } from 'lucide-react'
import { useParticipant } from '../../context/ParticipantContext.jsx'

export default function Header() {
  const { participant, participants, selectParticipant, logout } = useParticipant()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const choose = (id) => {
    selectParticipant(id)
    setOpen(false)
  }

  const signOut = () => {
    setOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar">
      <div className="brand">
        <img src="/saturna_logo.png" alt="Saturna Capital" />
      </div>
      <div className="top-right">
        <div className="user-menu" ref={menuRef}>
          <button
            type="button"
            className={`user-chip${open ? ' open' : ''}`}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <img src={participant.avatar} alt="" />
            <span className="chip-text">
              <span className="chip-name">{participant.name}</span>
            </span>
            <ChevronDown size={14} strokeWidth={2.2} className="chev" />
          </button>
          <div className={`user-dropdown${open ? ' open' : ''}`} role="menu" aria-label="Account">
            <div className="dd-label">Participants</div>
            {participants.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`user-option${p.id === participant.id ? ' on' : ''}`}
                role="menuitemradio"
                aria-checked={p.id === participant.id}
                onClick={() => choose(p.id)}
              >
                <img src={p.avatar} alt="" />
                <span className="meta">
                  <span className="name">{p.name}</span>
                  <span className="scenario">{p.scenario}</span>
                </span>
                <Check size={18} strokeWidth={2.4} className="check" />
              </button>
            ))}
            <button type="button" className="user-option sign-out" role="menuitem" onClick={signOut}>
              <span className="sign-out-ico" aria-hidden="true">
                <LogOut size={16} strokeWidth={2.2} />
              </span>
              <span className="meta">
                <span className="name">Sign Out</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
