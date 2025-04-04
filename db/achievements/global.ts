import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import {
  AchievementProgressObj,
  allAchievementsModelsArr,
} from "@/constants/models/about/achievements";
import {
  AchievementIdType,
  allAchievementsWithControllersArr,
  handleGetAchievementProgressData,
} from "@/db/achievements/controllers";
import { getTranslation } from "@/utils/locales";
import { dbName } from "../service";

// create a table for achievement progress
const handleCreateAchievementProgressTable = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS achievementProgress (
          id INT, currentScore INT, requiredScore INT, dateUnlocked VARCHAR (30) 
        );
      `);
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_achievements"));
  }
};

// a function that adds achievement ids to the database programatically
const handlePopulateAchievementProgressTable = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const achievementProgressList = await handleGetAchievementProgressData();
    // console.log(achievementProgressList);

    if (!achievementProgressList) {
      throw Error("Error occured: Couldn't access achievement progress list.");
    }
    // if the acheievement list has more items than there are rows in achievement progress list in the db
    if (allAchievementsModelsArr.length > achievementProgressList.length) {
      allAchievementsModelsArr.forEach(async (achievement) => {
        // check whether progressList contains its relative achievement's id
        const idIsPresentInProgressList = achievementProgressList.some(
          (achievementProgressObj) =>
            achievementProgressObj.id === achievement.id,
        );
        // if progress list contains a row of its relative achievement's id - do nothing
        if (idIsPresentInProgressList) {
          return;
          //if it doesnt' - add a row  to progress list
        } else {
          await db.execAsync(
            `INSERT INTO achievementProgress(id, currentScore, requiredScore) VALUES (${achievement.id}, 0, ${achievement.score_required});`,
          );
          // console.log("The achievement list has been updated!");
        }
      });
    }
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_achievements"));
  }
};

const getUnlockedAchievementIds: () => Promise<
  AchievementIdType[]
> = async () => {
  const achievementProgressData = await handleGetAchievementProgressData();
  if (!achievementProgressData) {
    throw new Error("Error: Couldn't access achievement progress data.");
  } else {
    const achievementProgressDataUnlockedOnly: AchievementProgressObj[] =
      achievementProgressData.filter(
        (obj: AchievementProgressObj) => obj.currentScore < obj.requiredScore,
      );

    const unlockedAchievementIds: AchievementIdType[] =
      achievementProgressDataUnlockedOnly.map((obj) => obj.id);

    return unlockedAchievementIds;
  }
};

export const updateAchievementProgress = async () => {
  const unlockedAchievementIds: AchievementIdType[] =
    await getUnlockedAchievementIds();

  // get only locked achievements
  const lockedAchievementsArr = allAchievementsWithControllersArr.filter(
    (obj) => unlockedAchievementIds.includes(obj.id as AchievementIdType),
  );

  // run handler function for every achievement that hasn't been unlocked
  lockedAchievementsArr.forEach((obj) => {
    if (obj.handlerFunction) {
      obj.handlerFunction();
    }
  });
};

export const setUpAchievementsTable = async () => {
  try {
    Promise.all([
      handleCreateAchievementProgressTable(),
      handlePopulateAchievementProgressTable(),
    ]);
  } catch (err) {
    console.error("Error: Error during handling achievement system. \n" + err);
    Alert.alert(getTranslation("alerts.error_db_achievements"));
  }
};
