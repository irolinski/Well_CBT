import * as SQLite from "expo-sqlite";
import { dbName } from "./service";

export const handleGetFinishedArticleIds = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  const res = await db.getAllAsync("SELECT * FROM learnFinishedArticles");
  return res;
};

export const handleAddFinishedArticle = async (id: number) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  const finishedArticlesArr = await handleGetFinishedArticleIds();
  if (!finishedArticlesArr.includes(id))
    db.execAsync(
      `INSERT INTO learnFinishedArticles (articleId) VALUES (${id})`,
    );
};
