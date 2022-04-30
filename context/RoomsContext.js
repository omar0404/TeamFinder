import React, { createContext } from 'react'
import { roomsRef } from '../service/firebase'
import { useOnValue } from '../hooks/firebase';

export const RoomsContext = createContext()
const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useOnValue(roomsRef)
  console.log(rooms)

  return (
    <RoomsContext.Provider value={{ rooms }}>
      {children}

    </RoomsContext.Provider>
  )
}
export default RoomsProvider