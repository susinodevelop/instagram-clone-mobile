import Post from "@/interface/Post";
import { getAllPosts } from "@/services/PostService";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";

const HEADER_HEIGHT = 100;
// interface PostScreenProps {
//   post: Post;
// }

//TODO pasar el post por propiedades
const PostScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({
        title: "Posts",
        headerStyle: {
          height: HEADER_HEIGHT,
        },
      });
    }, [navigation]);

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    getAllPosts().then((allPosts) => setPost(allPosts[0]));
  },[]);

  const { width } = Dimensions.get("window");
  return (
    post && <Image source={{ uri: post.url }} width={width} height={width} />
  );
};

export default PostScreen;
