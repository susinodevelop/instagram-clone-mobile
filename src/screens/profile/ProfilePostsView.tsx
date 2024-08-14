import { AppContext } from "@/context/AppContext";
import Post from "@/interface/Post";
import { getUserPosts } from "@/services/UserService";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, useWindowDimensions } from "react-native";

interface PostFlatList {
  item: Post;
}

interface ProfilePostsViewProps {
  posts: Post[];
}

const ProfilePostsView = () => {
  const { width } = Dimensions.get("window");
  const { state, dispatch } = useContext(AppContext);
  //TODO pasar a través de las properties
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(state.userId).then(setPosts);
  }, []);

  return (
    <FlatList
      numColumns={3}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }: PostFlatList) => {
        const imageSize = width/3;
        return (
          <Image
            source={{ uri: item.url }}
            style={{ width: imageSize, height: imageSize }}
          />
        );
      }}
    />
  );
};
export default ProfilePostsView;
