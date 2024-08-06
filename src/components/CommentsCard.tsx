import React, { useEffect, useState } from "react";
import User from "@/interface/User";
import { getPostComments } from "@/services/PostService";
import { getUser } from "@/services/UserService";
import Post from "@/interface/Post";
import Comment from "@/interface/Comment";
import { View, StyleSheet, Text } from "react-native";
import CommentCard from "./CommentCard";

interface CommentsCardProps {
  visibleComments: number;
  post: Post;
}

const CommentsCard = ({ visibleComments, post }: CommentsCardProps) => {
  const [owner, setOwner] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getUser(post.user_owner_id).then(setOwner);
    getPostComments(post.id).then(setComments);
  }, [post]);

  return owner ? (
    <View style={style.commentsView}>
      <View style={style.descriptionView}>
        <Text>
          <Text style={style.owner}>{`${owner.username} `}</Text>
          {post.description}
        </Text>
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
    flexDirection: "row",
    paddingVertical: 20,
  },
  owner: {
    fontWeight: "bold",
  },
});

export default CommentsCard;
