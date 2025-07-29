import { Alert } from 'react-native';
import { dbPromise } from '@/services/db';
import { getTranslation } from '@/utils/locales';

export const setUpDB = async () => {
  try {
    const db = await dbPromise;
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS userData (
        name VARCHAR(100),
        lastVisit VARCHAR(30) NOT NULL,
        currentVisitStreak INT,
        highestVisitStreak INT,
        numOfAllVisits INT,
        profilePicId INT,
        customProfilePic VARCHAR(500)
      );

      INSERT OR IGNORE INTO userData (
      name,
      lastVisit,
      currentVisitStreak,
      highestVisitStreak,
      numOfAllVisits,
      profilePicId
      )
      SELECT "",
      DATETIME('now', 'localtime'), 1, 1, 1, 0
      WHERE NOT EXISTS (SELECT 1 FROM userData LIMIT 1);

      CREATE TABLE IF NOT EXISTS userSettings (
        exerciseAutoSaveIsActive INT,
        language VARCHAR(10)
      );

      INSERT OR IGNORE INTO userSettings (exerciseAutoSaveIsActive, language)
      SELECT 1, ""
      WHERE NOT EXISTS (SELECT 1 FROM userSettings LIMIT 1);

      CREATE TABLE IF NOT EXISTS seenOnboarding (isTrue INT);

      CREATE TABLE IF NOT EXISTS journalEntries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        moodValue INT NOT NULL,
        note VARCHAR(200),
        datetime NOT NULL
      );

      CREATE TABLE IF NOT EXISTS cdaArchive ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        situation VARCHAR(100) NOT NULL,
        oldThought VARCHAR(100) NOT NULL,
        distortion VARCHAR(35) NOT NULL,
        newThought VARCHAR(100) NOT NULL,
        datetime NOT NULL
      );

      CREATE TABLE IF NOT EXISTS journalEntryEmotions (
        id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        strength INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS relaxActivities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activityName VARCHAR(100),
        secondsRelaxed INT,
        datetime NOT NULL
      );

      CREATE TABLE IF NOT EXISTS phoneAFriend (
        name VARCHAR(100),
        phone VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS learnFinishedArticles (
        articleId INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS achievementProgress (
        id INT,
        currentScore INT,
        requiredScore INT,
        dateUnlocked VARCHAR(30)
      );

      CREATE TABLE IF NOT EXISTS seenTutorials (
        toolName VARCHAR(50) NOT NULL
      );
    `);
    });
  } catch (err) {
    console.error("Error: Problem with initializing database.\n\n", err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_initialization"),
    );
  }
};

export const createActivityViewTable = async () => {
  try {
    const db = await dbPromise;
    await db.execAsync(`
      CREATE TEMP VIEW IF NOT EXISTS allActivities AS
      SELECT
        'cda' AS activityName,
        NULL AS value,
        datetime,
        id
      FROM cdaArchive
      UNION ALL
      SELECT
        'journal' AS activityName,
        moodValue AS value,
        datetime,
        id
      FROM journalEntries
      UNION ALL
      SELECT
        activityName,
        NULL AS value,
        datetime,
        id
      FROM relaxActivities
      ORDER BY datetime DESC;
    `);
  } catch (err) {
    console.error("Error creating activity view:", err);
  }
};

export const handleGetSeenOnboarding = async () => {
  try {
    const db = await dbPromise;
    return await db.getFirstAsync(`SELECT isTrue FROM seenOnboarding`);
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_saving"),
    );
  }
};

export const handleSetSeenOnboardingTrue = async () => {
  try {
    const db = await dbPromise;
    await db.execAsync(`INSERT INTO seenOnboarding (isTrue) VALUES (1)`);
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_saving"),
    );
  }
};

export const deleteAllDBData = async () => {
  try {
    const db = await dbPromise;
    await db.execAsync(`
      DROP TABLE IF EXISTS userData;
      DROP TABLE IF EXISTS seenOnboarding;
      DROP TABLE IF EXISTS seenTutorials;
      DROP TABLE IF EXISTS journalEntries;
      DROP TABLE IF EXISTS journalEntryEmotions;
      DROP TABLE IF EXISTS cdaArchive;
      DROP TABLE IF EXISTS relaxActivities;
      DROP TABLE IF EXISTS learnFinishedArticles;
      DROP TABLE IF EXISTS achievementProgress;
      DROP TABLE IF EXISTS phoneAFriend;
    `);
    await setUpDB();
  } catch (err) {
    console.error(err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_erasing"),
    );
  }
};
