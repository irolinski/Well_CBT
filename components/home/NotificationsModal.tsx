import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { setShowNotificationModal } from "@/state/features/menus/notificationModalSlice";
import TimePicker from "./TimePicker";

const isNumeric = (string: string) => {
  return /^\d*\s*$/.test(string);
};

const NotificationsModal = () => {
  const windowHeight = Dimensions.get("window").height;

  const notificationModalState = useSelector(
    (state: RootState) => state.notificationModal,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [switchIsActive, setswitchIsActive] = useState(false);

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
          <TimePicker />
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
                Apply
              </Text>
              <Feather
                className="mx-2"
                name="arrow-right"
                size={28}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NotificationsModal;
