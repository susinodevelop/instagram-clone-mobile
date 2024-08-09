import React, { useContext, useEffect, useState } from "react";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ExploreScreen from "@/screens/ExploreScreen";
import ReelScreen from "@/screens/ReelScreen";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProfileImage from "@/components/ProfileImage";
import { getUser } from "@/services/UserService";
import User from "@/interface/User";
import { SafeAreaView, StyleSheet } from "react-native";
import { APP_MENU_NAVIGATION_HEADER_HEIGHT } from "@/constants/DimensionConstants";
import CreationScreen from "@/screens/CreationScreen";
import { AppContext } from "@/context/AppContext";

const PROFILE_IMAGE_DIMENSIONS = 40;

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(state.userId).then((user) => setUser(user));
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={style.container}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: {
                height: APP_MENU_NAVIGATION_HEADER_HEIGHT,
              },
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Entypo
                  name="home"
                  size={24}
                  color="black"
                  style={style.icon}
                />
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
            name="CreationScreen"
            component={CreationScreen}
            options={{
              headerStyle: {
                height: APP_MENU_NAVIGATION_HEADER_HEIGHT,
              },
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <AntDesign name="plussquareo" size={24} color="black" />
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
      </SafeAreaView>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default AppNavigation;
