import React from "react";
import { Modal, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setShowNavigateSettingsModal } from "@/state/features/menus/navigateSettingsModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import Text from "../global/Text";

const UserSettingsModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userSettingsModalState = useSelector(
    (state: RootState) => state.navigateSettingsModal,
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={userSettingsModalState.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(setShowNavigateSettingsModal(false));
        }}
      >
        <View className="h-full w-full items-center justify-center">
          <Text>Hello world</Text>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default UserSettingsModal;
