import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Image, Text, View } from "react-native";
import { ChangeCameraIcon, TakePhotoIcon, RecVideoIcon } from "@/theme/Icons";
import * as FileSystem from "expo-file-system";

const CreationScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [videoUri, setVideoUri] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(
    undefined
  );

  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  // Solicitar permisos de cámara en el montaje
  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        await requestPermission();
      }
      await requestMicrophonePermission();
    })();
  }, [permission]);

  // Guardar el video cuando la grabación se detiene
  useEffect(() => {
    if (!recording && videoUri) {
      saveVideo();
    }
  }, [recording]);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePhoto = async () => {
    alert("Has sacado una foto"); // TODO: Implementar
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
    }
  };

  const startRecordingVideo = async () => {
    if (cameraRef.current) {
      const video = await cameraRef.current.recordAsync();
      setVideoUri(video!.uri);
      setRecording(true);
    }
  };

  const endRecordingVideo = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setRecording(false);
    }
  };

  const saveVideo = async () => {
    if (videoUri) {
      const newUri = `${FileSystem.documentDirectory}videos/${Date.now()}.mp4`;
      try {
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}videos`,
          {
            intermediates: true,
          }
        );
        await FileSystem.moveAsync({
          from: videoUri,
          to: newUri,
        });
        setVideoUri(newUri); // Actualiza la URI al nuevo destino
        console.log("Video saved to:", newUri);
      } catch (error) {
        console.error("Error saving video:", error);
      }
    }
  };

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          {recording && <View style={styles.recordingIndicator} />}
          <Pressable onPress={toggleCameraFacing} style={styles.button}>
            <ChangeCameraIcon size={30} />
          </Pressable>
          <Pressable onPress={takePhoto} style={styles.button}>
            <TakePhotoIcon size={30} />
          </Pressable>
          <Pressable
            onTouchStart={startRecordingVideo}
            onTouchEnd={endRecordingVideo}
            style={styles.button}
          >
            <RecVideoIcon size={30} />
          </Pressable>
        </View>
      </CameraView>
      {/* {videoUri && (
        <View style={styles.videoContainer}>
          <Text>Video saved at: {videoUri}</Text>
          <Video
            source={{ uri: videoUri }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            shouldPlay
            isLooping
            resizeMode={ResizeMode.STRETCH}
            style={styles.video}
          />
        </View>
      )} */}
      {photo && (
        <Image
          source={{ uri: photo!.uri.toString() }}
          width={500}
          height={500}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  recordingIndicator: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "red",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 15,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
});

export default CreationScreen;
