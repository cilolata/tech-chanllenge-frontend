import { Outlet, useLocation, useNavigate } from 'react-router'
import { Navbar } from '../components/Navbar'
import { useEffect } from 'react'
import { authContext } from '@/contexts/AuthContext'

function Layout() {
  const { sessionData } = authContext()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/' && sessionData().userId) {
      navigate('/aulas')
    }
  }, [location])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
