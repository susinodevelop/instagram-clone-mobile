import React from "react";
import User from "@/interface/User";
import ProfileImage from "./ProfileImage";

interface ProfileImageWithStoriesProps {
  user: User;
  width?: number;
  height?: number;
  withBorder?: boolean;
}
const ProfileImageWithStories = ({
  user,
  width = 50,
  height = 50,
  withBorder,
}: ProfileImageWithStoriesProps) => {
  //TODO implementar el getstories y el modal
  return (
    <ProfileImage
      user={user}
      width={width}
      height={height}
      withBorder={withBorder}
    />
  );
};

export default ProfileImageWithStories;
