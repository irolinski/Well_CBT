import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotificationModal } from "@/state/features/menus/notificationModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import TimePicker from "./TimePicker";

const NotificationsModal = () => {
  const notificationModalState = useSelector(
    (state: RootState) => state.notificationModal,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [switchIsActive, setswitchIsActive] = useState(true);

  return (
    <Modal
      visible={notificationModalState.showModal}
      animationType="slide"
      transparent={true}
    >
      <View className="h-full items-center justify-center">
        {/* Modal body */}
        <View
          className="rounded-xl border bg-white px-8 pt-4"
          style={{
            width: 320,
            height: 380,
            borderColor: "#B8B8B8",
          }}
        >
          {/* Header */}
          <View>
            <View className="absolute right-0 flex-row justify-end">
              <Pressable
                className="z-20"
                onPress={() => {
                  dispatch(setShowNotificationModal(false));
                }}
              >
                <View className="m-1">
                  <MaterialCommunityIcons
                    name="window-close"
                    size={24}
                    color="#B8B8B8"
                  />
                </View>
              </Pressable>
            </View>
            <View
              className="mx-1 flex-row items-center justify-center border-b py-3"
              style={{ borderColor: "#B8B8B8", borderBottomWidth: 0.4 }}
            >
              <View className="mx-1">
                <MaterialCommunityIcons
                  name="bell-plus"
                  size={30}
                  color="#D9D9D9"
                />
              </View>
              <Text className="mx-1 text-lg">Set a reminder?</Text>
            </View>
          </View>
          {/* Body */}
          {/* Enable Notifications */}
          <View className="my-2 flex-row items-center justify-center py-4">
            <Text className="mx-2 text-lg">Enable notifications:</Text>
            <Switch
              className="mx-2"
              value={switchIsActive}
              onValueChange={(val) => setswitchIsActive(val)}
              ios_backgroundColor={"#D9D9D9"}
              trackColor={{ false: "#D9D9D9", true: "#4391BC" }}
            />
          </View>
          {/* TimePicker */}
          <TimePicker
            disabled={!switchIsActive}
            onChange={(time) => console.log(time)}
          />
          <View
            className="absolute bottom-8 flex-row items-center justify-center"
            style={{ width: 320 }}
          >
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-xl"
              style={{
                width: 0.75 * 320,
                height: 50,
                backgroundColor: "#4391BC",
              }}
              onPress={() => {}}
            >
              <Text className="mx-2" style={{ color: "#FFFFFF" }}>
                Save preferences
              </Text>
              <Feather name="save" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NotificationsModal;
