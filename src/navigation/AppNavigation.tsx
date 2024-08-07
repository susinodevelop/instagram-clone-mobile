import React, { useEffect, useState } from "react";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ExploreScreen from "@/screens/ExploreScreen";
import ReelScreen from "@/screens/ReelScreen";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProfileImage from "@/components/ProfileImage";
import { getUser } from "@/services/UserService";
import User from "@/interface/User";
import { StyleSheet } from "react-native";
import MessageScreen from "@/screens/MessageScreen";
import {
  APP_MENU_NAVIGATION_HEIGHT,
  APP_MENU_NAVIGATION_HEADER_HEIGHT,
} from "@/constants/DimensionConstants";

const PROFILE_IMAGE_DIMENSIONS = 40;

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(1).then((user) => setUser(user));
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarStyle: {
            height: APP_MENU_NAVIGATION_HEIGHT,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              height: APP_MENU_NAVIGATION_HEADER_HEIGHT,
            },
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <Entypo name="home" size={24} color="black" style={style.icon} />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            headerStyle: {
              height: APP_MENU_NAVIGATION_HEADER_HEIGHT,
            },
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <Feather
                name="search"
                size={24}
                color="black"
                style={style.icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reels"
          component={ReelScreen}
          options={{
            headerStyle: {
              height: APP_MENU_NAVIGATION_HEADER_HEIGHT,
            },
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="movie-outline"
                size={24}
                color="black"
                style={style.icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessageScreen}
          options={{
            headerStyle: {
              height: APP_MENU_NAVIGATION_HEADER_HEIGHT,
            },
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="send-outline"
                size={24}
                color="black"
                style={style.icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerStyle: {
              height: APP_MENU_NAVIGATION_HEADER_HEIGHT,
            },
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

const style = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
});

export default AppNavigation;
