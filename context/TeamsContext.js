import React, { createContext } from 'react'
import { teamsRef } from '../service/firebase'
import { useOnValue } from '../hooks/firebase';

export const TeamsContext = createContext()
const TeamsProvider = ({ children }) => {
  const [teams] = useOnValue(teamsRef, "teams")
  return (
    <TeamsContext.Provider value={{ teams }}>
      {children}
    </TeamsContext.Provider>
  )
}
export default TeamsProvider