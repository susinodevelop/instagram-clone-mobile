import React, { useEffect, useState } from "react";
import User from "@/interface/User";
import { getPostComments } from "@/services/PostService";
import { getUser } from "@/services/UserService";
import Post from "@/interface/Post";
import Comment from "@/interface/Comment";
import { View, StyleSheet } from "react-native";
import CommentCard from "./CommentCard";

interface CommentsCardProps {
  visibleComments: number;
  post: Post;
}

const CommentsCard = ({ visibleComments, post }: CommentsCardProps) => {
  const [owner, setOwner] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getUser(post.user_owner_id).then((user) => setOwner(user));
    getPostComments(post.id).then((comments) => setComments(comments));
  }, [post]);

  return owner ? (
    <View style={style.commentsView}>
      <View style={style.descriptionView}>
        <CommentCard userId={owner.id} comment={post.description} />
      </View>
      <View>
        {comments &&
          Array.isArray(comments) &&
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </View>
    </View>
  ) : (
    <></>
  );
};

const style = StyleSheet.create({
  commentsView: {
    paddingHorizontal: 20,
  },
  descriptionView: {
    paddingVertical: 20,
  },
});

export default CommentsCard;
