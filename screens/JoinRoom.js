import React, { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CreatedRoom from "../components/CreatedRoom";
import { RoomsContext } from "../context/RoomsContext";
import { TeamsContext } from "../context/TeamsContext";
import { DARK_COLOR } from "../constants/Colors";
import { roomRef } from "../service/firebase";
import { update } from "firebase/database";
import * as _ from "lodash";
import { useSession } from "../context/SessionContext";
const JoinRoom = ({ navigation }) => {
  const { rooms } = useContext(RoomsContext);
  const { teams } = useContext(TeamsContext);

  const user = useSession()
  const { id: userTeamId, divisionRecords } = teams?.[user.team] || {}
  const { DIV: teamDivision } = divisionRecords || ""
  const onJoinRoomPress = (room) => {
    navigation.push('Room', { roomId: room.id, user, teamDivision })
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

  };
  if (!rooms) return null;
  return (
    <View style={style.container}>
      <FlatList
        data={_.values(rooms?.[teamDivision])}
        renderItem={({ item }) => <CreatedRoom onPress={() => onJoinRoomPress(item)} room={{ ...item }} />}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_COLOR,
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  }
});
export default JoinRoom;
