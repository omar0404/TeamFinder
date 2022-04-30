import React, { useContext } from 'react'
import { RoomsContext } from '../context/RoomsContext'
import { useSession } from '../context/SessionContext'
import CreateRoom from '../components/CreateRoom'
import UserCreatedRoom from '../components/UserCreatedRoom'
/** 
 * either to render user created room <YourRoom />
 * or create room <CreateRoom />
 * how to know if user has created room
 *  
*/
const MyRoom = () => {
  const user = useSession()
  const rooms = useContext(RoomsContext)
  const { createdRoom: createdRoomId } = user
  const createdRoom = rooms?.[createdRoomId]
  if (!createdRoom?.id)
    return <CreateRoom />
  return <UserCreatedRoom />
}
export default MyRoom