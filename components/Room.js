import { update, remove } from 'firebase/database';
import React, { useContext, useEffect, useReducer } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import RoomTeam from './RoomTeam';
import { BgView, Text } from './Themed';
import { TeamsContext } from '../context/TeamsContext';
import { roomRef } from '../service/firebase';
import { useSession } from '../context/SessionContext';
import { usePrev, useOnValue } from '../hooks';



const Room = ({ roomId }) => {
  const { teams } = useContext(TeamsContext)
  const user = useSession()
  const userTeam = teams?.[user?.team] || {}
  const { divisionRecords } = userTeam
  const { DIV: teamDivision } = divisionRecords || {}
  const _roomRef = roomRef(`${teamDivision}/${roomId}`)
  const [room] = useOnValue(_roomRef, roomId)
  const { homeTeam: homeTeamId, awayTeam: awayTeamId } = room ?? {}
  const prevAwayTeamId = usePrev(awayTeamId)
  const homeTeam = teams[homeTeamId]
  const awayTeam = teams[awayTeamId]
  const isRoomOwner = room?.id == user.id;
  useEffect(() => {
    // if !prev joined team and joined team  (team just joined)
    // -> set home team ready to false
    if (!prevAwayTeamId && awayTeamId) {
      update(_roomRef, { homeTeamReady: false })
    }
    // if !joined team and prev joined team  (joined team just left)
    // -> set home team ready to false
    if (!awayTeamId && prevAwayTeamId) {
      update(_roomRef, { homeTeamReady: false })
    }
  }, [awayTeamId])

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

  if (!room) return null

  return (
    <BgView style={style.container}>
      {renderRoomTeams()}
    </BgView>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kickButton: {
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
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