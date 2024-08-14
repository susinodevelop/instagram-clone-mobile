import ReelCard from "@/components/ReelCard";
import Reel from "@/interface/Reel";
import { getAllReels } from "@/services/ReelService";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { FlatList, View, useWindowDimensions } from "react-native";

const COUNT_LIKES = 10; //TODO mostrar dinamico
const COUNT_COMMENTS = 10; //TODO mostrar dinamico

interface ReelData {
  item: Reel;
}

const ReelsScreen: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const { width, height: originalHeight } = useWindowDimensions();

  const height = originalHeight - useBottomTabBarHeight();

  useEffect(() => {
    getAllReels().then(setReels);
  }, []);

  const renderItem = ({ item }: ReelData) => (
    <View style={{ width, height }}>
      <ReelCard reel={item} likes={COUNT_LIKES} comments={COUNT_COMMENTS} />
    </View>
  );

  return (
    reels &&
    reels.length > 0 && (
      <FlatList
        data={reels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={true}
        style={{ width, height: height * reels.length }}
      />
    )
  );
};

export default ReelsScreen;
