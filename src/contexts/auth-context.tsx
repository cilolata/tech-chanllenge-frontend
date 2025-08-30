import { createContext, useContext } from 'react'

interface AuthContextData {
  handleWriteSession: (session: { user: any }) => void
  isTeacher: () => boolean
  sessionData: () => { username: string | null; userId: string | null }
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const handleWriteSession = (session: { user: any }) => {
    const { user } = session
    if (user) {
      sessionStorage.setItem('permissionType', user.permission_type)
      sessionStorage.setItem('username', user.username)
      sessionStorage.setItem('userId', user.id)
    }
  }

  const isTeacher = () => {
    const permissionType = sessionStorage.getItem('permissionType')
    return !!(permissionType && permissionType?.toString() === '1')
  }

  const sessionData = () => {
    const username = sessionStorage.getItem('username')
    const userId = sessionStorage.getItem('userId')
    return { username, userId }
  }

  return (
    <AuthContext.Provider value={{ handleWriteSession, sessionData, isTeacher }}>
      {children}
    </AuthContext.Provider>
  )
}

export const authContext = () => {
  const context = useContext(AuthContext)
  return context
}
