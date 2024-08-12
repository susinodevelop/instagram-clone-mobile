import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

const MessageScreen = () => {
  const navigation = useNavigation();

  const fling = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      //TODO revisar el evento y la animacion de transicion
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    });
  return (
    <GestureDetector gesture={fling}>
      <View style={{flex: 1}}>
        <Text>Soy la pantalla de mensaje</Text>
      </View>
    </GestureDetector>
  );
};

export default MessageScreen;
