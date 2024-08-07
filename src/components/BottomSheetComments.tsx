import React, { useImperativeHandle, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Text } from "react-native";
interface BottomSheetCommentsProps {
  ref: React.RefObject<BottomSheet>;
}
const BottomSheetComments = React.forwardRef(
  ({ ref }: BottomSheetCommentsProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = (index: number) => {
      console.log("handleSheetChanges", index);
    };

    useImperativeHandle(ref, () => ({
      snapToIndex: (index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
      //TODO establecer comportamiento para estos metodos
      snapToPosition: () => {},
      expand: () => {},
      collapse: () => {},
      forceClose: () => {},
    }));

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["1%, 70%", "90%"]}
        onChange={handleSheetChanges}
        index={-1}
      >
        <BottomSheetView style={style.bottomSheetContent}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const style = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomSheetComments;
