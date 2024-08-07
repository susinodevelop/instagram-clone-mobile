import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { getAllPosts } from "@/services/PostService";
import Post from "@/interface/Post";
import PostCard from "@/components/PostCard";
import StoriesCarrousel from "@/components/StoriesCarrousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheetComments from "@/components/BottomSheetComments";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

const HomeScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getAllPosts().then(setPosts);
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
      <GestureHandlerRootView>
        <ScrollView>
          <StoriesCarrousel />
          {posts &&
            posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  bottomSheetCommentsRef={bottomSheetRef}
                />
              );
            })}
        </ScrollView>
        <BottomSheetComments ref={bottomSheetRef}/>
      </GestureHandlerRootView>
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

export default HomeScreen;
