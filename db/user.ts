import * as SQLite from "expo-sqlite";
import { isSameDate } from "@/utils/dates";
import { TableRowCountObj, UserType } from "./models";
import { dbName } from "./service";

const isUserType = (res: any): res is UserType => {
  return (
    res &&
    (typeof res.name === "string" || res.name === undefined) &&
    typeof res.currentVisitStreak === "number" &&
    typeof res.highestVisitStreak === "number" &&
    typeof res.profilePicId === "number"
  );
};

export const handleGetNumOfAllEntries = async (): Promise<number> => {
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

      const dayAfterLastVisit: Date = new Date(lastVisit);
      dayAfterLastVisit.setDate(lastVisit.getDate() + 1);

      const currentTime = new Date();
      await db.execAsync(
        `UPDATE userData SET lastVisit = DATETIME('now', 'localtime');`,
      );

      console.log("last visit: " + lastVisit);
      console.log("day after last viist: " + dayAfterLastVisit);
      console.log("current time: " + currentTime);
      console.log("current streak: " + user.currentVisitStreak);

      // check whether the streak continues
      if (isSameDate(lastVisit, currentTime)) {
        console.log("--- \n same day! \n ---");
      } else if (isSameDate(currentTime, dayAfterLastVisit)) {
        //if the streak happened, add it to db
        console.log("--- \n streak! \n --- ");
        const newStreak = user.currentVisitStreak + 1;
        await db.execAsync(
          `UPDATE userData SET currentVisitStreak = ${newStreak};`,
        );
        // if streak is the biggest so far, add it to db
        if (newStreak > user.highestVisitStreak) {
          await db.execAsync(
            `UPDATE userData SET highestVisitStreak = ${newStreak};`,
          );
        }
      } else {
        console.log("--- \n streak broken! \n --- "); // this sometimes logs multiple times in a row which signifies that the same date check does not work correctly
        await db.execAsync(`UPDATE userData SET currentVisitStreak = ${1};`);
      }
    } else {
      throw Error;
    }
  } catch (err) {
    console.error(
      "Error: Could not create and/or modify user table while checking for date streak. " +
        err,
    );
  }
};

export const handleSetName = async (name: string) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: void = await db.execAsync(
      `UPDATE userData SET name = "${name}";`,
    );
  } catch (err) {
    console.error("Error: Could not set name. " + err);
  }
};

export const handleSetProfilePicId = async (faceId: number) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res: void = await db.execAsync(
      `UPDATE userData SET profilePicId = ${faceId}`,
    );
  } catch (err) {
    console.error("Error: Could not set profile picture id. " + err);
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
      profilePicId: 0,
    };
  }
};
export { UserType };
