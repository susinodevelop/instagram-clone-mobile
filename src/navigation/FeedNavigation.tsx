import React from "react";
import FeedScreen from "@/screens/FeedScreen";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import MessageScreen from "@/screens/MessageScreen";

const Stack = createStackNavigator();

const FeedNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Messages" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigation;
