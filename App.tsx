import React from "react";
import FeedScreen from "./src/screens/FeedScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <FeedScreen />
    </SafeAreaProvider>
  );
};

export default App;
