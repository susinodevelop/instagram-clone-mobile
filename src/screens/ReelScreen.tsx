import ReelCard from "@/components/ReelCard";
import Reel from "@/interface/Reel";
import { getAllReels } from "@/services/ReelService";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";

const COUNT_LIKES = 10; //TODO mostrar dinamico
const COUNT_COMMENTS = 10; //TODO mostrar dinamico

const { width, height } = Dimensions.get("window");

interface ReelData {
  item: Reel;
}

const ReelScreen: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);

  useEffect(() => {
    getAllReels().then(setReels);
  }, []);

  const renderItem = ({ item }: ReelData) => (
    <ReelCard reel={item} likes={COUNT_LIKES} comments={COUNT_COMMENTS} />
  );

  return (
    <FlatList
      data={reels}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ReelScreen;
