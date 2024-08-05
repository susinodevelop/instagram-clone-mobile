import React, { useEffect, useState } from "react";
import Post from "@/interface/Post";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import User from "@/interface/User";
import { getUser } from "@/services/UserService";
import ProfileImageCard from "./ProfileImageCard";
import CommentsCard from "./CommentsCard";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [owner, setOwner] = useState<User>();

  useEffect(() => {
    getUser(post.user_owner_id).then((owner) => setOwner(owner));
  }, []);

  const { width: screenWidth } = Dimensions.get("window");
  const safeWidth = screenWidth;
  const safeHeight = screenWidth;

  return owner ? (
    <View style={style.container}>
      <ProfileImageCard user={owner} />
      <Image
        source={{ uri: `${post.url}` }}
        width={safeWidth}
        height={safeHeight}
      />
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
});
