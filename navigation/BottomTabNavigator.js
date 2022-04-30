// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import Room from "../screens/Room";
import Colors from "../constants/Colors";
import JoinRoom from "../screens/JoinRoom";
import MyRoom from '../screens/MyRoom'
import { useTheme } from "../components/Themed";
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colors = useTheme()
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: colors.border,
        headerStyle: { backgroundColor: colors.background.secondary },
        tabBarStyle: { backgroundColor: colors.background.secondary },
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();
function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="MyRoom"
        component={MyRoom}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  const colors = useTheme()

  return (
    <TabTwoStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background.secondary }
      }}
    >
      <TabTwoStack.Screen
        name="JoinRoom"
        component={JoinRoom}
        options={{ headerTitle: "Tab Two Title" }}
      />
      <TabTwoStack.Screen
        name="Room"
        component={Room}
      />
    </TabTwoStack.Navigator>
  );
}
