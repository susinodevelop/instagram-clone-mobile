import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import User from "@/interface/User";
import { getUser, getUserPosts, getUserStories } from "@/services/UserService";
import {
  APP_MENU_NAVIGATION_HEADER_HEIGHT,
  APP_MENU_NAVIGATION_HEIGHT,
} from "@/constants/DimensionConstants";
import Post from "@/interface/Post";
import { FOLLOWERS, FOLLOWING } from "@/constants/UserConstants";
import Story from "@/interface/Story";
import { AppContext } from "@/context/AppContext";

const { width, height } = Dimensions.get("window");
const availableHeight =
  height - APP_MENU_NAVIGATION_HEADER_HEIGHT - APP_MENU_NAVIGATION_HEIGHT;

interface HighlightFlatList {
  item: Story;
}

interface PostFlatList {
  item: Post;
}

const ProfileScreen: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [highlights, setHighlights] = useState<Story[]>([]);

  useEffect(() => {
    getUser(state.userId).then(setUser);
    getUserPosts(state.userId).then(setPosts);
    getUserStories(state.userId).then(setHighlights);
  }, []);

  const isDataLoaded = () => user && posts && posts.length > 0;

  return isDataLoaded() ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={styles.username}>{user!.username}</Text>
        <View style={styles.headerIcons}>
          <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
          <Feather name="plus-square" size={24} color="black" />
          <Feather name="menu" size={24} color="black" />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Image
          source={{ uri: user!.profile_img }}
          style={styles.profileImage}
        />
        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={styles.statsNumber}>{posts.length}</Text>
            <Text>publicaciones</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statsNumber}>{FOLLOWERS}</Text>
            <Text>seguidores</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statsNumber}>{FOLLOWING}</Text>
            <Text>siguiendo</Text>
          </View>
        </View>
      </View>

      <Text style={styles.fullName}>{user?.biography_name}</Text>
      <Text style={styles.bio}>{user?.biography_content}</Text>
      <Text style={styles.website}>{user?.biography_url}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Compartir perfil</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={highlights}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: HighlightFlatList) => (
          <View style={styles.highlight}>
            <Image
              source={{ uri: item.miniature_url }}
              style={styles.highlightImage}
            />
            <Text style={styles.highlightText}>{item.title}</Text>
          </View>
        )}
        style={styles.highlightsContainer}
      />

      <View style={styles.tabContainer}>
        <Ionicons name="grid-outline" size={24} color="black" />
        <Ionicons name="videocam-outline" size={24} color="black" />
        <Feather name="user" size={24} color="black" />
      </View>

      <FlatList
        numColumns={3}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: PostFlatList) => (
          <Image source={{ uri: item.url }} style={styles.postImage} />
        )}
      />
    </View>
  ) : (
    <View style={styles.notAvailable}>
      <Text>No se ha podido cargar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerIcons: {
    flexDirection: "row",
  },
  profileInfo: {
    flexDirection: "row",
    padding: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#d62976",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
  },
  stats: {
    alignItems: "center",
  },
  statsNumber: {
    fontWeight: "bold",
    fontSize: 18,
  },
  fullName: {
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  bio: {
    paddingHorizontal: 10,
  },
  website: {
    paddingHorizontal: 10,
    color: "blue",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  highlightsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  highlight: {
    alignItems: "center",
    marginRight: 10,
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  highlightText: {
    fontSize: 12,
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  postImage: {
    width: width / 3,
    height: width / 3,
  },
  notAvailable: {
    width,
    height: availableHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
