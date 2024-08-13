import React from "react";
import FeedScreen from "@/screens/FeedScreen";
import MessageScreen from "@/screens/MessageScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

const FeedNavigation = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarShowIcon: false,
        tabBarShowLabel: false,
        animationEnabled: true,
        tabBarStyle: {
          height: 0,
          width: 0,
        },
      }}
    >
      <TopTab.Screen name="Feed" component={FeedScreen} />
      <TopTab.Screen name="Messages" component={MessageScreen} />
    </TopTab.Navigator>
  );
};

export default FeedNavigation;
