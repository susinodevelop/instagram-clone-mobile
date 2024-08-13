import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getAllPosts } from "@/services/PostService";
import Post from "@/interface/Post";
import PostCard from "@/components/PostCard";
import StoriesCarrousel from "@/components/StoriesCarrousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const FeedScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <View style={style.mainView}>
      <ScrollView>
        <StoriesCarrousel />
        {posts &&
          posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default FeedScreen;
