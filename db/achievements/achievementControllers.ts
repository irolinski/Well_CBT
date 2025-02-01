import * as SQLite from "expo-sqlite";
import { allAchievementsObj } from "@/constants/models/about_achievements";
import {
  handleGetCDACount,
  handleGetJournalCount,
  handleGetRelaxTime,
} from "../about";
import { handleGetFinishedArticleIds } from "../learn";
import { dbName } from "../service";
import { handleGetNumOfAllEntries, handleGetUserData } from "../user";
import {
  AchievementIdType,
  handleGetAchievementProgressData,
} from "./achievements";

type AchievementControllerType = (
  db: SQLite.SQLiteDatabase,
  currentScore?: number,
  achievementId?: AchievementIdType,
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
      controller(db, currentScore, achievementId);
    }
  } catch (err) {
    console.error(err);
  }
};

const achievementController_1: AchievementControllerType = async (db) => {
  const numOfAllEntries = await handleGetNumOfAllEntries();
  if (numOfAllEntries >= 1) {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = 1 WHERE id="${1}"`,
    );
  }
};

const achievementController_2: AchievementControllerType = async (db) => {
  const userData = await handleGetUserData();

  if (userData?.name && userData.name.length >= 1) {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = 1 WHERE id="${2}"`,
    );
  }
};

const achievementController_3: AchievementControllerType = async (db) => {
  db.execAsync(
    `UPDATE achievementProgress SET currentScore = 1 WHERE id="${3}"`,
  );
};

const achievementController_4_5: AchievementControllerType = async (
  db,
  currentScore = 1,
  achievementId,
) => {
  const userData = await handleGetUserData();
  if (userData) {
    const visitStreak = userData?.currentVisitStreak;

    if (visitStreak > currentScore) {
      db.execAsync(
        `UPDATE achievementProgress SET currentScore = ${Number(visitStreak)} WHERE id="${achievementId}"`,
      );
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
};

const achievementController_6_7: AchievementControllerType = async (
  db,
  currentScore = 1,
  achievementId,
) => {
  const userData = await handleGetUserData();
  if (userData) {
    const { numOfAllVisits } = userData;
    if (numOfAllVisits > currentScore) {
      db.execAsync(
        `UPDATE achievementProgress SET currentScore = ${numOfAllVisits} WHERE id="${achievementId}"`,
      );
    }
  }
};

const achievementController_8: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  const cdaCount = await handleGetCDACount();
  const journalCount = await handleGetJournalCount();

  const numOfCBTEntries = cdaCount + journalCount;

  if (numOfCBTEntries > currentScore) {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = ${numOfCBTEntries} WHERE id="${8}"`,
    );
  }
};

const achievementController_9: AchievementControllerType = async (
  db,
  currrentScore = 0,
) => {
  const finishedArticles = await handleGetFinishedArticleIds();
  const updatedScore = finishedArticles.length;
  if (updatedScore > currrentScore) {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = ${updatedScore} WHERE id="${9}"`,
    );
  }
};

const achievementController_10_11: AchievementControllerType = async (
  db,
  currentScore = 0,
  achievementId,
) => {
  const relaxTime = await handleGetRelaxTime();
  if (achievementId) {
    if (relaxTime > currentScore) {
      let updatedScore = relaxTime;
      const requiredScore = allAchievementsObj[achievementId].score_required;
      if (requiredScore) {
        if (currentScore > requiredScore) {
          updatedScore = requiredScore;
        }
      }

      db.execAsync(
        `UPDATE achievementProgress SET currentScore = ${updatedScore} WHERE id="${achievementId}"`,
      );
    }
  }
};

const achievementController_12: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  const updatedScore = currentScore + 1;
  db.execAsync(
    `UPDATE achievementProgress SET currentScore = ${updatedScore} WHERE id="${12}"`,
  );
};

const achievementController_13: AchievementControllerType = async (
  db,
  currentScore = 0,
) => {
  const journalCount = await handleGetJournalCount();

  if (journalCount > currentScore) {
    db.execAsync(
      `UPDATE achievementProgress SET currentScore = ${journalCount} WHERE id="${13}"`,
    );
  }
};

export const achievementControllersObj = {
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
