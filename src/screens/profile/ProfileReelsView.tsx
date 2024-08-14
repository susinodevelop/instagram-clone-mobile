import ReelCard from "@/components/ReelCard";
import { AppContext } from "@/context/AppContext";
import Reel from "@/interface/Reel";
import { getUserReels } from "@/services/UserService";
import { ResizeMode, Video } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
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

  useEffect(() => {
    getUserReels(state.userId).then(setReels);
  }, []);

  return (
    <FlatList
      numColumns={4}
      data={reels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }: ReelFlatList) => {
        const reelWidth = width / 4;
        return (
          <Video
            source={{ uri: item.url }}
            rate={1.0}
            volume={1.0}
            shouldPlay={false}
            resizeMode={ResizeMode.STRETCH}
            style={{ ...styles.video, width: reelWidth, height: 2 * reelWidth }}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: 100,
    height: 100,
  },
});

export default ProfileReelsView;
