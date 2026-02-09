import { Outlet, useLocation, useNavigate } from 'react-router'
import { Navbar } from '../shared/navbar'
import { useEffect } from 'react'
import { authContext } from '@/contexts/AuthContext'
import { Home } from '@/pages/Home'

function Layout() {
  const { sessionData, isTeacher } = authContext()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionData().userId) {
      navigate('/login')
    }

    if (
      (sessionData().userId,
      !isTeacher && location.pathname.includes('/dashboard'))
    ) {
      navigate('/aulas')
    }
  }, [location, isTeacher])

  return (
    <>
      <Navbar />
      {sessionData().userId ? <Outlet /> : <Home />}
    </>
  )
}

export default Layout
