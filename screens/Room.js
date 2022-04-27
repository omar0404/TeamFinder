import { update, remove } from 'firebase/database';
import React, { useContext, useEffect, useReducer } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import RoomTeam from '../components/RoomTeam';
import { LIGHT_DARK_COLOR, DARK_COLOR } from '../constants/Colors';
import { TeamsContext } from '../context/TeamsContext';
import { useOnValue } from '../hooks/firebase';
import { roomRef } from '../service/firebase';



const Room = ({ route }) => {
  const { teams } = useContext(TeamsContext)
  const { roomId, user, teamDivision } = route.params ?? {};
  const _roomRef = roomRef(`${teamDivision}/${roomId}`)
  const [room] = useOnValue(_roomRef)
  const { homeTeam: homeTeamId, awayTeam: awayTeamId } = room ?? {}
  const homeTeam = teams[homeTeamId]
  const awayTeam = teams[awayTeamId]
  const isRoomOwner = room?.id == user.id
  useEffect(() => {
    return () => {
      // remove joined team
      // set status to empty
      if (!isRoomOwner) {
        remove(roomRef(`${teamDivision}/${roomId}/awayTeam`))
        update(_roomRef, { status: 'empty' })
      }
    }
  }, [])
  if (!room) return null
  const onReadyPress = (isHomeTeam) => {
    if (isHomeTeam) {
      update(_roomRef, {
        homeTeamReady: !room.homeTeamReady
      })
    } else {
      update(_roomRef, {
        awayTeamReady: !room.awayTeamReady
      })
    }
  }
  const renderRoomTeams = () => {
    return (
      <View
        style={style.teamsContainer}
      >
        <RoomTeam
          team={homeTeam}
          isRoomOwner={isRoomOwner}
          isTeamOwner={user.team == homeTeam.id}
          isReady={room.homeTeamReady}
          onReadyPress={() => onReadyPress(true)}
        />
        <View style={{ width: 5 }} />
        <RoomTeam
          team={awayTeam}
          isRoomOwner={isRoomOwner}
          isTeamOwner={user.team == awayTeam?.id}
          isReady={room.awayTeamReady}
          onReadyPress={() => onReadyPress(false)}

        />
      </View>
    )
  }
  return (
    <View style={style.container}>
      {renderRoomTeams()}
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_DARK_COLOR,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kickButton: {
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DARK_COLOR,
    padding: 5,
    justifyContent: "center",
    marginTop: 10
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    flex: 1,
  },
  checkBoxTextStyle: {
    color: "white",
    fontSize: 17
  },

  acceptedText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
})
export default Room