import { router } from 'expo-router';
import { Alert } from 'react-native';
import { getTranslation } from './locales';

const deleteEntry = (deleteDbFunc: (id: number) => void, id: number) => {
  try {
    deleteDbFunc(id);
    router.navigate("/");
    Alert.alert(
      getTranslation("alerts.success"),
      getTranslation("alerts.entry_delete_success"),
    );
  } catch (err) {
    Alert.alert(
      getTranslation("alerts.failure"),
      getTranslation("alerts.entry_delete_failure"),
    );
  }
};

export const handleDeleteEntry = (
  deleteDbFunc: (id: number) => void,
  id: number,
) => {
  Alert.alert(
    getTranslation("alerts.entry_delete_title"),
    "\n" + getTranslation("alerts.body_decision_permanent"),
    [
      {
        text: getTranslation("alerts.answer_no"),
      },
      {
        text: getTranslation("alerts.answer_yes"),
        onPress: () => {
          deleteEntry(deleteDbFunc, id);
        },
        style: "cancel",
      },
    ],
    { cancelable: false },
  );
};
