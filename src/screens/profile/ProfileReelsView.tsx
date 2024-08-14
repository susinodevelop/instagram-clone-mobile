import ReelCard from "@/components/ReelCard";
import Navigation from "@/constants/NavigationConstants";
import { AppContext } from "@/context/AppContext";
import Reel from "@/interface/Reel";
import { getUserReels } from "@/services/UserService";
import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

//TODO terminar
interface ReelFlatList {
  item: Reel;
}

interface ProfileReelsViewProps {
  reels: Reel[];
}

const ProfileReelsView = () => {
  const { width } = Dimensions.get("window");
  const { state, dispatch } = useContext(AppContext);
  //TODO pasar a través de las properties
  const [reels, setReels] = useState<Reel[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUserReels(state.userId).then(setReels);
  }, []);
  //TODO revisar el as never en el navigation del pressable
  return (
    <FlatList
      numColumns={4}
      data={reels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }: ReelFlatList) => {
        const reelWidth = width / 4;
        return (
          <Pressable
            onPress={() => {
              navigation.navigate(Navigation.ReelScreen as never);
            }}
          >
            <Video
              source={{ uri: item.url }}
              rate={1.0}
              volume={1.0}
              shouldPlay={false}
              resizeMode={ResizeMode.STRETCH}
              style={{ width: reelWidth, height: 2 * reelWidth }}
            />
          </Pressable>
        );
      }}
    />
  );
};

export default ProfileReelsView;
