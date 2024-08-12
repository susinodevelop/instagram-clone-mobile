import React from "react";
import User from "@/interface/User";
import { Image } from "react-native";

interface ProfileImageProps {
  user: User;
  width?: number;
  height?: number;
  withBorder?: boolean;
  borderWidth?: number;
  borderColor?: string;
}
const ProfileImage = ({
  user,
  width = 50,
  height = 50,
  borderWidth = 3,
  withBorder = false,
  borderColor = "#d62976",
}: ProfileImageProps) => {
  const borderStyle = withBorder
    ? {
        borderWidth,
        borderColor,
      }
    : {};

  return (
    <Image
      source={{ uri: user.profile_img }}
      style={[{ width, height, borderRadius: width / 2 }, borderStyle]}
    />
  );
};

export default ProfileImage;
