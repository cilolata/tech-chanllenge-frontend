import { createContext, useContext, useState } from 'react'

interface AuthContextData {
  handleWriteSession: (session: { user: any }) => void
  isTeacher: boolean
  sessionData: () => { username: string | null; userId: string | null }
  clearSession: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTeacher, setIsTeacher] = useState(false)

  const handleWriteSession = (session: { user: any }) => {
    const { user } = session
    if (user) {
      sessionStorage.setItem('permissionType', user.permission_type)
      sessionStorage.setItem('username', user.username)
      sessionStorage.setItem('userId', user.id)
    }
  }

  const sessionData = () => {
    const username = sessionStorage.getItem('username')
    const userId = sessionStorage.getItem('userId')
    const permissionType = sessionStorage.getItem('permissionType')
    setIsTeacher(!!permissionType && permissionType?.toString() === '1')
    return { username, userId }
  }

  const clearSession = () => {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('permissionType')
  }

  return (
    <AuthContext.Provider
      value={{ handleWriteSession, sessionData, isTeacher, clearSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const authContext = () => {
  const context = useContext(AuthContext)
  return context
}
