import Navigation from "@/constants/NavigationConstants";
import { AppContext } from "@/context/AppContext";
import Post from "@/interface/Post";
import { getUserPosts } from "@/services/UserService";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";

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
  const navigation = useNavigation();

  useEffect(() => {
    getUserPosts(state.userId).then(setPosts);
  }, []);
  //TODO revisar el as never en el navigation del pressable
  return (
    <FlatList
      numColumns={3}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }: PostFlatList) => {
        const imageSize = width / 3;
        return (
          <Pressable
            onPress={() => {
              navigation.navigate(Navigation.PostScreen as never);
            }}
          >
            <Image
              source={{ uri: item.url }}
              style={{ width: imageSize, height: imageSize }}
            />
          </Pressable>
        );
      }}
    />
  );
};
export default ProfilePostsView;
