import React, { useEffect, useState } from "react";
import { Modal, Pressable, Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { setShowNotificationModal } from "@/state/features/menus/notificationModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import {
  cancelDailyNotification,
  getDailyNotificationTime,
  requestNotificationPermissions,
  scheduleDailyNotification,
} from "@/utils/notifications";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ModalButton from "../NavigationModalButton";
import TimePicker, { TimePickerReturnObj } from "./TimePicker";

const NotificationsModal = () => {
  const notificationModalState = useSelector(
    (state: RootState) => state.notificationModal,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [selectedTime, setSelectedTime] = useState<TimePickerReturnObj>({
    hour: "",
    minute: "",
    meridiem: "PM",
  });
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  const handleSavePreferences = async () => {
    if (enableNotifications) {
      await scheduleDailyNotification(
        Number(selectedTime.hour),
        Number(selectedTime.minute),
        selectedTime.meridiem,
      );
    } else {
      cancelDailyNotification();
    }
    // console.log(await getDailyNotificationTime());
    dispatch(setShowNotificationModal(false));
  };

  useEffect(() => {
    // Check notification permissions on component mount
    const checkPermissions = async () => {
      const isGranted = await requestNotificationPermissions();
      setHasPermission(isGranted);
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    // set default selectedTime state to the time that is currently saved if there is one
    const fetchNotificationTime = async () => {
      const currentNotificationTime = await getDailyNotificationTime();
      if (
        currentNotificationTime?.hour &&
        currentNotificationTime?.minute &&
        currentNotificationTime?.meridiem
      ) {
        setEnableNotifications(true);
        setSelectedTime({
          hour: currentNotificationTime.hour,
          minute: currentNotificationTime.minute,
          meridiem: currentNotificationTime.meridiem,
        });
        // console.log(currentNotificationTime);
      } else {
        setEnableNotifications(false);
      }
    };
    fetchNotificationTime();
  }, []);

  return (
    <Modal
      visible={notificationModalState.showModal}
      animationType="slide"
      transparent={true}
    >
      <View
        className="h-full items-center justify-center"
        style={{ backgroundColor: "rgba(184, 184, 184, 0.5)" }} //b8b8b8
      >
        {/* Modal body */}
        <View
          className="rounded-xl border px-8 pt-4"
          style={{
            width: 320,
            height: 380,
            backgroundColor: Colors.white,
            borderColor: Colors.mainGray,
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
                    color={Colors.mainGray}
                  />
                </View>
              </Pressable>
            </View>
            <View
              className="mx-1 flex-row items-center justify-center border-b py-3"
              style={{ borderColor: Colors.mainGray, borderBottomWidth: 0.4 }}
            >
              <View className="mx-1">
                <MaterialCommunityIcons
                  name="bell-plus"
                  size={30}
                  color={Colors.lightGray}
                />
              </View>
              <Text className="mx-1 text-lg">Set a reminder?</Text>
            </View>
          </View>
          {/* Main */}
          {hasPermission ? (
            <React.Fragment>
              <View className="my-2 flex-row items-center justify-center py-4">
                <Text className="mx-2 text-lg">Enable notifications:</Text>
                <Switch
                  className="mx-2"
                  value={enableNotifications}
                  onValueChange={(val) => setEnableNotifications(val)}
                  ios_backgroundColor={Colors.lightGray}
                  trackColor={{
                    false: Colors.lightGray,
                    true: Colors.darkBlue,
                  }}
                />
              </View>
              {/* TimePicker */}
              <TimePicker
                initialTime={selectedTime && selectedTime}
                disabled={!enableNotifications}
                onChange={(time) => setSelectedTime(time)}
              />
              <View
                className="absolute bottom-8 flex-row items-center justify-center"
                style={{ width: 320 }}
              >
                <ModalButton
                  title="Save preferences"
                  icon={<Feather name="save" size={24} color={Colors.white} />}
                  disabled={
                    selectedTime.minute.length !== 2 ||
                    selectedTime.hour.length !== 2
                  }
                  onPress={async () => {
                    await handleSavePreferences();
                  }}
                />
              </View>
            </React.Fragment>
          ) : (
            <View>
              <View className="my-12 items-center justify-center">
                <MaterialCommunityIcons
                  name="bell-off"
                  size={56}
                  color={Colors.mainGray}
                />
              </View>
              <View className="items-center justify-center">
                <Text className="text-center text-base">
                  {
                    "Notifications disabled. \n \n You can enable them in your device's settings to stay updated."
                  }
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default NotificationsModal;
