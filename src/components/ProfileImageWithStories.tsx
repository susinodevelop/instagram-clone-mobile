import React, { useEffect, useState } from "react";
import User from "@/interface/User";
import ProfileImage from "./ProfileImage";
import Story from "@/interface/Story";
import { getUserStories } from "@/services/UserService";

interface ProfileImageWithStoriesProps {
  user: User;
  width?: number;
  height?: number;
}
const ProfileImageWithStories = ({
  user,
  width = 50,
  height = 50,
}: ProfileImageWithStoriesProps) => {
  //TODO implementar el getstories y el modal

  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    getUserStories(user.id).then(setStories);
  }, []);

  return (
    <ProfileImage
      user={user}
      width={width}
      height={height}
      withBorder={stories && stories.length > 0}
    />
  );
};

export default ProfileImageWithStories;
