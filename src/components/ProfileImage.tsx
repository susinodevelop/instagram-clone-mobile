import React from "react";
import User from "@/interface/User";
import { StyleSheet, View, Image, StyleSheetProperties } from "react-native";

interface ProfilePictureProps {
  user: User;
  width?: number;
  height?: number;
  style?: StyleSheetProperties;
}
const ProfileImage = ({
  user,
  width = 50,
  height = 50,
  style,
}: ProfilePictureProps) => {
  return (
    <View style={style}>
      <Image
        source={{ uri: `${user.profile_img}` }}
        width={width}
        height={height}
        style={ownStyles.image}
      />
    </View>
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
