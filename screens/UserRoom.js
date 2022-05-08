import React, { useContext, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { RoomsContext } from '../context/RoomsContext'
import { useSession } from '../context/SessionContext'
import CreateRoom from '../components/CreateRoom'
import Room from '../components/Room'
/** 
 * either to render user created room <YourRoom />
 * or create room <CreateRoom />
 * how to know if user has created room
 *  
*/
const UserRoom = ({ navigation }) => {
  const { rooms } = useContext(RoomsContext);
  const user = useSession()
  const { createdRoom } = user || {}
  const { id: createdRoomId, DIV: teamDivision } = createdRoom || {}

  const userCreatedRoom = rooms?.[teamDivision][createdRoomId]
  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight
    })
  }, [])
  const renderSetMatchButton = () => (
    <View style={{ marginRight: 12 }}>
      <TouchableOpacity onPress={() => { }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }} type={'secondary'}>Set Match</Text>
      </TouchableOpacity>
    </View>
  )
  const renderCreateRoom = () => (
    <View style={{ marginRight: 12 }}>
      <TouchableOpacity onPress={() => { }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }} type={'secondary'}>Create Room</Text>
      </TouchableOpacity>
    </View>
  )
  function renderHeaderRight() {
    if (createdRoom?.id)
      return renderSetMatchButton()
    return renderCreateRoom()

  }
  if (!userCreatedRoom?.id)
    return <CreateRoom />
  return <Room
    roomId={userCreatedRoom?.id}
  />
}
export default UserRoom