import { Alert } from "react-native";
import {
  AchievementProgressObj,
  allAchievementsModelsArr,
  allAchievementsModelsObj,
  AllAchievementsObjType,
} from "@/constants/models/about/achievements";
import {
  achievementHandlersObj,
  handleGetAchievementProgressData,
} from "@/db/achievements/controllers";
import { dbPromise } from "@/services/db";
import { getTranslation } from "@/utils/locales";

export type AchievementIdType = keyof typeof achievements;

//the handlers below are handled automatically on every app load except where noted
const achievements: AllAchievementsObjType = {
  1: {
    ...allAchievementsModelsObj[1],
    handlerFunction: () => achievementHandlersObj[1](),
  },
  2: {
    ...allAchievementsModelsObj[2],
    handlerFunction: () => achievementHandlersObj[2](),
  },
  3: {
    ...allAchievementsModelsObj[3],
    // handled inside distract/phone/modal component
  },
  4: {
    ...allAchievementsModelsObj[4],
    handlerFunction: () => achievementHandlersObj[4](),
  },
  5: {
    ...allAchievementsModelsObj[5],
    handlerFunction: () => achievementHandlersObj[5](),
  },
  6: {
    ...allAchievementsModelsObj[6],
    handlerFunction: () => achievementHandlersObj[6](),
  },
  7: {
    ...allAchievementsModelsObj[7],
    handlerFunction: () => achievementHandlersObj[7](),
  },
  8: {
    ...allAchievementsModelsObj[8],
    handlerFunction: () => achievementHandlersObj[8](),
  },
  9: {
    ...allAchievementsModelsObj[9],
    handlerFunction: () => achievementHandlersObj[9](),
  },
  10: {
    ...allAchievementsModelsObj[10],
    handlerFunction: () => achievementHandlersObj[10](),
  },
  11: {
    ...allAchievementsModelsObj[11],
    handlerFunction: () => achievementHandlersObj[11](),
  },
  12: {
    ...allAchievementsModelsObj[12],
    // handled inside quote component
  },
  13: {
    ...allAchievementsModelsObj[2],
    handlerFunction: () => achievementHandlersObj[13](),
  },
};

export const allAchievementsWithControllersArr = Object.values(achievements);

// create a table for achievement progress
const handleCreateAchievementProgressTable = async () => {
  try {
    const db = await dbPromise;
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS achievementProgress (
          id INT,
          currentScore INT,
          requiredScore INT,
          dateUnlocked VARCHAR (30) 
        );
      `);
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_achievements"),
    );
  }
};

// a function that adds achievement ids to the database programatically
const handlePopulateAchievementProgressTable = async () => {
  try {
    const db = await dbPromise;
    const achievementProgressList = await handleGetAchievementProgressData();

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
          await db.runAsync(
            `INSERT INTO achievementProgress(id, currentScore, requiredScore) VALUES (?, ?, ?);`,
            [achievement.id, 0, achievement.score_required!],
          );
          // console.log("The achievement list has been updated!");
        }
      });
    }
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_achievements"),
    );
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
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_achievements"),
    );
  }
};
