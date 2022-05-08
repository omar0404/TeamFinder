// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createContext, useContext } from "react";
import colors from '../constants/Colors'
import CreatedRoom from '../components/CreatedRoom'
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Team from "../screens/Team";
import { useTheme } from "../components/Themed";
const Tab = createMaterialTopTabNavigator();


export default function Navigation() {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}


function RootNavigator() {
  const colors = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        headerStyle: { backgroundColor: colors.background.secondary },
        tabBarStyle: { backgroundColor: colors.background.secondary, borderTopColor: "transparent" },
      }}
    >
      <Tab.Screen name="Team" component={Team} />
      <Tab.Screen name="Find Match" component={BottomTabNavigator} />
    </Tab.Navigator>
  );
}
