import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ResizeMode, Video } from "expo-av";
import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Reel from "@/interface/Reel";
import User from "@/interface/User";
import { getUser } from "@/services/UserService";
import {
  APP_MENU_NAVIGATION_HEADER_HEIGHT,
  APP_MENU_NAVIGATION_HEIGHT,
} from "@/constants/DimensionConstants";
import ProfileImageWithStories from "./ProfileImageWithStories";

const { width, height } = Dimensions.get("window");

const availableHeight =
  height - APP_MENU_NAVIGATION_HEADER_HEIGHT - APP_MENU_NAVIGATION_HEIGHT;

const aspectRatio = width / availableHeight;

interface ReelProps {
  reel: Reel;
  likes: number;
  comments: number;
}

const ReelCard: React.FC<ReelProps> = ({ reel, likes, comments }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(reel.user_owner_id).then(setUser);
  }, [reel.user_owner_id]);

  return reel && user ? (
    <View style={styles.container}>
      <Video
        source={{ uri: reel.url }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.STRETCH}
        style={styles.video}
      />
      <View style={[styles.overlay]}>
        <View style={styles.profileContainer}>
          <View style={{ marginRight: 15 }}>
            <ProfileImageWithStories user={user} />
          </View>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.followButton}>Follow</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.iconsContainer}>
            <View style={styles.iconWithText}>
              <FontAwesome name="heart" size={24} color="white" />
              <Text style={styles.iconText}>{likes}</Text>
            </View>
            <View style={styles.iconWithText}>
              <Feather name="message-circle" size={24} color="white" />
              <Text style={styles.iconText}>{comments}</Text>
            </View>
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </View>
        </View>
      </View>
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
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio,
  },
  video: {
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    aspectRatio,
  },
  overlay: {
    justifyContent: "space-between",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "white",
    fontWeight: "bold",
  },
  followButton: {
    color: "white",
    width: "100%",
    marginLeft: 10,
  },
  footer: {
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  iconsContainer: {
    alignItems: "flex-end",
  },
  iconWithText: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconText: {
    color: "white",
  },
  notAvailable: {
    width: width,
    height: availableHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReelCard;
