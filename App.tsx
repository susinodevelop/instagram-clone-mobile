import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "@/navigation/AppNavigation";
import AppProvider from "@/context/AppProvider";

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
