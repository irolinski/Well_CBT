import * as SQLite from "expo-sqlite";
import {
  AchievementControllerType,
  AchievementProgressObj,
  allAchievementsModelsObj,
  AllAchievementsObjType,
} from "@/constants/models/about/achievements";
import {
  handleGetCDACount,
  handleGetJournalCount,
  handleGetRelaxTime,
} from "@/db/about";
import { handleGetFinishedArticleIds } from "@/db/learn";
import { dbName } from "@/db/service";
import { handleGetNumOfAllEntries, handleGetUserData } from "@/db/user";

export type AchievementIdType = keyof typeof allAchievementsWithControllersObj;

export const handleGetAchievementProgressData = async (): Promise<
  AchievementProgressObj[] | undefined
> => {
  const db = await SQLite.openDatabaseAsync(dbName);
  const res = await db.getAllAsync(`SELECT * FROM achievementProgress;`);
  const achievementProgressData: AchievementProgressObj[] =
    res as AchievementProgressObj[];

  return achievementProgressData;
};

const getAchievementProgress = async (achievementId: AchievementIdType) => {
  const achievementProgressList = await handleGetAchievementProgressData();
  const currentScore =
    achievementProgressList?.find((obj) => obj.id === achievementId)
      ?.currentScore ?? 0;

  const requiredScore =
    achievementProgressList?.find((obj) => obj.id === achievementId)
      ?.requiredScore ?? 0;

  return { currentScore, requiredScore };
};

const handleSetAchievementUnlockedDatetime = async (
  db: SQLite.SQLiteDatabase,
  achievementId: AchievementIdType,
) => {
  const { currentScore, requiredScore } =
    await getAchievementProgress(achievementId);

  if (currentScore === requiredScore) {
    db.execAsync(
      `UPDATE achievementProgress SET dateUnlocked = DATETIME('now', 'localtime') WHERE id="${achievementId}"`,
    );
  }
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
      controller(db, currentScore, achievementId);
    }
  } catch (err) {
    console.error(err);
  }
};

//moved unlock achievement date handler func to individual components - test whether it works

const achievementController_1: AchievementControllerType = async (db) => {
  try {
    const numOfAllEntries = await handleGetNumOfAllEntries();
    if (numOfAllEntries >= 1) {
      db.execAsync(
        `UPDATE achievementProgress SET currentScore = 1 WHERE id="${1}"`,
      );
    }
    await handleSetAchievementUnlockedDatetime(db, 1);
  } catch (err) {
    console.error(err);
  }
};

const achievementController_2: AchievementControllerType = async (db) => {
  try {
    const userData = await handleGetUserData();

    if (userData?.name && userData.name.length >= 1) {
      db.execAsync(
        `UPDATE achievementProgress SET currentScore = 1 WHERE id="${2}"`,
      );
    }
    await handleSetAchievementUnlockedDatetime(db, 2);
  } catch (err) {
    console.error(err);
  }
};

