import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import notificationContent from "@/assets/text/notifications_daily.json";
import { TimePicker_12hReturnObj } from "@/components/home/TimePicker_12h";
import { TimePicker_24hReturnObj } from "@/components/home/TimePicker_24h";
import { AvailableLanguage, selectedLanguage } from "@/hooks/i18n";
import { numToString_addZero } from "./dates";
import { getTranslation } from "./locales";

// -- time conversion helper functions --

export const convertTo24hFormat = (
  hour: number,
  minute: number,
  meridiem: "AM" | "PM",
) => {
  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  }
  // make exception for midnight
  else if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }
  return { hour: hour, minute: minute };
};

export const convertTo12hFormat = (hour: number, minute: number) => {
  let meridiem: "AM" | "PM";

  if (hour >= 12) {
    meridiem = "PM";
    // condition to make exception for noon
    if (hour > 12) {
      hour -= 12;
    }
  } else {
    meridiem = "AM";
    // condition to make exception for midnight
    if (hour === 0) {
      hour = 12;
    }
  }
  return { hour: hour, minute: minute, meridiem: meridiem };
};

// -- local notification handlers --

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      return false; // permissions not granted
    }
    return true; // permissions granted
  } catch (error) {
    console.error("Error requesting notification permissions:", error);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_permissions"),
    );

    return false;
  }
};

export const scheduleDailyNotification = async (
  hour: number,
  minute: number,
  meridiem?: "AM" | "PM",
) => {
  const notificationMessages =
    notificationContent[selectedLanguage as AvailableLanguage];

  try {
    let notificationTime: { hour: number; minute: number };

    if (meridiem) {
      notificationTime = convertTo24hFormat(hour, minute, meridiem);
    } else {
      notificationTime = { hour: hour, minute: minute };
    }

    // cancel existing notifications to avoid duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationMessages[0].title,
        body: notificationMessages[0].body,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: notificationTime.hour,
        minute: notificationTime.minute,
      },
    });

    // add zeroes to one-digit hours
    let displayedHour: string = numToString_addZero(hour);
    let displayedMinute: string = numToString_addZero(minute);

    Alert.alert(
      getTranslation("alerts.success"),
      `${getTranslation("alerts.notification_success")} \n ${displayedHour}:${displayedMinute} ${meridiem ? meridiem : ""}`,
    );
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.failure"),
      getTranslation("alerts.notification_failure"),
    );
  }
};

export const cancelDailyNotification = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert(
      getTranslation("alerts.success"),
      getTranslation("alerts.notification_cancel"),
    );
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.failure"),
      getTranslation("alerts.notification_failure"),
    );
  }
};

export const getDailyNotificationTime_24h = async (): Promise<
  TimePicker_24hReturnObj | undefined
> => {
  try {
    const scheduledNotifications =
      (await Notifications.getAllScheduledNotificationsAsync()) as any; // asserting any to prevent compiler err - bugs in trigger obj typing

    if (scheduledNotifications[0]) {
      let hour, minute;

      if (Platform.OS === "ios") {
        hour = scheduledNotifications[0].trigger?.dateComponents!.hour;
        minute = scheduledNotifications[0].trigger?.dateComponents!.minute;
      }

      if (Platform.OS === "android") {
        hour = scheduledNotifications[0].trigger?.hour;
        minute = scheduledNotifications[0].trigger?.minute;
      }

      // add zeroes to one-digit hours and turn
      let displayedHour: string = numToString_addZero(hour);
      let displayedMinute: string = numToString_addZero(minute);

      const dailyNotificationTime: TimePicker_24hReturnObj = {
        hour: displayedHour,
        minute: displayedMinute,
      };
      return dailyNotificationTime;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getDailyNotificationTime_12h = async (): Promise<
  TimePicker_12hReturnObj | undefined
> => {
  try {
    const scheduledNotifications =
      (await Notifications.getAllScheduledNotificationsAsync()) as any; // asserting any to prevent compiler err - bugs in trigger obj typing

    if (scheduledNotifications[0]) {
      let hour, minute;

      if (Platform.OS === "ios") {
        hour = scheduledNotifications[0].trigger?.dateComponents!.hour;
        minute = scheduledNotifications[0].trigger?.dateComponents!.minute;
      }

      if (Platform.OS === "android") {
        hour = scheduledNotifications[0].trigger?.hour;
        minute = scheduledNotifications[0].trigger?.minute;
      }

      const convertedTime = convertTo12hFormat(hour, minute);

      // add zeroes to one-digit hours and turn
      let displayedHour: string = numToString_addZero(convertedTime.hour);
      let displayedMinute: string = numToString_addZero(convertedTime.minute);

      const dailyNotificationTime: TimePicker_12hReturnObj = {
        hour: displayedHour,
        minute: displayedMinute,
        meridiem: convertedTime.meridiem && convertedTime.meridiem,
      };
      return dailyNotificationTime;
    }
  } catch (err) {
    console.error(err);
  }
};
