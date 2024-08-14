import Navigation from "@/constants/NavigationConstants";
import PostScreen from "@/screens/PostScreen";
import ProfileScreen from "@/screens/profile/ProfileScreen";
import ReelScreen from "@/screens/ReelScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={Navigation.Profile}
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{
            title: "Posts",
          }}
          name={Navigation.PostScreen}
          component={PostScreen}
        />
        <Stack.Screen
          options={{
            title: "Reels",
          }}
          name={Navigation.ReelScreen}
          component={ReelScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default ProfileNavigation;
