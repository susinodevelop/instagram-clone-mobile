import React from "react";
import FeedScreen from "./src/screens/FeedScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "@/navigation/AppNavigation";

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
};

export default App;
