import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import { getTranslation } from "@/utils/locales";
import { StatsDataObjType, TableRowCountObj } from "./models";
import { dbName } from "./service";

export const handleGetCDACount = async (): Promise<number> => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: TableRowCountObj = (await db.getFirstAsync(
      `SELECT COUNT(1) AS rowCount FROM cdaArchive;`,
    )) as TableRowCountObj;

    let cdaCount = 0;
    if (res && res.rowCount) {
      cdaCount = res.rowCount;
    }
    return cdaCount;
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_fetching"));

    return 0;
  }
};

export const handleGetJournalCount = async (): Promise<number> => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: TableRowCountObj = (await db.getFirstAsync(
      `SELECT COUNT(1) AS rowCount FROM journalEntries;`,
    )) as TableRowCountObj;

    let journalCount = 0;
    if (res && res.rowCount) {
      journalCount = res.rowCount;
    }
    return journalCount;
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_fetching"));
    return 0;
  }
};

export const handleGetRelaxTime = async (): Promise<number> => {
  type SumOfSecondsRelaxedObj = { sumOfSecondsRelaxed: number };
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: SumOfSecondsRelaxedObj = (await db.getFirstAsync(
      `SELECT SUM(secondsRelaxed) AS sumOfSecondsRelaxed FROM relaxActivities;`,
    )) as SumOfSecondsRelaxedObj;

    let relaxTimeMin = 0;
    if (res && res.sumOfSecondsRelaxed) {
      relaxTimeMin = Math.floor(res.sumOfSecondsRelaxed / 60);
    }
    return relaxTimeMin;
  } catch (err) {
    Alert.alert(getTranslation("alerts.error_db_fetching"));
    return 0;
  }
};

const handleGetHighestVisitStreak = async (): Promise<number> => {
  type HighestVisitStreakObj = { highestVisitStreak: number };
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: HighestVisitStreakObj = (await db.getFirstAsync(
      `SELECT highestVisitStreak FROM userData LIMIT 1;`,
    )) as HighestVisitStreakObj;

    let highestVisitStreak = 0;

    if (res && res.highestVisitStreak) {
      highestVisitStreak = res.highestVisitStreak;
    }
    return highestVisitStreak;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const handleGetStatsData = async (): Promise<
  StatsDataObjType | undefined
> => {
  try {
    const cbtCount = await handleGetCDACount();
    const journalCount = await handleGetJournalCount();
    const relaxTimeMin = await handleGetRelaxTime();
    const highestVisitStreak = await handleGetHighestVisitStreak();

    const statsData: StatsDataObjType = {
      cbtCount: cbtCount === undefined ? 0 : Number(cbtCount),
      journalCount: journalCount === undefined ? 0 : Number(journalCount),
      relaxTimeMin: relaxTimeMin === undefined ? 0 : Number(relaxTimeMin),
      highestVisitStreak:
        highestVisitStreak === undefined ? 0 : Number(highestVisitStreak),
    };

    return statsData;
  } catch (err) {
    console.error("Error fetching stats data:", err);
  }
};

export const fetchStatsData: () => Promise<StatsDataObjType> = async () => {
  const res = await handleGetStatsData();
  return {
    cbtCount: res?.cbtCount || 0,
    journalCount: res?.journalCount || 0,
    relaxTimeMin: res?.relaxTimeMin || 0,
    highestVisitStreak: res?.highestVisitStreak || 0,
  };
};
