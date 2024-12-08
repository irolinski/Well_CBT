import * as SQLite from "expo-sqlite";
import { dbName } from "./service";
import { journalSliceTypes } from "@/state/features/tools/journalSlice";
import { cdaSliceTpyes } from "@/state/features/tools/cdaSlice";

export const handleSaveCDAEntry = async (cdaState: cdaSliceTpyes) => {
  if (cdaState.save) {
    try {
      const db = await SQLite.openDatabaseAsync(dbName);

      // First, create the table
      await db.execAsync(`
          CREATE TABLE IF NOT EXISTS cdaArchive (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
            situation VARCHAR(100) NOT NULL,
            oldThought VARCHAR(100) NOT NULL,
            distortion VARCHAR(35) NOT NULL,
            newThought VARCHAR(100) NOT NULL,
            datetime NOT NULL
          );
        `);
      // Then, insert data into the table
      await db.execAsync(`
          INSERT INTO cdaArchive (id, situation, oldThought, distortion, newThought, datetime)
            VALUES (
              NULL,
              '${cdaState.situation}',
              '${cdaState.oldThought}',
              '${cdaState.distortion}',
              '${cdaState.newThought}',
              DATETIME('now')
            );
        `);
      console.log(await db.getAllAsync("SELECT * FROM cdaArchive"));
    } catch (err) {
      console.error(err);
    }
  }
};

export const handleSaveJournalEntry = async (
  journalState: journalSliceTypes,
) => {
  if (journalState.save) {
    try {
      const db = await SQLite.openDatabaseAsync(dbName);

      // First, create the tables in separate calls
      await db.execAsync(`
            CREATE TABLE IF NOT EXISTS journalEntries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            moodValue INT NOT NULL,
            note VARCHAR(200),
            datetime NOT NULL
            );
        `);

      await db.execAsync(`
            CREATE TABLE IF NOT EXISTS journalEntryEmotions (
            id INT NOT NULL,
            name VARCHAR(100) NOT NULL,
            strength INT NOT NULL
            );
        `);

      // Insert data into the journal table
      // and save id to use it for joint emotion table
      const insertIntoJournalResult = await db.runAsync(`
            INSERT INTO journalEntries (id, moodValue, note, datetime) VALUES (
            NULL, ${journalState.moodValue}, '${journalState.note}', DATETIME('now')
            );
        `);

      // Save emotions in joint table
      if (journalState.emotions.length > 0) {
        let query = `INSERT INTO journalEntryEmotions (id, name, strength) VALUES `;
        journalState.emotions.forEach((e) => {
          query += `(${insertIntoJournalResult.lastInsertRowId}, '${e.name}', ${e.strength}), `;
        });
        query = query.slice(0, -2) + ";"; // Remove trailing comma, add semicolon

        await db.execAsync(query);
      }
      console.log(await db.getAllAsync("SELECT * FROM journalEntries"));
      console.log("-----------------------");
      console.log(await db.getAllAsync("SELECT * FROM journalEntryEmotions"));
    } catch (err) {
      throw err;
    }
  }
};

export const handleLogRelaxActivity = async (relaxTime: number) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    // First, create the tables in separate calls
    await db.execAsync(`
                  CREATE TABLE IF NOT EXISTS relaxActivities (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    activityName VARCHAR(100),
                    secondsRelaxed INT,
                    datetime NOT NULL
                  );
                `);

    // Insert data into table
    // and save id to use it for joint emotion table
    const insertIntoJournalResult = await db.runAsync(`
                  INSERT INTO relaxActivities (id, activityName, secondsRelaxed, datetime) VALUES (
                    NULL, 'breathing', '${relaxTime}', DATETIME('now')
                  );
                `);

    console.log(await db.getAllAsync("SELECT * FROM relaxActivities"));
    console.log("-----------------------");
  } catch (err) {
    throw err;
  }
};

export const getPhoneData = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    const pd: { name: string; phone: string }[] = await db.getAllAsync(
      "SELECT * FROM phoneAFriend",
    );
    return pd;
  } catch (err) {
    console.error("no data found");
  }
};

export const setContact = async (name: string, phone: string) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.execAsync(`
      DROP TABLE IF EXISTS phoneAFriend;
      CREATE TABLE phoneAFriend (
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(100) NOT NULL
      );
  `);
  await db.execAsync(
    `INSERT INTO phoneAFriend (name, phone) VALUES ('${name}', '${phone}');`,
  );
};
