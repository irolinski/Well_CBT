import * as SQLite from "expo-sqlite";
import { dbName } from "./service";

type UserType = {
  name?: string;
  lastVisit?: string;
  currentVisitStreak: number;
  highestVisitStreak: number;
  profilePicNum: number;
  customProfilePic?: string;
};

const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const setVisitStreakCount = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS userData (
            name VARCHAR (100) PRIMARY KEY,
            lastVisit VARCHAR (300) NOT NULL,
            currentVisitStreak INT DEFAULT 1,
            highestVisitStreak INT DEFAULT 1,
            profilePicNum INT DEFAULT 0,
            customProfilePic VARCHAR TEXT
            );
        `);

    const user: UserType | null = await db.getFirstAsync(
      "SELECT * FROM userData",
    );

    if (!user) {
      await db.execAsync(`
            INSERT INTO userData (name, lastVisit) VALUES ("", DATETIME('now'));`);
    }

    if (user) {
      let lastVisit = new Date();
      if (user.lastVisit) {
        lastVisit = new Date(user.lastVisit);
      }

      let dayAfterLastVisit: Date = new Date(lastVisit);
      dayAfterLastVisit.setDate(lastVisit.getDate() + 1);

      let currentTime = new Date();

      await db.execAsync(`UPDATE userData SET lastVisit = DATETIME('now')`);

      if (isSameDate(lastVisit, currentTime)) {
        console.log("same day!");
      } else if (isSameDate(lastVisit, dayAfterLastVisit)) {
        console.log("streak!");
        const newStreak = user.currentVisitStreak + 1;
        await db.execAsync(
          `UPDATE userData SET currentVisitStreak = ${newStreak} `,
        );
        if (newStreak > user.highestVisitStreak) {
          await db.execAsync(
            `UPDATE userData SET highestVisitStreak = ${newStreak}`,
          );
        }
      } else {
        console.log("streak broken!");
        await db.execAsync(`UPDATE userData SET currentVisitStreak = ${1}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
