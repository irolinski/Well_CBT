import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import {
  AchievementControllerType,
  AchievementProgressObj,
  allAchievementsModelsObj,
} from "@/constants/models/about/achievements";
import {
  handleGetCDACount,
  handleGetJournalCount,
  handleGetRelaxTime,
} from "@/db/about";
import { handleGetFinishedArticleIds } from "@/db/learn";
import { handleGetNumOfAllEntries, handleGetUserData } from "@/db/user";
import { dbPromise } from "@/services/db";
import { getTranslation } from "@/utils/locales";
import { AchievementIdType } from "./global";

export const handleGetAchievementProgressData = async (): Promise<
  AchievementProgressObj[] | undefined
> => {
  const db = await dbPromise;
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
    db.runAsync(
      `UPDATE achievementProgress SET dateUnlocked = DATETIME('now', 'localtime') WHERE id=?`,
      [achievementId],
    );
  }
};

const handleAchievementController = async (
  achievementId: AchievementIdType,
  controller: AchievementControllerType,
) => {
  try {
    const db = await dbPromise;

    const { currentScore, requiredScore } =
      await getAchievementProgress(achievementId);

    if (currentScore < requiredScore) {
      controller(db, currentScore, achievementId);
    }
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_achievements"),
    );
  }
};

//moved unlock achievement date handler func to individual components - test whether it works

const achievementController_1: AchievementControllerType = async (db) => {
  const achievementId = allAchievementsModelsObj[1].id;
  const maxScore = allAchievementsModelsObj[1].score_required!;
  try {
    const numOfAllEntries = await handleGetNumOfAllEntries();
    if (numOfAllEntries >= 1) {
      db.runAsync(`UPDATE achievementProgress SET currentScore=? WHERE id=?`, [
        maxScore,
        achievementId,
      ]);
    }
    await handleSetAchievementUnlockedDatetime(db, achievementId);
  } catch (err) {
    console.error(err);
  }
};

const achievementController_2: AchievementControllerType = async (db) => {
  const achievementId = allAchievementsModelsObj[2].id;
  const maxScore = allAchievementsModelsObj[2].score_required!;
  try {
    const userData = await handleGetUserData();

    if (userData?.name && userData.name.length >= 1) {
      db.runAsync(`UPDATE achievementProgress SET currentScore=? WHERE id=?`, [
        maxScore,
        achievementId,
      ]);
    }
    await handleSetAchievementUnlockedDatetime(db, achievementId);
  } catch (err) {
    console.error(err);
  }
};

const achievementController_3: AchievementControllerType = async (db) => {
  const achievementId = allAchievementsModelsObj[3].id!;
  const maxScore = allAchievementsModelsObj[3].score_required!;
  try {
    db.runAsync(`UPDATE achievementProgress SET currentScore=? WHERE id=?`, [
      maxScore,
      achievementId,
    ]);
    await handleSetAchievementUnlockedDatetime(db, achievementId);
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
    if (userData && achievementId) {
      const visitStreak = userData?.currentVisitStreak;

      if (visitStreak > currentScore) {
        db.runAsync(
          `UPDATE achievementProgress SET currentScore=? WHERE id=?`,
          [Number(visitStreak), achievementId],
        );
      }

      await handleSetAchievementUnlockedDatetime(db, achievementId);
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
    if (userData && achievementId) {
      const { numOfAllVisits } = userData;
      if (numOfAllVisits > currentScore) {
        db.runAsync(
          `UPDATE achievementProgress SET currentScore=? WHERE id=?`,
          [numOfAllVisits, achievementId],
        );
      }

      await handleSetAchievementUnlockedDatetime(db, achievementId);
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_8: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  const achievementId = allAchievementsModelsObj[8].id;
  try {
    const cdaCount = await handleGetCDACount();
    const journalCount = await handleGetJournalCount();

    const numOfCBTEntries = cdaCount + journalCount;

    if (numOfCBTEntries > currentScore) {
      db.runAsync(`UPDATE achievementProgress SET currentScore=? WHERE id=?`, [
        numOfCBTEntries,
        achievementId,
      ]);
      await handleSetAchievementUnlockedDatetime(db, achievementId);
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_9: AchievementControllerType = async (
  db,
  currrentScore = 0,
) => {
  const achievementId = allAchievementsModelsObj[9].id;
  try {
    const finishedArticles = await handleGetFinishedArticleIds();
    const updatedScore = finishedArticles.length;
    if (updatedScore > currrentScore) {
      db.runAsync(`UPDATE achievementProgress SET currentScore=? WHERE id=?`, [
        updatedScore,
        achievementId,
      ]);
      await handleSetAchievementUnlockedDatetime(db, achievementId);
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

        db.runAsync(
          `UPDATE achievementProgress SET currentScore=? WHERE id=?`,
          [updatedScore, achievementId],
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
  const achievementId = allAchievementsModelsObj[12].id;
  try {
    const updatedScore = currentScore + 1;
    db.runAsync(`UPDATE achievementProgress SET currentScore = ? WHERE id=?`, [
      updatedScore,
      achievementId,
    ]);
    await handleSetAchievementUnlockedDatetime(db, achievementId);
  } catch (err) {
    console.error(err);
  }
};

const achievementController_13: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  const achievementId = allAchievementsModelsObj[13].id;
  try {
    const journalCount = await handleGetJournalCount();

    if (journalCount > currentScore) {
      db.runAsync(`UPDATE achievementProgress SET currentScore=? WHERE id=?`, [
        journalCount,
        achievementId,
      ]);
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
