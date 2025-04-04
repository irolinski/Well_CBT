import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import { getTranslation } from "@/utils/locales";
import { dbName } from "./service";

export type UserSettingsDataObj = {
  exerciseAutoSaveIsActive: number;
  language: string;
};

export const getUserSettingsData = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: UserSettingsDataObj | undefined | null = await db.getFirstAsync(
      "SELECT * FROM userSettings",
    );

    return res;
  } catch (err) {
    console.error("Error: Could not get user settings data. " + err);
    Alert.alert(getTranslation("alerts.error_db_fetching"));
  }
};

export const handleSetExerciseAutoSaveIsActive = async (value: boolean) => {
  const newValue: number = Number(value);
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(
      `UPDATE userSettings SET exerciseAutoSaveIsActive = ${newValue}; `,
    );
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_saving"));
  }
};
