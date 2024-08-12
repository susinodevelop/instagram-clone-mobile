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
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  const fling = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      //TODO revisar el evento y la animacion de transicion
      navigation.navigate("Messages" as never);
    });

  return (
    <GestureDetector gesture={fling}>
      <View
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
      </View>
    </GestureDetector>
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
