import React, { useContext, useEffect, useState } from "react";
import DirectMessage from "@/interface/DirectMessage";
import { useNavigation } from "@react-navigation/native";
import { Text, useColorScheme, View } from "react-native";
import {
  Directions,
  FlatList,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { getUserMessages } from "@/services/UserService";
import { AppContext } from "@/context/AppContext";
import MessageCard from "@/components/MessageCard";

interface MessagesFlatList {
  item: DirectMessage;
}

const MessageScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [messages, setMessages] = useState<DirectMessage[]>([]);

  useEffect(() => {
    getUserMessages(state.userId).then(setMessages);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: MessagesFlatList) => (
          <MessageCard message={item} />
        )}
      />
    </View>
  );
};

export default MessageScreen;
