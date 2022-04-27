import "react-native-gesture-handler";
import "./service/firebsaeConfig";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";
import { Provider } from 'react-redux'
import store from './redux/configureStore'

import RoomsProvider from "./context/RoomsContext";
import TeamsProvider from "./context/TeamsContext";
import SessionProvider from "./context/SessionContext";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete)
    return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <SessionProvider>
        <RoomsProvider>
          <TeamsProvider>

            <Navigation colorScheme={colorScheme} />

            <StatusBar />
          </TeamsProvider>
        </RoomsProvider>
      </SessionProvider>
    </SafeAreaView>

  );
}
