import React from "react";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import User from "@/interface/User";
import { getAllUsers } from "@/services/UserService";
import ProfileImage from "./ProfileImage";

const StoriesCarrousel = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <View style={style.storiesContainer}>
      <ScrollView horizontal={true}>
        {users &&
          Array.isArray(users) &&
          users.map((user) => <ProfileImage key={user.id} user={user} />)}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  storiesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default StoriesCarrousel;
