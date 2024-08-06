import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import User from "@/interface/User";
import { getAllUsers, getUser } from "@/services/UserService";
import ProfileImage from "./ProfileImage";

const PROFILE_IMAGE_DIMENSIONS = 70;

const StoriesCarrousel = () => {
  const [loggedUser, setLoggedUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUser(1).then(setLoggedUser);
    getAllUsers().then(setUsers);
  }, []);

  return (
    <View style={styles.storiesContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {users.map((user) => (
          <View key={user.id} style={styles.profileImageContainer}>
            <ProfileImage
              user={user}
              width={PROFILE_IMAGE_DIMENSIONS}
              height={PROFILE_IMAGE_DIMENSIONS}
            />
            {loggedUser && loggedUser.id === user.id ? (
              <Text>Tu historia</Text>
            ) : (
              <Text>{user.username}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  profileImageContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "space-around"
  },
});

export default StoriesCarrousel;
