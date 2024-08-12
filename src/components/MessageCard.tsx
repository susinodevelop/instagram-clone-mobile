import DirectMessage from "@/interface/DirectMessage";
import User from "@/interface/User";
import { getUser } from "@/services/UserService";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";

interface MessageCardProps {
  message: DirectMessage;
}
const MessageCard = ({ message }: MessageCardProps) => {
  const [actionUser, setActionUser] = useState<User>();

  useEffect(() => {
    getUser(message.action_user_id).then(setActionUser);
  }, []);

  return (
    actionUser && (
      <View style={styles.container}>
        <View style={styles.profileImage}>
          <ProfileImage user={actionUser} />
        </View>
        <View style={styles.data}>
          <Text style={styles.username}>{actionUser.username}</Text>
          <Text style={styles.content}>{message.content}</Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
  },
  profileImage: {
    marginRight: 20,
  },
  data: {
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
  },
  content: {
    color: "gray",
    fontWeight: "400",
  },
});
export default MessageCard;
