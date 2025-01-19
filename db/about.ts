import * as SQLite from "expo-sqlite";
import { StatsDataObjType, TableRowCountObj } from "./models";
import { dbName } from "./service";

const handleGetCDACount = async (): Promise<number> => {
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
    return 0;
  }
};

const handleGetJournalCount = async (): Promise<number> => {
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
    return 0;
  }
};

const handleGetRelaxTime = async (): Promise<number> => {
  type SumOfSecondsRelaxedObj = { sumOfSecondsRelaxed: number };
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: SumOfSecondsRelaxedObj = (await db.getFirstAsync(
      `SELECT SUM(secondsRelaxed) AS sumOfSecondsRelaxed FROM relaxActivities;`,
    )) as SumOfSecondsRelaxedObj;

    let relaxTimeSec = 0;
    if (res && res.sumOfSecondsRelaxed) {
      relaxTimeSec = res.sumOfSecondsRelaxed;
    }
    return relaxTimeSec;
  } catch (err) {
    console.error(err);
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
    console.log("journal count is : ", journalCount);
    const relaxTimeSec = await handleGetRelaxTime();
    const highestVisitStreak = await handleGetHighestVisitStreak();

    const statsData: StatsDataObjType = {
      cbtCount: cbtCount === undefined ? 0 : Number(cbtCount),
      journalCount: journalCount === undefined ? 0 : Number(journalCount),
      relaxTimeSec: relaxTimeSec === undefined ? 0 : Number(relaxTimeSec),
      highestVisitStreak:
        highestVisitStreak === undefined ? 0 : Number(highestVisitStreak),
    };

    return statsData;
  } catch (err) {
    console.error("Error fetching stats data:", err);
  }
};

export const fetchStatsData = async (): Promise<StatsDataObjType> => {
  const res = await handleGetStatsData();
  return {
    cbtCount: res?.cbtCount || 0,
    journalCount: res?.journalCount || 0,
    relaxTimeSec: res?.relaxTimeSec || 0,
    highestVisitStreak: res?.highestVisitStreak || 0,
  };
};
