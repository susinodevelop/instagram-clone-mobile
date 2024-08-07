import React from "react";
import { StyleSheet, Text, View } from "react-native";


const CreationScreen = () => {
  
  return (
    <View style={styles.container}>
     <Text>Soy la pantalla de creacion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default CreationScreen;
