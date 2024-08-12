import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

interface IconProps {
  size?: number;
  color?: string;
}

export const ChangeCameraIcon = ({ size = 24, color = "black" }: IconProps) => (
  <MaterialIcons name="change-circle" size={size} color={color} />
);

export const TakePhotoIcon = ({ size = 24, color = "black" }: IconProps) => (
  <MaterialIcons name="add-a-photo" size={size} color={color} />
);

export const RecVideoIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Feather name="video" size={size} color={color} />
);

export const CommentIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Feather name="message-circle" size={size} color={color} />
);

export const LikeIcon = ({ size = 24, color = "black" }: IconProps) => (
  <FontAwesome name="heart-o" size={size} color={color} />
);

export const SendIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Feather name="send" size={size} color={color} />
);

export const HomeIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Entypo name="home" size={size} color={color} />
);

export const SearchIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Feather name="search" size={size} color={color} />
);

export const CreateIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Feather name="plus-square" size={size} color={color} />
);

export const ReelIcon = ({ size = 24, color = "black" }: IconProps) => (
  <MaterialCommunityIcons name="movie-outline" size={size} color={color} />
);

export const UserIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Feather name="user" size={size} color={color} />
);

export const BackIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Ionicons name="chevron-back" size={size} color={color} />
);

export const BellIcon = ({ size = 24, color = "black" }: IconProps) => (
  <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
);

export const MenuIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Feather name="menu" size={size} color={color} />
);

export const PostGridIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Ionicons name="grid-outline" size={size} color={color} />
);

export const VideoIcon = ({ size = 24, color = "black" }: IconProps) => (
  <Ionicons name="videocam-outline" size={size} color={color} />
);
