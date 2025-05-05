import { Alert } from "react-native";
import {
  RelaxToolNames,
  ToolNames,
} from "@/constants/models/home/activity_log";
import { dbPromise } from "@/services/db";
import { cdaSliceTypes } from "@/state/features/tools/cdaSlice";
import { journalSliceTypes } from "@/state/features/tools/journalSlice";
import { getTranslation } from "@/utils/locales";

//--
// tools/cda
//--

export const handleSaveCDAEntry = async (cdaState: cdaSliceTypes) => {
  if (cdaState.save) {
    try {
      const db = await dbPromise;

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
    const db = await dbPromise;
    await db.execAsync(`DELETE FROM cdaArchive WHERE id="${id}"`);
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_erasing"));
  }
};

//--
//tools/classic_cbt/journal
//--

export const handleSaveMoodJournalEntry = async (
  journalState: journalSliceTypes,
) => {
  if (journalState.save) {
    try {
      const db = await dbPromise;

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

export const deleteMoodJournalEntry = async (id: number) => {
  try {
    const db = await dbPromise;
    await db.execAsync(`DELETE FROM journalEntries WHERE id="${id}"`);
    await db.execAsync(`DELETE FROM journalEntryEmotions WHERE id="${id}"`);
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_erasing"));
  }
};

//--
// tools/relax
//--

export const handleLogRelaxActivity = async (
  activityName: RelaxToolNames,
  relaxTime: number,
) => {
  try {
    const db = await dbPromise;

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

// ---
// tools/phone_a_friend
// ---

export const getPhoneData = async () => {
  const db = await dbPromise;
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
  const db = await dbPromise;
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
  const db = await dbPromise;
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

// ---
// tool tutorials
// ---

export const handleSetSeenTutorial = async (toolName: ToolNames) => {
  try {
    const db = await dbPromise;
    await db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS seenTutorials (toolName VARCHAR(50) NOT NULL);
      INSERT INTO seenTutorials (toolName) VALUES ('${toolName}');
      `,
    );
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_saving"));
  }
};

const handleGetSeenTutorial = async (toolName: ToolNames) => {
  try {
    const db = await dbPromise;
    const res = await db.getFirstAsync(
      `SELECT 1 FROM seenTutorials WHERE toolName = '${toolName}'`,
    );
    return res;
  } catch (err) {
    console.error(err);
    Alert.alert(getTranslation("alerts.error_db_saving"));
  }
};

export const handleCheckTutorialWasSeen = async (
  toolName: ToolNames,
): Promise<boolean> => {
  const res = await handleGetSeenTutorial(toolName);
  return !!res;
};
