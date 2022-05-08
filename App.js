import "react-native-gesture-handler";
import "./service/firebsaeConfig";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";

import RoomsProvider from "./context/RoomsContext";
import TeamsProvider from "./context/TeamsContext";
import SessionProvider from "./context/SessionContext";
import { useTheme } from "./components/Themed";
import JoinedRoomBubble from './components/JoinedRoomBubble'
export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colors = useTheme();

  if (!isLoadingComplete)
    return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.secondary }}>

      <SessionProvider>
        <RoomsProvider>
          <TeamsProvider>

            <Navigation />
            {/* <JoinedRoomBubble /> */}
            <StatusBar />
          </TeamsProvider>
        </RoomsProvider>
      </SessionProvider>
    </SafeAreaView>

  );
}
