import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Text } from 'react-native'
import Login from '../screens/Login'
export const SessionContext = createContext()
const SessionProvider = ({ children }) => {
  const [user, isLoading, setValue] = useLocalStorage('user')
  const onLoginSuccess = user => {
    setValue(user)
  }
  console.log("user", user)
  if (isLoading) return null
  if (!isLoading && !user)
    return (
      <Login
        onLoginSuccess={onLoginSuccess}
      />
    )

  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  )
}
export const useSession = () => {
  const { user } = useContext(SessionContext)
  return user
}
export default SessionProvider