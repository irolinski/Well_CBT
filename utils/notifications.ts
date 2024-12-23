import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export const convertTo24hFormat = (
  hour: number,
  minute: number,
  meridiem: "AM" | "PM",
) => {
  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  } else if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }
  return { hour: hour, minute: minute };
};

export const getPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "You have decided to deny this app the permission to send you notifications. \n You can change it later in your device's settings.",
    );
  }
};

export const scheduleDailyNotification = async (
  hour: number,
  minute: number,
  meridiem?: "AM" | "PM",
) => {
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
        title: "Daily Reminder",
        body: "Hey! It's time. Check your app now!",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: notificationTime.hour,
        minute: notificationTime.minute,
      },
    });

    alert("Daily notification scheduled for 7 PM!");
  } catch (err) {
    console.error(err);
  }
};

export const getScheduledNotifications = async () => {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  console.log("Scheduled Notifications:", notifications);
  //   return notifications;
};
