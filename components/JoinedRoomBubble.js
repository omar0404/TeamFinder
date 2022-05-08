import React, { useContext, useRef } from 'react'
import { Image, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native'
import { RoomsContext } from '../context/RoomsContext'
import { useSession } from '../context/SessionContext'
import { TeamsContext } from '../context/TeamsContext'
import { BgView, Text, useTheme } from './Themed'
const SCREEN_HEIGHT = Dimensions.get('screen').height
const JoinedRoomBubble = () => {
  const colors = useTheme()
  const user = useSession()
  const { rooms } = useContext(RoomsContext)
  const { teams } = useContext(TeamsContext)
  const room = rooms?.["10"]?.[user?.joinedRoomId]
  const homeTeam = teams?.[room?.homeTeam] ?? {};
  const awayTeam = teams?.[room?.awayTeam] ?? {};
  const pan = useRef(new Animated.ValueXY(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetResponder: () => true,
      onPanResponderGrant: () => {
        pan.setValue({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: ({ nativeEvent: { locationX, locationY, pageY, pageX } }) => {
        pan.setValue({
          x: pan.x._value + locationX,
          y: pan.y._value + locationY
        });
      }
    })
  ).current;
  if (!user?.joinedRoomId)
    return null
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }]
      }}
      {...panResponder.panHandlers}
    >
      <BgView
        style={[style.container(colors)]}
      >
        <Image style={{ width: 40, height: 40 }} source={{ uri: homeTeam.logoUrl }} />
        <Text>VS</Text>
        <Image style={{ width: 40, height: 40 }} source={{ uri: awayTeam.logoUrl }} />
      </BgView>
    </Animated.View>
  )
}
const style = StyleSheet.create({
  container: colors => ({
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: 100,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary
  })
})

export default JoinedRoomBubble