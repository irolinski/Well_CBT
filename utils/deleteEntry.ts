import { router } from "expo-router";
import { Alert } from "react-native";
import { getTranslation } from "./locales";

const deleteEntry = (deleteDbFunc: (id: number) => void, id: number) => {
  try {
    deleteDbFunc(id);
    router.navigate("/");
    Alert.alert(getTranslation("alerts.entry_delete_success"));
  } catch (err) {
    Alert.alert(getTranslation("alerts.entry_delete_failure"));
  }
};

export const handleDeleteEntry = (
  deleteDbFunc: (id: number) => void,
  id: number,
) => {
  Alert.alert(
    "Are you sure you want to delete this entry?",
    "\nThis decision will be permanent.",
    [
      {
        text: "No, I want to make a different choice",
      },
      {
        text: "Yes, continue",
        onPress: () => {
          deleteEntry(deleteDbFunc, id);
        },
        style: "cancel",
      },
    ],
    { cancelable: false },
  );
};
