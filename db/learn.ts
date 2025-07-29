import { dbPromise } from '@/services/db';

export const handleGetFinishedArticleIds = async () => {
  const db = await dbPromise;
  const res = await db.getAllAsync("SELECT * FROM learnFinishedArticles");
  return res;
};

export const handleAddFinishedArticle = async (id: number) => {
  const db = await dbPromise;
  const finishedArticlesArr = await handleGetFinishedArticleIds();
  if (!finishedArticlesArr.includes(id))
    db.runAsync(`INSERT INTO learnFinishedArticles (articleId) VALUES (?)`, [
      id,
    ]);
};
