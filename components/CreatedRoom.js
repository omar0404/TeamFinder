import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {
  DARK_COLOR,
  LIGHT_DARK_COLOR,
  LIGHT_COLOR,
  SKY_COLOR
} from "../constants/Colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as _ from "lodash";
import { TeamsContext } from "../context/TeamsContext";

const CreatedRoom = ({ room, onPress }) => {
  const {
    status,
    booked,
    days,
    date,
    times,
    timeFrom,
    timeTo,
    location
  } = room;
  const { teams } = useContext(TeamsContext);
  const homeTeam = teams[room.homeTeam];
  const awayTeam = teams[room.awayTeam];
  const renderHeader = () => (
    <View style={style.headerContainer}>
      <View style={style.roomStatus}>
        <Text style={{ color: "white" }}>{status}</Text>
      </View>
      <View style={style.options}>
        <Text style={{ fontSize: 17, color: "white" }}>
          {(booked && "BOOKING OPTIONS") || "PERFERD OPTIONS"}
        </Text>
      </View>
    </View>
  );
  const renderTeams = () => {
    return (
      <View style={style.teams}>
        {renderTeam(homeTeam)}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 15 }}>VS</Text>
        </View>
        {!!awayTeam && renderTeam(awayTeam)}
        {!!!awayTeam && renderJoinRoomButton()}
      </View>
    );
  };
  const renderTeam = team => (
    <View style={style.team}>
      <Image style={{ width: 40, height: 40 }} source={{ uri: team.logoUrl }} />
      <Text style={{ color: "white", fontSize: 12, marginTop: 10 }}>
        {team.name}
      </Text>
    </View>
  );
  const renderJoinRoomButton = () => (
    <View style={style.joinRoomButton}>
      <Ionicons name={"non"} size={40} color={SKY_COLOR} />
      <TouchableOpacity style={style.setMatchContainer}>
        <Text style={{ color: "white" }}>Join Room</Text>
      </TouchableOpacity>
    </View>
  );

  const Info = props => {
    const { Icon, ...iconProps } = props.iconProps;
    return (
      <View style={style.settingItem}>
        <Icon {...iconProps} />
        <View style={style.settingValue}>{props.children}</View>
      </View>
    );
  };
  const renderLocation = location => {
    if (_.isArray(location))
      return location.map(location => (
        <Text style={{ color: "white" }}>{location} </Text>
      ));

    if (location?.short_address)
      return <Text style={{ color: "white" }}>{location.short_address}</Text>;
    return null;
  };
  const renderSettings = () => (
    <View style={style.settings}>
      <View style={style.settingsWrapper}>
        <Info
          iconProps={{
            Icon: Entypo,
            name: "location-pin",
            size: 40,
            color: LIGHT_COLOR
          }}
        >
          {renderLocation(location)}
        </Info>
      </View>
    </View>
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}>
        <View style={style.wrapper}>
          {renderHeader()}
          <View style={style.footer}>
            {renderTeams()}
            {renderSettings()}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 10 / 9,
    backgroundColor: DARK_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LIGHT_DARK_COLOR,
    marginTop: 15
  },
  wrapper: {
    flex: 1
  },
  footer: {
    flex: 4,
    flexDirection: "row"
  },

  settings: {
    flex: 2,
    backgroundColor: DARK_COLOR
  },
  settingsWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-around",
    justifyContent: "center"
  },
  settingItem: {
    width: "50%",
    alignItems: "center"
  },
  headerContainer: {
    flex: 1,
    backgroundColor: LIGHT_DARK_COLOR,
    borderTopRightRadius: 5,
    flexDirection: "row"
  },
  roomStatus: {
    backgroundColor: LIGHT_COLOR,
    borderTopLeftRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "33.4%"
  },
  options: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  teams: {
    flex: 1,
    backgroundColor: LIGHT_DARK_COLOR,
    justifyContent: "center"
  },
  team: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  joinRoomButton: {
    flex: 1,
    alignItems: "center"
  },
  setMatchContainer: {
    backgroundColor: LIGHT_COLOR,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1
  },
  settingValue: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});
export default CreatedRoom;