const achievementController_3: AchievementControllerType = async (db) => {
  try {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = 1 WHERE id="${3}"`,
    );
    await handleSetAchievementUnlockedDatetime(db, 3);
  } catch (err) {
    console.error(err);
  }
};

const achievementController_4_5: AchievementControllerType = async (
  db,
  currentScore = 1,
  achievementId,
) => {
  try {
    const userData = await handleGetUserData();
    if (userData) {
      const visitStreak = userData?.currentVisitStreak;

      if (visitStreak > currentScore) {
        db.execAsync(
          `UPDATE achievementProgress SET currentScore = ${Number(visitStreak)} WHERE id="${achievementId}"`,
        );
      }
      if (achievementId) {
        await handleSetAchievementUnlockedDatetime(db, achievementId);
      }
    } else {
      console.error(
        `Error: Couldn't update progress of achievement of id: ${achievementId}.`,
      );
      if (!userData) {
        console.error("Inavlid user data!");
      }
      if (!currentScore) {
        console.error("Invalid currentScore!");
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_6_7: AchievementControllerType = async (
  db,
  currentScore = 1,
  achievementId,
) => {
  try {
    const userData = await handleGetUserData();
    if (userData) {
      const { numOfAllVisits } = userData;
      if (numOfAllVisits > currentScore) {
        db.execAsync(
          `UPDATE achievementProgress SET currentScore = ${numOfAllVisits} WHERE id="${achievementId}"`,
        );
      }

      if (achievementId) {
        await handleSetAchievementUnlockedDatetime(db, achievementId);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_8: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  try {
    const cdaCount = await handleGetCDACount();
    const journalCount = await handleGetJournalCount();

    const numOfCBTEntries = cdaCount + journalCount;

    if (numOfCBTEntries > currentScore) {
      db.execAsync(
        `UPDATE achievementProgress SET currentScore = ${numOfCBTEntries} WHERE id="${8}"`,
      );
      await handleSetAchievementUnlockedDatetime(db, 8);
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_9: AchievementControllerType = async (
  db,
  currrentScore = 0,
) => {
  try {
    const finishedArticles = await handleGetFinishedArticleIds();
    const updatedScore = finishedArticles.length;
    if (updatedScore > currrentScore) {
      db.execAsync(
        `UPDATE achievementProgress SET currentScore = ${updatedScore} WHERE id="${9}"`,
      );
      await handleSetAchievementUnlockedDatetime(db, 9);
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_10_11: AchievementControllerType = async (
  db,
  currentScore = 0,
  achievementId,
) => {
  try {
    const relaxTime = await handleGetRelaxTime();
    if (achievementId) {
      if (relaxTime > currentScore) {
        let updatedScore = relaxTime;
        const requiredScore =
          allAchievementsModelsObj[achievementId].score_required;
        if (requiredScore) {
          if (currentScore > requiredScore) {
            updatedScore = requiredScore;
          }
        }

        db.execAsync(
          `UPDATE achievementProgress SET currentScore = ${updatedScore} WHERE id="${achievementId}"`,
        );
        await handleSetAchievementUnlockedDatetime(db, achievementId);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_12: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  try {
    const updatedScore = currentScore + 1;
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = ${updatedScore} WHERE id="${12}"`,
    );
    await handleSetAchievementUnlockedDatetime(db, 12);
  } catch (err) {
    console.error(err);
  }
};

const achievementController_13: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  try {
    const journalCount = await handleGetJournalCount();

    if (journalCount > currentScore) {
      db.execAsync(
        `UPDATE achievementProgress SET currentScore = ${journalCount} WHERE id="${13}"`,
      );
      await handleSetAchievementUnlockedDatetime(db, 13);
    }
  } catch (err) {
    console.error(err);
  }
};

export const achievementHandlersObj = {
  1: () => {
    handleAchievementController(1, achievementController_1);
  },
  2: () => {
    handleAchievementController(2, achievementController_2);
  },
  3: () => {
    handleAchievementController(3, achievementController_3);
  },
  4: () => {
    handleAchievementController(4, achievementController_4_5);
  },
  5: () => {
    handleAchievementController(5, achievementController_4_5);
  },
  6: () => {
    handleAchievementController(6, achievementController_6_7);
  },
  7: () => {
    handleAchievementController(7, achievementController_6_7);
  },
  8: () => {
    handleAchievementController(8, achievementController_8);
  },
  9: () => {
    handleAchievementController(9, achievementController_9);
  },
  10: () => {
    handleAchievementController(10, achievementController_10_11);
  },
  11: () => {
    handleAchievementController(11, achievementController_10_11);
  },
  12: () => {
    handleAchievementController(12, achievementController_12);
  },
  13: () => {
    handleAchievementController(13, achievementController_13);
  },
};

//the handlers below are all handled automatically on every app load
export const allAchievementsWithControllersObj: AllAchievementsObjType = {
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

export const allAchievementsWithControllersArr = Object.values(
  allAchievementsWithControllersObj,
);
