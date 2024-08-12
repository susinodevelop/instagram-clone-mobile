import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
import Reel from "@/interface/Reel";
import User from "@/interface/User";
import { getUser } from "@/services/UserService";
import ProfileImageWithStories from "./ProfileImageWithStories";
import { CommentIcon, LikeIcon, SendIcon } from "@/theme/Icons";

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
        isMuted={true}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.STRETCH}
        style={styles.video}
      />
      <View style={styles.overlay}>
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
              <LikeIcon color="white" />
              <Text style={styles.iconText}>{likes}</Text>
            </View>
            <View style={styles.iconWithText}>
              <CommentIcon color="white" />
              <Text style={styles.iconText}>{comments}</Text>
            </View>
            <SendIcon color="white" />
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
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    justifyContent: "space-between",
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
  },
  iconsContainer: {
    alignItems: "flex-end",
    marginRight: 20,
    marginVertical: 20,
  },
  iconWithText: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconText: {
    color: "white",
  },
  notAvailable: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReelCard;
