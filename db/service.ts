import * as SQLite from "expo-sqlite";

export const dbName = "well-test-db-044";

export const setUpDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`
    
      CREATE TABLE IF NOT EXISTS userData (
        name VARCHAR (100), lastVisit VARCHAR (30) NOT NULL, currentVisitStreak INT,
        highestVisitStreak INT, numOfAllVisits INT, profilePicId INT, customProfilePic VARCHAR (500)
      );

      INSERT INTO userData (name, lastVisit, currentVisitStreak, highestVisitStreak, numOfAllVisits, profilePicId) VALUES (
      "", DATETIME('now', 'localtime'), 1, 1, 1, 0
      );


      CREATE TABLE IF NOT EXISTS journalEntries (
       id INTEGER PRIMARY KEY AUTOINCREMENT, moodValue INT NOT NULL, note VARCHAR(200), datetime NOT NULL
      );

      CREATE TABLE IF NOT EXISTS cdaArchive ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, situation VARCHAR(100) NOT NULL,
        oldThought VARCHAR(100) NOT NULL, distortion VARCHAR(35) NOT NULL,
        newThought VARCHAR(100) NOT NULL, datetime NOT NULL
      );

      CREATE TABLE IF NOT EXISTS journalEntryEmotions (
        id INT NOT NULL, name VARCHAR(100) NOT NULL, strength INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS relaxActivities (
        id INTEGER PRIMARY KEY AUTOINCREMENT, activityName VARCHAR(100), secondsRelaxed INT, datetime NOT NULL
      );

      CREATE TABLE IF NOT EXISTS phoneAFriend (
          name VARCHAR(100),
          phone VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS learnFinishedArticles (
        articleId INT NOT NULL
      );

       CREATE TABLE IF NOT EXISTS achievementProgress (
          id INT, currentScore INT, requiredScore INT, dateUnlocked VARCHAR (30) 
        );
      
    `);
  } catch (err) {
    console.error("Error: Problem with initializing database.");
  }
};

export const createActivityViewTable = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
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
};

export const deleteAllDBData = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.execAsync(`
    DROP TABLE IF EXISTS userData;
    DROP TABLE IF EXISTS journalEntries;
    DROP TABLE IF EXISTS journalEntryEmotions;
    DROP TABLE IF EXISTS cdaArchive;
    DROP TABLE IF EXISTS relaxActivities;
    DROP TABLE IF EXISTS learnFinishedArticles;
    DROP TABLE IF EXISTS achievementProgress;
    DROP TABLE IF EXISTS phoneAFriend;
  `);
  await setUpDB();
};
