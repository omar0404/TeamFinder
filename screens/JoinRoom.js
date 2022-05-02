import React, { useContext } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import CreatedRoom from "../components/CreatedRoom";
import { RoomsContext } from "../context/RoomsContext";
import { TeamsContext } from "../context/TeamsContext";
import { roomRef, userRef } from "../service/firebase";
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
  const { DIV: teamDivision } = divisionRecords || ""
  const onJoinRoomPress = (room) => {
    if (room.status == 'full' && (room.homeTeam != user.team && room.awayTeam != user.team))
      return
    update(userRef(user.id), { joinedRoomId: room.id })
    if (room.homeTeam == user.team) {
      update(roomRef(`${teamDivision}/${room.id}`), {
        homeTeam: userTeamId,
        status: "full"
      });
    } else {
      update(roomRef(`${teamDivision}/${room.id}`), {
        awayTeam: userTeamId,
        status: "full"
      });
    }
    navigation.push('Room', { roomId: room.id, user, teamDivision })
  };
  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 30, height: 30 }} source={{ uri: userTeam.logoUrl }} />
        <Text style={{ marginHorizontal: 12 }}>{userTeam.name}</Text>
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
