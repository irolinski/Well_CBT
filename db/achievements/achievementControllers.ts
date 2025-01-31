import * as SQLite from "expo-sqlite";
import { dbName } from "../service";
import { handleGetNumOfAllEntries, handleGetUserData } from "../user";
import {
  AchievementIdType,
  handleGetAchievementProgressData,
} from "./achievements";

type AchievementControllerType = (
  db: SQLite.SQLiteDatabase,
  currentScore: number,
) => void;

const getAchievementProgress = async (achievementId: AchievementIdType) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  const achievementProgressList = await handleGetAchievementProgressData();
  const currentScore =
    achievementProgressList?.find((obj) => obj.id === achievementId)
      ?.currentScore ?? 0;

  const requiredScore =
    achievementProgressList?.find((obj) => obj.id === achievementId)
      ?.requiredScore ?? 0;

  return { currentScore, requiredScore };
};

const handleAchievementController = async (
  achievementId: AchievementIdType,
  controller: AchievementControllerType,
) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const { currentScore, requiredScore } =
      await getAchievementProgress(achievementId);

    if (currentScore < requiredScore) {
      controller(db, currentScore);
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_1: AchievementControllerType = async (
  db,
  currentScore,
) => {
  const numOfAllEntries = await handleGetNumOfAllEntries();
  if (numOfAllEntries >= 1) {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = ${currentScore + 1} WHERE id="${1}"`,
    );
  }
};

const achievementController_2: AchievementControllerType = async (
  db,
  currentScore,
) => {
  const userData = await handleGetUserData();

  if (userData?.name && userData.name.length >= 1) {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = ${currentScore + 1} WHERE id="${2}"`,
    );
  }
};

const achievementController_3 = async () => {};

export const achievementControllersObj = {
  1: () => {
    console.log("ran func for achievement 1");
    handleAchievementController(1, achievementController_1);
  },
  2: () => {
    console.log("ran func for achievement 2");
    handleAchievementController(2, achievementController_2);
  },
  3: () => {
    console.log("ran func for achievement 3");
  },
  4: () => {
    console.log("ran func for achievement 4");
  },
  5: () => {
    console.log("ran func for achievement 5");
  },
  6: () => {
    console.log("ran func for achievement 6");
  },
  7: () => {
    console.log("ran func for achievement 7");
  },
  8: () => {
    console.log("ran func for achievement 8");
  },
  9: () => {
    console.log("ran func for achievement 9");
  },
  10: () => {
    console.log("ran func for achievement 10");
  },
  11: () => {
    console.log("ran func for achievement 11");
  },
  12: () => {
    console.log("ran func for achievement 12");
  },
  13: () => {
    console.log("ran func for achievement 13");
  },
};
