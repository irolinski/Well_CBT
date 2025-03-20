import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { currentLocaleUses12hClock, selectedLanguage } from "@/hooks/i18n";
import { setShowNotificationModal } from "@/state/features/menus/notificationModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import {
  cancelDailyNotification,
  getDailyNotificationTime_12h,
  getDailyNotificationTime_24h,
  requestNotificationPermissions,
  scheduleDailyNotification,
} from "@/utils/notifications";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ModalButton from "../NavigationModalButton";
import TimePicker_12h, { TimePicker_12hReturnObj } from "./TimePicker_12h";
import TimePicker_24h, { TimePicker_24hReturnObj } from "./TimePicker_24h";

const NotificationsModal = () => {
  const { t } = useTranslation(["home", "common"]);

  const notificationModalState = useSelector(
    (state: RootState) => state.notificationModal,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [selectedTime, setSelectedTime] = useState<
    TimePicker_12hReturnObj | TimePicker_24hReturnObj
  >();
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  // set default selectedTime state to the time that is currently saved if there is one
  const fetchNotificationTime = async () => {
    let currentNotificationTime;

    // if lang is en => 12h system
    if (currentLocaleUses12hClock()) {
      currentNotificationTime = await getDailyNotificationTime_12h();
      if (
        currentNotificationTime?.hour &&
        currentNotificationTime?.minute &&
        currentNotificationTime?.meridiem
      ) {
        setEnableNotifications(true);
        setSelectedTime(currentNotificationTime);
      } else {
        setEnableNotifications(false);
      }

      // if lang isn't en => 24h system
    } else {
      currentNotificationTime = await getDailyNotificationTime_24h();
      if (currentNotificationTime?.hour && currentNotificationTime?.minute) {
        setEnableNotifications(true);
        setSelectedTime(currentNotificationTime);
      } else {
        setEnableNotifications(false);
      }
    }
  };

  const handleSavePreferences = async () => {
    if (selectedTime) {
      if (enableNotifications) {
        if ("meridiem" in selectedTime && currentLocaleUses12hClock()) {
          await scheduleDailyNotification(
            Number(selectedTime.hour),
            Number(selectedTime.minute),
            selectedTime.meridiem,
          );
        } else {
          await scheduleDailyNotification(
            Number(selectedTime.hour),
            Number(selectedTime.minute),
          );
        }
      } else {
        cancelDailyNotification();
      }
      dispatch(setShowNotificationModal(false));
    }
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
              <Text className="mx-1 text-lg">
                {t("modals.notifications.title")}
              </Text>
            </View>
          </View>
          {/* Main */}
          {hasPermission ? (
            <React.Fragment>
              <View className="my-2 flex-row items-center justify-center py-4">
                <Text className="mx-2 text-lg">
                  {t("modals.notifications.enable_notifications")}
                </Text>
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
              {currentLocaleUses12hClock() ? (
                <TimePicker_12h
                  initialTime={
                    selectedTime && "meridiem" in selectedTime
                      ? selectedTime
                      : { hour: "", minute: "", meridiem: "PM" }
                  }
                  disabled={!enableNotifications}
                  onChange={(time) => setSelectedTime(time)}
                />
              ) : (
                <TimePicker_24h
                  initialTime={selectedTime && selectedTime}
                  disabled={!enableNotifications}
                  onChange={(time) => setSelectedTime(time)}
                />
              )}

              <View
                className="absolute bottom-8 flex-row items-center justify-center"
                style={{ width: 320 }}
              >
                <ModalButton
                  title={t("buttons.save_preferences", { ns: "common" })}
                  icon={<Feather name="save" size={24} color={Colors.white} />}
                  disabled={
                    !selectedTime ||
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
