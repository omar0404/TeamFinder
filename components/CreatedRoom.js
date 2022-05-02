import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { BgView, Text, useTheme } from "./Themed";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as _ from "lodash";
import { TeamsContext } from "../context/TeamsContext";
import { useThemeColor } from "./Themed";

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
  } = room ?? {};
  const theme = useTheme()
  const style = _style(theme)
  const { teams } = useContext(TeamsContext);
  const homeTeam = teams?.[room?.homeTeam] ?? {};
  const awayTeam = teams?.[room?.awayTeam] ?? {};
  const renderHeader = () => (
    <BgView type={'secondary'} style={style.headerContainer}>
      <BgView type={'fifth'} style={style.roomStatus}>
        <Text >{status}</Text>
      </BgView>
      <View style={style.options}>
        <Text style={{ fontSize: 17 }}>
          {(booked && "BOOKING OPTIONS") || "PERFERD OPTIONS"}
        </Text>
      </View>
    </BgView>
  );
  const renderTeams = () => {
    return (
      <BgView type={'secondary'} style={style.teams}>
        {renderTeam(homeTeam)}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 15 }}>VS</Text>
        </View>
        {awayTeam?.id && renderTeam(awayTeam)}
        {!awayTeam?.id && renderJoinRoomButton()}
      </BgView>
    );
  };
  const renderTeam = team => (
    <View style={style.team}>
      <Image style={{ width: 40, height: 40 }} source={{ uri: team.logoUrl }} />
      <Text style={{ fontSize: 12, marginTop: 10 }}>
        {team.name}
      </Text>
    </View>
  );
  const renderJoinRoomButton = () => (
    <View style={style.joinRoomButton}>
      <Ionicons name={"non"} size={40} color={theme.icon.primary} />
      <TouchableOpacity style={style.setMatchContainer}>
        <Text>Join Room</Text>
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
        <Text >{location} </Text>
      ));

    if (location?.short_address)
      return <Text >{location.short_address}</Text>;
    return null;
  };
  const renderSettings = () => (
    <BgView style={style.settings}>
      <View style={style.settingsWrapper}>
        <Info
          iconProps={{
            Icon: Entypo,
            name: "location-pin",
            size: 40,
            color: theme.icon.primary
          }}
        >
          {renderLocation(location)}
        </Info>
      </View>
    </BgView>
  );
  return (
    <TouchableOpacity onPress={onPress}>
      <BgView style={style.container}>
        <View style={style.wrapper}>
          {renderHeader()}
          <View style={style.footer}>
            {renderTeams()}
            {renderSettings()}
          </View>
        </View>
      </BgView>
    </TouchableOpacity>
  );
};
const _style = (theme) => StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 10 / 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.border.primary,
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
    borderTopRightRadius: 5,
    flexDirection: "row"
  },
  roomStatus: {
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
    width: "100%",
    backgroundColor: theme.button.primary,
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
