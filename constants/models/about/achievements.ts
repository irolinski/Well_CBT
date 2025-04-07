import { Image } from "expo-image";
import * as SQLite from "expo-sqlite";
import { achievementBadgeImages } from "@/assets/images/about/achievements/achievements";

export type AchievementProgressObj = {
  id: AchievementIdType;
  currentScore: number;
  requiredScore: number;
  dateUnlocked: Date | undefined;
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

export type AchievementControllerType = (
  db: SQLite.SQLiteDatabase,
  currentScore?: number,
  achievementId?: AchievementIdType,
) => void;

export type AchievementIdType = keyof typeof allAchievementsModelsObj;

export const allAchievementsModelsObj: AllAchievementsObjType = {
  1: {
    id: 1,
    title: "Getting Started",
    description_before: "Complete a first exercise",
    description_after:
      "You have dipped your toe into the water by completing your first exercise. Way to go!",
    image: achievementBadgeImages.image_01,
    score_required: 1,
  },
  2: {
    id: 2,
    title: "Pleased To Meet Me",
    description_before: "Add your name",
    description_after:
      "You’ve taken the first step by introducing yourself. Nice to meet you!",
    image: achievementBadgeImages.image_02,
    score_required: 1,
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
  },
  4: {
    id: 4,
    title: "A Foot in The Door",
    description_before: "Visited WorryFree 7 consecutive days in a row",
    description_after:
      "Your commitment is showing! You’ve visited WorryFree for 7 days in a row. Way to go!",
    image: achievementBadgeImages.image_04,
    score_required: 7,
  },
  5: {
    id: 5,
    title: "User of the Month",
    description_before: "Visited WorryFree 30 consecutive days in a row",
    description_after:
      "You’ve visited WorryFree for 30 days in a row. Now that is an impressive consistency!",
    image: achievementBadgeImages.image_05,
    score_required: 30,
  },
  6: {
    id: 6,
    title: "Consistent Presence",
    description_before: "Visited WorryFree 180 days (not necessarily in a row)",
    description_after:
      "You have visited WorryFree on 180 different days. Thank you for you commitment. We hope your work is paying off!",
    image: achievementBadgeImages.image_06,
    score_required: 180,
  },
  7: {
    id: 7,
    title: "New Year’s Resolution",
    description_before: "Visited WorryFree 365 days (not necessarily in a row)",
    description_after:
      "A year of commitment! You’ve visited WorryFree for 365 days. Keep up the incredible work!",
    image: achievementBadgeImages.image_07,
    score_required: 365,
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
  },
  9: {
    id: 9,
    title: "Bookworm",
    description_before: "Read 10 articles",
    description_after:
      "You’ve broadened your knowledge by reading 10 articles. Keep feeding your curiosity!",
    image: achievementBadgeImages.image_09,
    score_required: 10,
  },
  10: {
    id: 10,
    title: "Stoic",
    description_before: "Spent over 60 minutes total on relaxation exercises",
    description_after:
      "Your calm and composure are admirable. You’ve spent over 60 minutes on relaxation exercises.",
    image: achievementBadgeImages.image_10,
    score_required: 60,
  },
  11: {
    id: 11,
    title: "Monk",
    description_before: "Spent over 180 minutes total on relaxation exercises",
    description_after:
      "You’ve achieved a deep state of mindfulness, spending over 180 minutes on relaxation exercises.",
    image: achievementBadgeImages.image_11,
    score_required: 180,
  },
  12: {
    id: 12,
    title: "Philosopher",
    description_before: "Share 10 quotes",
    description_after:
      "Your wisdom shines! You’ve shared 10 quotes, spreading thoughtful inspiration to others.",
    image: achievementBadgeImages.image_12,
    score_required: 10,
  },
  13: {
    id: 13,
    title: "Prolific Writer",
    description_before: "Completed 30 journal entries",
    description_after:
      "You’ve documented your journey with 30 journal entries. Keep expressing yourself!",
    image: achievementBadgeImages.image_13,
    score_required: 30,
  },
};

export const allAchievementsModelsArr: AchievementObj[] = Object.values(
  allAchievementsModelsObj,
);
