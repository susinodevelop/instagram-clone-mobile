import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ChangeCameraIcon, TakePhotoIcon, RecVideoIcon } from "@/theme/Icons";

const CreationScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    requestPermission();
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePhoto = () => {
    alert("Has sacado una foto"); //TODO terminar
  };

  const takeVideo = () => {
    alert("Has grabado un video");
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={toggleCameraFacing}>
            <ChangeCameraIcon />
          </Pressable>
          <Pressable onPress={takePhoto}>
            <TakePhotoIcon />
          </Pressable>
          <Pressable onPress={takeVideo}>
            <RecVideoIcon />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default CreationScreen;
