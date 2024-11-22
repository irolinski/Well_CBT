import * as SQLite from "expo-sqlite";
export const dbName = "well-test-db";

export const setUpDB = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS journalEntries (
       id INTEGER PRIMARY KEY AUTOINCREMENT, moodValue INT NOT NULL, note VARCHAR(200), date NOT NULL
      );
      CREATE TABLE IF NOT EXISTS cdaArchive ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, situation VARCHAR(100) NOT NULL,
        oldThought VARCHAR(100) NOT NULL, distortion VARCHAR(35) NOT NULL,
        newThought VARCHAR(100) NOT NULL, date NOT NULL
      );
      CREATE TABLE IF NOT EXISTS journalEntryEmotions (
        id INT NOT NULL, name VARCHAR(100) NOT NULL, strength INT NOT NULL
      );
          CREATE TABLE IF NOT EXISTS relaxActivities (
        id INTEGER PRIMARY KEY AUTOINCREMENT, activityName VARCHAR(100), secondsRelaxed INT, date NOT NULL
      );
    `);
};

export const createActivityViewTable = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.execAsync(`
    CREATE TEMP VIEW IF NOT EXISTS allActivities AS
    SELECT
      'cda' AS activityName,
      NULL AS value,
      date,
      id
    FROM cdaArchive
    UNION ALL
    SELECT
      'journal' AS activityName,
      moodValue AS value,
      date,
      id
    FROM journalEntries
    UNION ALL
    SELECT
      activityName,
      NULL AS value,
      date,
      id
    FROM relaxActivities
    ORDER BY date DESC;
  `);
};
