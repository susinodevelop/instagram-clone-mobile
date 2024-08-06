import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";
import User from "@/interface/User";

interface ProfileImageCardProps {
  user: User;
}

const ProfileImageCard = ({ user }: ProfileImageCardProps) => {
  return (
    <View style={style.profileImageContainer}>
      <ProfileImage user={user} />
      <Text style={style.profileUsername}>{user.username}</Text>
    </View>
  );
};

export default ProfileImageCard;

const style = StyleSheet.create({
  profileImageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profileUsername: {},
});
