import 'react-native-gesture-handler'
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "@/navigation/AppNavigation";
import { AppProvider } from "@/context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default App;
