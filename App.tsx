import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "@/navigation/AppNavigation";
import { AppProvider } from "@/context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </AppProvider>
  );
};

export default App;
