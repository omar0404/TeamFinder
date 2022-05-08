// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import JoinRoom from "../screens/JoinRoom";
import UserRoom from '../screens/UserRoom'
import { useTheme } from "../components/Themed";
import JoinedRoom from "../screens/JoinedRoom";
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colors = useTheme()
  return (
    <BottomTab.Navigator
      initialRouteName="My Room"
      screenOptions={{
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        headerStyle: { backgroundColor: colors.background.secondary },
        tabBarStyle: { backgroundColor: colors.background.secondary, borderTopColor: "transparent" },
      }}
    >
      <BottomTab.Screen
        name="My Room"
        component={TabOneNavigator}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Join Room"
        component={TabTwoNavigator}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
          title: "Join Room"
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
  const colors = useTheme()

  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background.secondary, shadowOpacity: 0, },
        headerTintColor: colors.text.primary
      }}
    >
      <TabOneStack.Screen
        name="UserRoom"
        component={UserRoom}
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
        headerStyle: { backgroundColor: colors.background.secondary, shadowOpacity: 0, },
        headerTintColor: colors.text.primary
      }}
    >
      <TabTwoStack.Screen
        name="JoinRoom"
        component={JoinRoom}
        options={{ headerTitle: "Join Room" }}
      />
      <TabTwoStack.Screen
        name="JoinedRoom"
        component={JoinedRoom}
      />
      <TabTwoStack.Screen
        name="UserRoom"
        component={UserRoom}
      />
    </TabTwoStack.Navigator>
  );
}
