import React, { useContext } from "react";
import { Alert, FlatList, Image, StyleSheet, View } from "react-native";
import CreatedRoom from "../components/CreatedRoom";
import { RoomsContext } from "../context/RoomsContext";
import { TeamsContext } from "../context/TeamsContext";
import firebaseService, { roomRef, userRef } from "../service/firebase";
import { update } from "firebase/database";
import * as _ from "lodash";
import { useSession } from "../context/SessionContext";
import { BgView, Text } from '../components/Themed'
const JoinRoom = ({ navigation }) => {
  const { rooms } = useContext(RoomsContext);
  const { teams } = useContext(TeamsContext);

  const user = useSession()
  const userTeam = teams?.[user?.team] || {}
  const { id: userTeamId, divisionRecords } = userTeam
  const { DIV: teamDivision } = divisionRecords || {}

  const handleJoinRoom = (room) => {
    if (room.homeTeam != user.team) {
      firebaseService.joinRoom(teamDivision, room.id)
      navigation.push('JoinedRoom', { roomId: room.id, teamDivision })
    } else {
      navigation.push('UserRoom')
    }
  }
  const onJoinRoomPress = (room) => {
    // user cannot join because  room is full and room teams aren't user team
    if (room.status == 'full' && (room.homeTeam != user.team && room.awayTeam != user.team))
      return
    // user can join
    // -> but already joined room
    if (user?.joinedRoomId && user?.joinedRoomId != room?.id) {
      Alert.alert('you already in a room do you want to leave it and join this room ?', '', [
        {
          text: 'no'
        },
        {
          text: 'yes',
          onPress: () => {
            firebaseService.leaveRoom(teamDivision, user?.joinedRoomId)
            handleJoinRoom(room)
          }
        }
      ])
    } else {
      handleJoinRoom(room)
    }

  };
  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 30, height: 30 }} source={{ uri: userTeam.logoUrl }} />
        <View>
          <Text style={{ marginHorizontal: 12 }}>{userTeam.name}</Text>
          <Text style={{ marginHorizontal: 12 }}>DIV: {userTeam.divisionRecords.DIV}</Text>
        </View>
      </View>
    )

  })
  if (!rooms) return null;
  return (
    <BgView style={style.container}>
      <FlatList
        data={_.values(rooms?.[teamDivision])}
        renderItem={({ item }) => <CreatedRoom onPress={() => onJoinRoomPress(item)} room={{ ...item }} />}
      />
    </BgView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  }
});
export default JoinRoom;
