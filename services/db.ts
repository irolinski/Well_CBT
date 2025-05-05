import * as SQLite from "expo-sqlite";

const DB_NAME = "well-test-db-047";
export const dbPromise = SQLite.openDatabaseAsync(DB_NAME);
