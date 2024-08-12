import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";
import User from "@/interface/User";

const PROFILE_IMAGE_DIMENSIONS = 40;

interface ProfileImageCardProps {
  user: User;
}

const ProfileImageCard = ({ user }: ProfileImageCardProps) => {
  return (
    <View style={style.profileImageContainer}>
      <View style={style.profileImage}>
        <ProfileImage
          user={user}
          width={PROFILE_IMAGE_DIMENSIONS}
          height={PROFILE_IMAGE_DIMENSIONS}
        />
      </View>
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
  profileImage: {
    margin: 10,
  },
  profileUsername: {
    fontWeight: "bold"
  },
});
