import React, { useEffect, useState } from "react";
import Post from "@/interface/Post";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import User from "@/interface/User";
import { getUser } from "@/services/UserService";
import ProfileImageCard from "./ProfileImageCard";
import CommentsCard from "./CommentsCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const insets = useSafeAreaInsets();
  const [owner, setOwner] = useState<User>();

  useEffect(() => {
    getUser(post.user_owner_id).then(setOwner);
  }, []);

  const { width: screenWidth } = useWindowDimensions();
  const safeWidth = screenWidth - (insets.left + insets.right);
  const safeHeight = screenWidth;

  return owner ? (
    <View style={style.container}>
      <ProfileImageCard user={owner} />
      <Image
        source={{ uri: `${post.url}` }}
        width={safeWidth}
        height={safeHeight}
      />
      <View style={style.actionsContainer}>
        <FontAwesome
          name="heart-o"
          size={24}
          color="black"
          style={style.icon}
        />
        <MaterialCommunityIcons
          name="comment-outline"
          size={24}
          color="black"
          style={style.icon}
        />
        <Feather name="send" size={24} color="black" style={style.icon} />
      </View>
      <CommentsCard visibleComments={3} post={post} />
    </View>
  ) : (
    <></>
  );
};

export default PostCard;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  profileImage: {},
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});
