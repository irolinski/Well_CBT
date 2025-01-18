//SELECT COUNT(1) to get rowcount of a table
import * as SQLite from "expo-sqlite";
import { dbName } from "./service";

//get all data that I could use here, then choose the most impressive pieces and display
//categories: journal entries, number of breaths, days-in-row, mind exercises

//best done using a temp view
// journal entries - just check how many are saved
// mind exercises - ^
// minutes of relaxation - get seconds from relax table
// days-in-row - need a new table for this - columns: daysInRow and lastDay; it fires on app launch and checks; if lastDay = today -> do nothing; if last day = today - 1 add 1 to record; if last day is more than 1 day away from today erase record

export type StatsDataObjType = {
  cbtCount: number;
  journalCount: number;
  relaxTimeSec: number;
};

const handleGetCDACount = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: unknown[] = await db.getAllAsync(
      `SELECT COUNT(1) FROM cdaArchive;`,
    );

    const cdaCount: number | unknown = res[0];
    if (typeof cdaCount === "number") {
      return cdaCount;
    } else {
      return 0;
    }
  } catch (err) {
    console.error(err);
  }
};

const handleGetJournalCount = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: unknown[] = await db.getAllAsync(
      `SELECT COUNT(1) FROM journalEntryEmotions;`,
    );

    const journalCount: number | unknown = res[0];
    if (typeof journalCount === "number") {
      return journalCount;
    } else {
      return 0;
    }
  } catch (err) {
    console.error(err);
  }
};

const handleGetRelaxTime = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: unknown[] = await db.getAllAsync(
      `SELECT SUM(secondsRelaxed) FROM relaxActivities;`,
    );
    const relaxTimeSec: number | unknown = res[0];
    if (typeof relaxTimeSec === "number") {
      return relaxTimeSec;
    } else {
      return 0;
    }
  } catch (err) {
    console.error(err);
  }
};

export const handleGetStatsData = async () => {
  try {
    const cbtCount = await handleGetCDACount();
    const journalCount = await handleGetJournalCount();
    const relaxTimeSec = await handleGetRelaxTime();

    const statsData: StatsDataObjType = {
      cbtCount: cbtCount === undefined ? 0 : cbtCount,
      journalCount: journalCount === undefined ? 0 : journalCount,
      relaxTimeSec: relaxTimeSec === undefined ? 0 : relaxTimeSec,
    };

    return statsData;
    // console.log(
    //   `Stats - CBT Entries: ${cbtCount}, Journals: ${journalCount}, Relaxation Time: ${relaxTimeSec}`,
    // );
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
  };
};
