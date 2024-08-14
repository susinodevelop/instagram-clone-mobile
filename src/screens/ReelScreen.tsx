import Reel from "@/interface/Reel";
import { getReel } from "@/services/ReelService";
import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const HEADER_HEIGHT = 100;
// interface ReelScreenProps {
//   reel: Reel;
// }

//TODO pasar el reel por propiedades
const ReelScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Reels",
      headerStyle: {
        height: HEADER_HEIGHT,
      },
    });
  }, [navigation]);

  const [reel, setReel] = useState<Reel>();

  useEffect(() => {
    getReel(1).then(setReel);
  }, []);

  const { width, height } = Dimensions.get("window");

  return (
    reel && (
      <Video
        source={{ uri: reel.url }}
        rate={1.0}
        volume={1.0}
        shouldPlay={false}
        resizeMode={ResizeMode.STRETCH}
        style={{ width, height: height - HEADER_HEIGHT }}
      />
    )
  );
};

export default ReelScreen;
