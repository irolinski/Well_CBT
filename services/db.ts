import * as SQLite from "expo-sqlite";

const DB_NAME = "worryfree-db";
export const dbPromise = SQLite.openDatabaseAsync(DB_NAME);
