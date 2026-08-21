import { Navigate, Outlet } from 'react-router-dom'
import { useParticipant } from '../../context/ParticipantContext.jsx'

export function RequireAuth() {
  const { loggedIn } = useParticipant()
  if (!loggedIn) return <Navigate to="/login" replace />
  return <Outlet />
}

export function GuestOnly() {
  const { loggedIn } = useParticipant()
  if (loggedIn) return <Navigate to="/" replace />
  return <Outlet />
}
