import Post from "@/interface/Post";
import ProfilePostsView from "@/screens/profile/ProfilePostsView";
import ProfileReelsView from "@/screens/profile/ProfileReelsView";
import { PostGridIcon, UserIcon, VideoIcon } from "@/theme/Icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View } from "react-native";

const TopTab = createMaterialTopTabNavigator<ProfileTabNavigationParams>();

interface ProfilePostsProps {
  posts: Post[];
}

export type ProfileTabNavigationParams = {
  ProfilePosts: ProfilePostsProps;
  ProfileReels: any; //TODo revisra
  ProfileTaggedPosts: any; //TODO revisar
};

const ProfileTabNavigation = ({ ProfilePosts }: ProfileTabNavigationParams) => {
  return (
    <View style={{ flex: 1 }}>
      <TopTab.Navigator
        initialRouteName="ProfilePosts"
        screenOptions={{
          animationEnabled: true,
        }}
      >
        <TopTab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => <PostGridIcon color={props.color} />,
          }}
          name="ProfilePosts"
          component={ProfilePostsView}
        />
        <TopTab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => <VideoIcon color={props.color} />,
          }}
          name="ProfileReels"
          component={ProfileReelsView}
        />
        <TopTab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => <UserIcon color={props.color} />,
          }}
          name="ProfileTaggedPosts"
          component={ProfilePostsView}
        />
      </TopTab.Navigator>
    </View>
  );
};

export default ProfileTabNavigation;
