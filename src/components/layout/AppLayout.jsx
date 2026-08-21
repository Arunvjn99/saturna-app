import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  )
}
