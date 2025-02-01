import * as SQLite from "expo-sqlite";
import {
  allAchievementsArr,
  allAchievementsObj,
} from "@/constants/models/about_achievements";
import { dbName } from "../service";

export type AchievementIdType = keyof typeof allAchievementsObj;

export type AchievementProgressObj = {
  id: AchievementIdType;
  currentScore: number;
  requiredScore: number;
};

// create a table for achievement progress
const handleCreateAchievementProgressTable = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS achievementProgress (
          id INT, currentScore INT, requiredScore INT
        );
      `);
  } catch (err) {
    console.error(err);
  }
};

export const handleGetAchievementProgressData = async (): Promise<
  AchievementProgressObj[] | undefined
> => {
  const db = await SQLite.openDatabaseAsync(dbName);
  const res = await db.getAllAsync(`SELECT * FROM achievementProgress;`);
  const achievementProgressData: AchievementProgressObj[] =
    res as AchievementProgressObj[];

  return achievementProgressData;
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
    if (allAchievementsArr.length > achievementProgressList.length) {
      allAchievementsArr.forEach(async (achievement) => {
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
          console.log("The achievement list has been updated!");
        }
      });
    }
  } catch (err) {
    console.error(err);
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

  // get only unlocked achievements
  const unlockedAchievementsArr = allAchievementsArr.filter((obj) =>
    unlockedAchievementIds.includes(obj.id as AchievementIdType),
  );

  // run handler function for every achievement that hasn't been unlocked
  unlockedAchievementsArr.forEach((obj) => {
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
  }
};
