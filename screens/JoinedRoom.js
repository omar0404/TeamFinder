import React, { useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import firebaseService from '../service/firebase';
import Room from '../components/Room';



const JoinedRoom = ({ route, navigation }) => {
  const { roomId, teamDivision } = route.params ?? {};
  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight
    })
  }, [])
  const onLeaveRoomPress = () => {
    // remove joined team
    // set status to empty
    firebaseService.leaveRoom(teamDivision, roomId)
    navigation.goBack()
  }
  function renderHeaderRight() {
    return (
      <View style={{ marginRight: 12 }}>
        <TouchableOpacity onPress={onLeaveRoomPress}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }} type={'secondary'}>Leave</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <Room
      roomId={roomId}
      teamDivision={teamDivision}
    />
  )
}
export default JoinedRoom