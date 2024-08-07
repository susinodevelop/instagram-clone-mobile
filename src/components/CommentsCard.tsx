import React, { RefObject, useEffect, useState } from "react";
import User from "@/interface/User";
import { getPostComments } from "@/services/PostService";
import { getUser } from "@/services/UserService";
import Post from "@/interface/Post";
import Comment from "@/interface/Comment";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import CommentCard from "./CommentCard";
import { timeAgoDate } from "@/utils/DateUtils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

interface CommentsCardProps {
  visibleComments: number;
  post: Post;
  bottomSheetCommentsRef:  React.RefObject<BottomSheet>
}

const CommentsCard = ({
  visibleComments,
  post,
  bottomSheetCommentsRef,
}: CommentsCardProps) => {
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
      {comments && (
        <View style={style.commentsContainer}>
          {comments.length > 2 ? (
            <View>
              <Pressable
                onPress={() => {
                  bottomSheetCommentsRef.current?.snapToIndex(1);
                }}
              >
                <CommentCard comment={comments[comments.length - 1]} />
                <Text>Ver los {comments.length} comentarios</Text>
              </Pressable>
            </View>
          ) : (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          )}
        </View>
      )}
      <View style={style.timeAgoContainer}>
        <Text>{timeAgoDate(post.created_at)}</Text>
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
    marginTop: 10,
    marginBottom: 5,
  },
  owner: {
    fontWeight: "bold",
  },
  commentsContainer: {
    marginBottom: 10,
  },
  timeAgoContainer: {},
});

export default CommentsCard;
