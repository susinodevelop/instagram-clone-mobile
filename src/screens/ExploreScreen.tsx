import Post from "@/interface/Post";
import { getAllPosts } from "@/services/PostService";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TextInput, View } from "react-native";

interface PostFlatListProps {
  item: Post;
}

const ExploreScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  const renderItem = ({ item }: PostFlatListProps) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  list: {
    paddingHorizontal: 2,
  },
  imageContainer: {
    flex: 1,
    padding: 2,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
});

export default ExploreScreen;
