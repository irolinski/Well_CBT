import { Image } from "expo-image";
import * as SQLite from "expo-sqlite";
import { achievementBadgeImages } from "@/assets/images/about/achievements/achievements";
import {
  handleGetCDACount,
  handleGetJournalCount,
  handleGetRelaxTime,
} from "@/db/about";
import { handleGetFinishedArticleIds } from "@/db/learn";
import { dbName } from "@/db/service";
import { handleGetNumOfAllEntries, handleGetUserData } from "@/db/user";

export type AchievementIdType = keyof typeof allAchievementsObj;

export type AchievementProgressObj = {
  id: AchievementIdType;
  currentScore: number;
  requiredScore: number;
  dateUnlocked: Date | undefined;
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
        const requiredScore = allAchievementsObj[achievementId].score_required;
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

export type AchievementObj = {
  id: AchievementIdType;
  title: string;
  description_before: string;
  description_after: string;
  image: Image;
  score_current?: number;
  score_required?: number;
  handlerFunction?: () => void;
  dateUnlocked?: Date;
};

export type AllAchievementsObjType = {
  [key: number]: AchievementObj;
};

export const allAchievementsObj: AllAchievementsObjType = {
  1: {
    id: 1,
    title: "Getting Started",
    description_before: "Complete a first exercise",
    description_after:
      "You have dipped your toe into the water by completing your first exercise. Way to go!",
    image: achievementBadgeImages.image_01,
    score_required: 1,
    handlerFunction: () => achievementHandlersObj[1](),
  },
  2: {
    id: 2,
    title: "Pleased To Meet Me",
    description_before: "Add your name",
    description_after:
      "You’ve taken the first step by introducing yourself. Nice to meet you!",
    image: achievementBadgeImages.image_02,
    score_required: 1,
    handlerFunction: () => {
      achievementHandlersObj[2]();
    },
  },
  3: {
    id: 3,
    title: "Conversation Starter",
    description_before:
      "Added a contact to a friend and shared a conversation topic",
    description_after:
      "You’ve opened the lines of communication by sharing a conversation topic. Keep it going!",
    image: achievementBadgeImages.image_03,
    score_required: 1,
    //handled inside phone friend component
  },
  4: {
    id: 4,
    title: "A Foot in The Door",
    description_before: "Visited Well 7 consecutive days in a row",
    description_after:
      "Your commitment is showing! You’ve visited Well for 7 days in a row. Way to go!",
    image: achievementBadgeImages.image_04,
    score_required: 7,
    handlerFunction: () => {
      achievementHandlersObj[4]();
    },
  },
  5: {
    id: 5,
    title: "User of the Month",
    description_before: "Visited Well 30 consecutive days in a row",
    description_after:
      "You’ve visited Well for 30 days in a row. Now that is an impressive consistency!",
    image: achievementBadgeImages.image_05,
    score_required: 30,
    handlerFunction: () => {
      achievementHandlersObj[5]();
    },
  },
  6: {
    id: 6,
    title: "Consistent Presence",
    description_before: "Visited Well 180 days (not necessarily in a row)",
    description_after:
      "You have visited Well on 180 different days. Thank you for you commitment. We hope your work is paying off!",
    image: achievementBadgeImages.image_06,
    score_required: 180,
    handlerFunction: () => {
      achievementHandlersObj[6]();
    },
  },
  7: {
    id: 7,
    title: "New Year’s Resolution",
    description_before: "Visited Well 365 days (not necessarily in a row)",
    description_after:
      "A year of commitment! You’ve visited Well for 365 days. Keep up the incredible work!",
    image: achievementBadgeImages.image_07,
    score_required: 365,
    handlerFunction: () => {
      achievementHandlersObj[7]();
    },
  },
  8: {
    id: 8,
    title: "Rationalist",
    description_before:
      "Completed various cognitive-behavioral exercies 20 times",
    description_after:
      "Your rational thinking is shining through! You’ve completed 20 cognitive-behavioral exercises.",
    image: achievementBadgeImages.image_08,
    score_required: 20,
    handlerFunction: () => {
      achievementHandlersObj[8]();
    },
  },
  9: {
    id: 9,
    title: "Bookworm",
    description_before: "Read 10 articles",
    description_after:
      "You’ve broadened your knowledge by reading 10 articles. Keep feeding your curiosity!",
    image: achievementBadgeImages.image_09,
    score_required: 10,
    handlerFunction: () => {
      achievementHandlersObj[9]();
    },
  },
  10: {
    id: 10,
    title: "Stoic",
    description_before: "Spent over 60 minutes total on relaxation exercises",
    description_after:
      "Your calm and composure are admirable. You’ve spent over 60 minutes on relaxation exercises.",
    image: achievementBadgeImages.image_10,
    score_required: 60,
    handlerFunction: () => {
      achievementHandlersObj[10]();
    },
  },
  11: {
    id: 11,
    title: "Monk",
    description_before: "Spent over 180 minutes total on relaxation exercises",
    description_after:
      "You’ve achieved a deep state of mindfulness, spending over 180 minutes on relaxation exercises.",
    image: achievementBadgeImages.image_11,
    score_required: 180,
    handlerFunction: () => {
      achievementHandlersObj[11]();
    },
  },
  12: {
    id: 12,
    title: "Philosopher",
    description_before: "Share 10 quotes",
    description_after:
      "Your wisdom shines! You’ve shared 10 quotes, spreading thoughtful inspiration to others.",
    image: achievementBadgeImages.image_12,
    score_required: 10,
    // handled inside quote component
  },
  13: {
    id: 13,
    title: "Prolific Writer",
    description_before: "Completed 30 journal entries",
    description_after:
      "You’ve documented your journey with 30 journal entries. Keep expressing yourself!",
    image: achievementBadgeImages.image_13,
    score_required: 30,
    handlerFunction: () => {
      achievementHandlersObj[13]();
    },
  },
};

export const allAchievementsArr: AchievementObj[] =
  Object.values(allAchievementsObj);
