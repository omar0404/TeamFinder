import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Login from '../screens/Login'
import { useOnValue } from '../hooks/firebase'
import firebaseService, { userRef } from '../service/firebase'
export const SessionContext = createContext()
const SessionProvider = ({ children }) => {
  const [user, isLoading, setValue] = useLocalStorage('user')
  const [_user] = useOnValue(userRef(user?.id), user?.id)
  // console.log("_user", _user)
  const onLoginSuccess = user => {
    setValue(user)
  }
  if (isLoading) return null
  if (!isLoading && !user)
    return (
      <Login
        onLoginSuccess={onLoginSuccess}
      />
    )
  
  firebaseService.setUser(_user)
  return (
    <SessionContext.Provider value={{ user: { ...(_user || {}), ...user } }}>
      {children}
    </SessionContext.Provider>
  )
}
export const useSession = () => {
  const { user } = useContext(SessionContext)
  return user
}
export default SessionProvider