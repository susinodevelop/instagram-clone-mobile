import React, { useEffect, useState } from "react";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ExploreScreen from "@/screens/ExploreScreen";
import CreationScreen from "@/screens/CreationScreen";
import ReelScreen from "@/screens/ReelScreen";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProfileImage from "@/components/ProfileImage";
import { getUser } from "@/services/UserService";
import User from "@/interface/User";

const PROFILE_IMAGE_DIMENSIONS = 40;

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(1).then((user) => setUser(user));
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={ExploreScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <FontAwesome5 name="search" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Creation"
          component={CreationScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="creation" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Reels"
          component={ReelScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="movie-outline"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () =>
              user ? (
                <ProfileImage
                  user={user}
                  width={PROFILE_IMAGE_DIMENSIONS}
                  height={PROFILE_IMAGE_DIMENSIONS}
                />
              ) : (
                <FontAwesome name="user" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
