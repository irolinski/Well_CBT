import * as SQLite from "expo-sqlite";

export const dbName = "well-test-db-047";
export const dbPromise = SQLite.openDatabaseAsync(dbName);
