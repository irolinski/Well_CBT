import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import { RelaxToolNames } from "@/constants/models/home/activity_log";
import { cdaSliceTypes } from "@/state/features/tools/cdaSlice";
import { journalSliceTypes } from "@/state/features/tools/journalSlice";
import { getTranslation } from "@/utils/locales";
import { dbName } from "./service";

export const handleSaveCDAEntry = async (cdaState: cdaSliceTypes) => {
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
              DATETIME('now', 'localtime')
            );
        `);
    } catch (err) {
      console.error(err);
      Alert.alert(getTranslation("alerts.error_db_saving"));
    }
  }
};

export const deleteCDAEntry = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`DELETE FROM cdaArchive WHERE id="${id}"`);
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_erasing"));
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
            NULL, ${journalState.moodValue}, '${journalState.note}', DATETIME('now', 'localtime')
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
    } catch (err) {
      console.error(err);
      Alert.alert(getTranslation("alerts.error_db_saving"));
    }
  }
};

export const deleteJournalEntry = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`DELETE FROM journalEntries WHERE id="${id}"`);
    await db.execAsync(`DELETE FROM journalEntryEmotions WHERE id="${id}"`);
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_erasing"));
  }
};

export const handleLogRelaxActivity = async (
  activityName: RelaxToolNames,
  relaxTime: number,
) => {
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
    await db.runAsync(`
                  INSERT INTO relaxActivities (
                    id,
                    activityName,
                    secondsRelaxed,
                    datetime
                  ) VALUES (
                    NULL,
                    '${activityName}',
                    '${relaxTime}',
                    DATETIME('now',
                    'localtime'
                    )
                  );
                `);
  } catch (err) {
    console.error(err);
  }
};

export const getPhoneData = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    db.execAsync(`CREATE TABLE IF NOT EXISTS phoneAFriend (
          name VARCHAR(100),
          phone VARCHAR(100)
      );`);
    const pd: { name: string; phone: string }[] = await db.getAllAsync(
      "SELECT * FROM phoneAFriend",
    );
    return pd;
  } catch (err) {
    console.error(err);
  }
};

export const setContact = async (name: string, phone: string) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    await db.execAsync(`
      DROP TABLE IF EXISTS phoneAFriend;
      CREATE TABLE phoneAFriend (
          name VARCHAR(100),
          phone VARCHAR(100)
      );
  `);
    await db.execAsync(
      `INSERT INTO phoneAFriend (name, phone) VALUES ('${name}', '${phone}');`,
    );
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_saving"));
  }
};

export const setContactWithPicture = async (
  name: string,
  phone: string,
  pictureURI: string,
) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    await db.execAsync(`
      DROP TABLE IF EXISTS phoneAFriend;
      CREATE TABLE phoneAFriend (
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(100) NOT NULL,
          pictureURI VARCHAR(400)
      );
  `);
    await db.execAsync(
      `INSERT INTO phoneAFriend (name, phone, pictureURI) VALUES ('${name}', '${phone}', '${pictureURI}');`,
    );
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_saving"));
  }
};
