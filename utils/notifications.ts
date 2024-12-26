import { TimePickerReturnObj } from "@/components/home/TimePicker";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export const convertTo24hFormat = (
  hour: number,
  minute: number,
  meridiem: "AM" | "PM",
) => {
  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  }
  //make exception for midnight
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

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You have denied this app the permission to send you notifications.\n\n You can change it later in your device's settings.",
      );
      return false; // permissions not granted
    }
    return true; // permissions granted
  } catch (error) {
    console.error("Error requesting notification permissions:", error);
    return false;
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

    alert(
      `Daily notification scheduled for \n ${hour} : ${minute} ${meridiem}.`,
    );
  } catch (err) {
    console.error(err);
  }
};

export const cancelDailyNotification = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (err) {
    console.error(err);
  }
};

export const getDailyNotificationTime = async () => {
  const scheduledNotifications =
    // casting as any to prevent compiler from shouting because of bugs in trigger object typing
    (await Notifications.getAllScheduledNotificationsAsync()) as any;

  if (!scheduledNotifications[0]) {
    Alert.alert(
      "Error while trying to access planned notifications. Try again or contact support.",
    );
  } else {
    const { hour, minute } = scheduledNotifications[0].trigger?.dateComponents!;
    const convertedTime = convertTo12hFormat(hour, minute);

    const dailyNotificationTime: TimePickerReturnObj = {
      hour: String(convertedTime.hour),
      minute: String(convertedTime.minute),
      meridiem: convertedTime.meridiem,
    };
    return dailyNotificationTime;
  }
};
