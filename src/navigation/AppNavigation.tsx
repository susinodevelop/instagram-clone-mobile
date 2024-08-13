import React, { useContext, useEffect, useState } from "react";
import ProfileScreen from "@/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import ExploreScreen from "@/screens/ExploreScreen";
import ReelScreen from "@/screens/ReelScreen";
import ProfileImage from "@/components/ProfileImage";
import { getUser } from "@/services/UserService";
import User from "@/interface/User";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import CreationScreen from "@/screens/CreationScreen";
import { AppContext } from "@/context/AppContext";
import FeedNavigation from "./FeedNavigation";
import {
  CreateIcon,
  HomeIcon,
  ReelIcon,
  SearchIcon,
  UserIcon,
} from "@/theme/Icons";

const PROFILE_IMAGE_DIMENSIONS = 40;

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(state.userId).then((user) => setUser(user));
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="FeedNavigation"
          component={FeedNavigation}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View style={style.icon}>
                <HomeIcon />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              navigation.navigate("Feed" as never); //TODO revisar el "as never"
            },
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View style={style.icon}>
                <SearchIcon />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="CreationScreen"
          component={CreationScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => <CreateIcon />,
          }}
        />
        <Tab.Screen
          name="Reels"
          component={ReelScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View style={style.icon}>
                <ReelIcon />
              </View>
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
                <UserIcon />
              ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default AppNavigation;
