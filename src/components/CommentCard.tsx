import React, { useEffect, useState } from "react";
import User from "@/interface/User";
import { StyleSheet, Text, View } from "react-native";
import { getUser } from "@/services/UserService";
import Comment from "@/interface/Comment";
import { timeAgo } from "@/utils/DateUtils";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(comment.user_owner_id).then((user) => setUser(user));
  }, []);

  return user ? (
    <View style={style.container}>
      <Text style={style.username}> {user.username} </Text>
      <Text style={style.comment}> {comment.content} </Text>
      <Text style={style.created_at}>{timeAgo(comment.created_at)}</Text>
    </View>
  ) : (
    <></>
  );
};

export default CommentCard;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  username: {
    fontWeight: "bold",
  },
  comment: {
    color: "black"
  },
  created_at: {
    color: "gray",
    fontWeight: "300"
  }
});
