import React from "react";
import User from "@/interface/User";
import { StyleSheet, View, Image, StyleSheetProperties } from "react-native";

interface ProfilePictureProps {
  user: User;
  width?: number;
  height?: number;
}
const ProfileImage = ({
  user,
  width = 50,
  height = 50,
}: ProfilePictureProps) => {
  return (
    <Image
      source={{ uri: `${user.profile_img}` }}
      width={width}
      height={height}
      style={ownStyles.image}
    />
  );
};

const ownStyles = StyleSheet.create({
  image: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 100,
  },
});

export default ProfileImage;
