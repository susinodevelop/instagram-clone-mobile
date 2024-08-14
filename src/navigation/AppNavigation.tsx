import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import ExploreScreen from "@/screens/ExploreScreen";
import ReelsScreen from "@/screens/ReelsScreen";
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
import ProfileNavigation from "./ProfileNavigation";
import Navigation from "@/constants/NavigationConstants";

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
        initialRouteName={Navigation.FeedScreen}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name={Navigation.FeedNavigation}
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
              navigation.navigate(Navigation.FeedNavigation as never); //TODO revisar el "as never"
            },
          }}
        />
        <Tab.Screen
          name={Navigation.ExploreScreen}
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
          name={Navigation.CreationScreen}
          component={CreationScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => <CreateIcon />,
          }}
        />
        <Tab.Screen
          name={Navigation.ReelsScreen}
          component={ReelsScreen}
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
          name={Navigation.ProfileNavigation}
          component={ProfileNavigation}
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
