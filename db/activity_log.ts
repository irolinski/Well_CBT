import { Alert } from 'react-native';
import { dbPromise } from '@/services/db';
import { getTranslation } from '@/utils/locales';

export const fetchRecentEntries = async () => {
  try {
    const db = await dbPromise;
    const res = await db.getAllAsync(
      "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 3",
    );
    return res;
  } catch (err) {
    Alert.alert(getTranslation("alerts.error_db_fetching"));
  }
};

export const fetchEntryData = async () => {
  try {
    const db = await dbPromise;
    const res = await db.getAllAsync(
      "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 1000",
    );
    return res;
  } catch (err) {
    Alert.alert(getTranslation("alerts.error_db_fetching"));
  }
};

export const fetchCDAEntry = async (id: number) => {
  try {
    const db = await dbPromise;
    const res = await db.getAllAsync(`SELECT * FROM cdaArchive WHERE id=?`, [
      id,
    ]);
    return res;
  } catch (err) {
    Alert.alert(getTranslation("alerts.error_db_fetching"));
  }
};

export const fetchJournalEntry = async (id: number) => {
  try {
    const db = await dbPromise;
    const res: any = {};
    res.main = await db.getAllAsync(`SELECT * FROM journalEntries WHERE id=?`, [
      id,
    ]);
    res.emotions = await db.getAllAsync(
      `SELECT * FROM journalEntryEmotions WHERE id=?`,
      [id],
    );
    return res;
  } catch (err) {
    Alert.alert(getTranslation("alerts.error_db_fetching"));
  }
};
