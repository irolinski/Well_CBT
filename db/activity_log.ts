import * as SQLite from "expo-sqlite";
import { dbName } from "./service";

export const fetchRecentEntries = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res = await db.getAllAsync(
      "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 3",
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const fetchEntryData = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res = await db.getAllAsync(
      "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 45",
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCDAEntry = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res = await db.getAllAsync(
      `SELECT * FROM cdaArchive WHERE id="${id}"`,
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const fetchJournalEntry = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: any = {};
    res.main = await db.getAllAsync(
      `SELECT * FROM journalEntries WHERE id="${id}"`,
    );
    res.emotions = await db.getAllAsync(
      `SELECT * FROM journalEntryEmotions WHERE id="${id}"`,
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};
