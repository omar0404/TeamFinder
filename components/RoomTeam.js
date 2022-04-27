import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import {
  Ionicons
} from "@expo/vector-icons";
import { DARK_COLOR, LIGHTER_DARK_COLOR } from '../constants/Colors';
import { CheckBox } from "react-native-elements";

const RoomTeam = ({ team, isRoomOwner, isTeamOwner, isReady, onReadyPress }) => {
  const { logoUrl, name } = team ?? {}
  const renderLogo = () => {
    return (
      <Image style={{ width: 100, height: 100 }} source={{ uri: logoUrl }} />
    )
  }
  const renderName = () => {
    return (
      <Text style={{ color: "white" }}>{name}</Text>
    )
  }
  const renderTeamDetailsButton = () => {
    return (
      <TouchableOpacity
        style={style.teamDetailsButton}
      >
        <Ionicons
          style={{ marginRight: 5 }}
          name="stats-chart"
          size={15}
          color="white"
        />
        <Text style={{ color: "white", fontSize: 13 }}>Team Details</Text>
      </TouchableOpacity>
    )
  }
  const renderKickTeamButton = () => {
    return (
      <TouchableOpacity
        style={style.kickButton}
      >
        <MaterialCommunityIcons
          style={{ marginRight: 5 }}
          name="exit-run"
          size={15}
          color="white"
        />
        <Text style={{ color: "white", fontSize: 13 }}>
          KICK {awayTeam.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const renderReadyCheckBox = () => {
    return (
      <CheckBox
        containerStyle={style.checkBoxContainer}
        textStyle={style.checkBoxTextStyle}
        onPress={onReadyPress}
        checked={isReady}
        title={"ACCEPT"}
      />
    )
  }
  const renderTeamReadyState = () => {
    return (
      <Text
        style={style.acceptedText}
      >
        {isReady ? "ACCEPTED!" : ""}
      </Text>
    )
  }
  if (!team?.id) {
    return (
      <Text
        style={style.waitOponnet}
      >
        WAIT FOR OPONNET TO JOIN YOUR ROOM
      </Text>)
  }
  return (
    <View style={{ alignItems: 'center', }}>
      {renderLogo()}
      {renderName()}
      {renderTeamDetailsButton()}
      {isRoomOwner && renderKickTeamButton()}
      <View
        style={style.readySectionContainer}
      >
        {isTeamOwner ? renderReadyCheckBox() : renderTeamReadyState()}
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  teamDetailsButton: {
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DARK_COLOR,
    padding: 5,
    marginTop: 10,
    justifyContent: "center"
  },
  readySectionContainer: {
    height: 70,
    backgroundColor: LIGHTER_DARK_COLOR,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  waitOponnet: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 30,
    alignSelf: 'center',
    width: "50%",
  }
})
export default RoomTeam