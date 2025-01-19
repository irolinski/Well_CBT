import * as SQLite from "expo-sqlite";
import { TableRowCountObj, UserType } from "./models";
import { dbName } from "./service";

const isUserType = (res: any): res is UserType => {
  return (
    res &&
    (typeof res.name === "string" || res.name === undefined) &&
    typeof res.currentVisitStreak === "number" &&
    typeof res.highestVisitStreak === "number" &&
    typeof res.profilePicNum === "number"
  );
};

const handleGetNumOfAllEntries = async (): Promise<number> => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: TableRowCountObj = (await db.getFirstAsync(`
    SELECT COUNT(1) AS rowCount FROM allActivities;
    `)) as TableRowCountObj;

    let numOfAllEntries = 0;

    if (res && res.rowCount!) {
      numOfAllEntries = res.rowCount;
    }
    return numOfAllEntries;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const handleGetUserData = async (): Promise<UserType | undefined> => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: unknown | UserType = await db.getFirstAsync(
      `SELECT * FROM userData;`,
    );
    console.log("user data res: " + res);
    let user: UserType;
    if (isUserType(res)) {
      user = res;
      user.numOfAllEntries = await handleGetNumOfAllEntries();
      return user;
    } else {
      throw Error;
    }
  } catch (err) {
    console.error("Error: Problem retrieving user data. " + err);
  }
};

export const handleSetVisitStreakCount = async (): Promise<void> => {
  //helper date function
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    const res: UserType | undefined = await handleGetUserData();
    let user: UserType;

    if (isUserType(res)) {
      user = res;
      let lastVisit = new Date();
      if (user.lastVisit) {
        lastVisit = new Date(user.lastVisit);
      }

      let dayAfterLastVisit: Date = new Date(lastVisit);
      dayAfterLastVisit.setDate(lastVisit.getDate() + 1);

      let currentTime = new Date();

      await db.execAsync(`UPDATE userData SET lastVisit = DATETIME('now');`);

      if (isSameDate(lastVisit, currentTime)) {
        console.log("same day!");
      } else if (isSameDate(lastVisit, dayAfterLastVisit)) {
        console.log("streak!");
        const newStreak = user.currentVisitStreak + 1;
        await db.execAsync(
          `UPDATE userData SET currentVisitStreak = ${newStreak};`,
        );
        if (newStreak > user.highestVisitStreak) {
          await db.execAsync(
            `UPDATE userData SET highestVisitStreak = ${newStreak};`,
          );
        }
      } else {
        console.log("streak broken!");
        await db.execAsync(`UPDATE userData SET currentVisitStreak = ${1};`);
      }
    } else {
      throw Error;
    }
  } catch (err) {
    console.error("Error: Could not create and/or modify user table. " + err);
  }
};

const handleSetName = async (name: string) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: void = await db.execAsync(
      `UPDATE userData SET name = "${name}";`,
    );
  } catch (err) {
    console.error("Error: Could not set name. " + err);
  }
};

export const fetchUserData = async (): Promise<UserType> => {
  const res = await handleGetUserData();
  if (res) {
    return {
      ...res,
    };
  } else {
    return {
      name: "",
      currentVisitStreak: 1,
      highestVisitStreak: 1,
      profilePicNum: 0,
    };
  }
};
