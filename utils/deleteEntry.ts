import { router } from "expo-router";
import { Alert } from "react-native";

const deleteEntry = (deleteDbFunc: (id: number) => void, id: number) => {
  try {
    deleteDbFunc(id);
    router.navigate("/");
    Alert.alert(
      `Selected entry has been successfuly removed from your storage.`,
    );
  } catch (err) {
    Alert.alert(
      `Error: there has been a problem deleting this entry. Try again later. `,
    );
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
