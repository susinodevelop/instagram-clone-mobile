import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { getAllPosts } from "@/services/PostService";
import Post from "@/interface/Post";
import PostCard from "@/components/PostCard";
import StoriesCarrousel from "@/components/StoriesCarrousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FeedScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getAllPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <SafeAreaView
      style={[
        style.mainView,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          paddingLeft: insets.left,
        },
      ]}
    >
      <ScrollView>
        <StoriesCarrousel />
        {posts &&
          posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
      </ScrollView>
    </SafeAreaView>
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
