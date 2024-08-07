import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import Post from "@/interface/Post";
import Comment from "@/interface/Comment";
import { getPostComments } from "@/services/PostService";
import CommentCard from "./CommentCard";

interface AllCommentsModalProps {
  post: Post;
}

const AllCommentsModal = ({ post }: AllCommentsModalProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPostComments(post.id).then(setComments);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Posts</Text>
      </View>

      <ScrollView style={styles.commentsContainer}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <CommentCard comment={comment} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.addCommentContainer}>
        <View style={styles.reactionIcons}>
          <Text style={styles.reactionIcon}>❤️</Text>
          <Text style={styles.reactionIcon}>👏</Text>
          <Text style={styles.reactionIcon}>🔥</Text>
          <Text style={styles.reactionIcon}>👏</Text>
          <Text style={styles.reactionIcon}>😢</Text>
          <Text style={styles.reactionIcon}>😍</Text>
          <Text style={styles.reactionIcon}>😮</Text>
          <Text style={styles.reactionIcon}>😂</Text>
        </View>
        <View style={styles.addCommentInputContainer}>
          <Image
            source={{ uri: "https://example.com/your-profile-image.jpg" }}
            style={styles.profileImage}
          />
          <TextInput
            style={styles.addCommentInput}
            placeholder="Add a comment..."
          />
          <MaterialCommunityIcons name="sticker-emoji" size={24} color="gray" />
        </View>
      </View>
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
    alignItems: "center",
    padding: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  commentsContainer: {
    paddingHorizontal: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentHeader: {
    flexDirection: "row",
  },
  username: {
    fontWeight: "bold",
  },
  commentText: {
    marginVertical: 5,
  },
  commentActions: {
    flexDirection: "row",
  },
  commentAction: {
    marginRight: 15,
    color: "gray",
  },
  viewReplies: {
    color: "gray",
    marginTop: 5,
  },
  likeIcon: {
    marginLeft: 10,
  },
  addCommentContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    padding: 10,
  },
  reactionIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  reactionIcon: {
    fontSize: 24,
  },
  addCommentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addCommentInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
  },
});

export default AllCommentsModal;
