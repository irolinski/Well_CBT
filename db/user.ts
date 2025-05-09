import { Alert } from 'react-native';
import { dbPromise } from '@/services/db';
import { isSameDate } from '@/utils/dates';
import { getTranslation } from '@/utils/locales';
import { TableRowCountObj, UserType } from './models';

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
    const db = await dbPromise;
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
    Alert.alert(getTranslation("alerts.error_db_fetching"));

    return 0;
  }
};

export const handleGetUserData = async (): Promise<UserType | undefined> => {
  try {
    const db = await dbPromise;
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
    Alert.alert(getTranslation("alerts.error_db_fetching"));
  }
};

const countOneDay = async (): Promise<void> => {
  try {
    const db = await dbPromise;
    const userData = await handleGetUserData();
    if (userData) {
      let { numOfAllVisits } = userData;
      numOfAllVisits++;
      db.execAsync(`UPDATE userData SET numOfAllDays = ${numOfAllVisits}`);
    }
  } catch (err) {
    console.error(err);
  }
};

export const handleSetVisitStreakCount = async (): Promise<void> => {
  try {
    const db = await dbPromise;

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

      // console.log("last visit: " + lastVisit);
      // console.log("day after last viist: " + dayAfterLastVisit);
      // console.log("current time: " + currentTime);
      // console.log("current streak: " + user.currentVisitStreak);

      // check whether the streak continues
      if (isSameDate(lastVisit, currentTime)) {
        // console.log("--- \n same day! \n ---");
      } else if (isSameDate(currentTime, dayAfterLastVisit)) {
        //if the streak happened, add it to db
        // console.log("--- \n streak! \n --- ");
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
        // console.log("--- \n streak broken! \n --- ");
        await db.execAsync(`UPDATE userData SET currentVisitStreak = ${1};`);
      }

      // add 1 to daycount if today's a different day than it was during lastVisit
      if (!isSameDate(lastVisit, currentTime)) {
        countOneDay();
      }
    } else {
      throw Error;
    }
  } catch (err) {
    console.error(
      "Error: Could not create and/or modify user table while checking for date streak. " +
        err,
    );
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_saving"),
    );
  }
};

export const handleSetName = async (name: string) => {
  try {
    const db = await dbPromise;
    const res: void = await db.execAsync(
      `UPDATE userData SET name = "${name}";`,
    );
  } catch (err) {
    console.error("Error: Could not set name. " + err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_saving"),
    );
  }
};

export const handleSetProfilePicId = async (faceId: number) => {
  try {
    const db = await dbPromise;
    const res: void = await db.execAsync(
      `UPDATE userData SET profilePicId = ${faceId}`,
    );
  } catch (err) {
    console.error("Error: Could not set profile picture id. " + err);
    console.error(err);
    Alert.alert(
      getTranslation("alerts.error"),
      getTranslation("alerts.error_db_saving"),
    );
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
      numOfAllVisits: 1,
      profilePicId: 0,
    };
  }
};
export { UserType };
