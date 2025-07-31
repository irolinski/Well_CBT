import { dbPromise } from "@/services/db";

export const handleUpdateQuoteWidgetData = async (
  newQuoteIndex: number,
  newImageIndex: number,
) => {
  try {
    const db = await dbPromise;
    await db.runAsync(`UPDATE quoteWidget SET quoteIndex=?, imageIndex=?`, [
      newQuoteIndex,
      newImageIndex,
    ]);
  } catch (err) {
    console.error("Error while updating quote widget.");
  }
};

export const handleGetQuoteWidgetData = async () => {
  try {
    const db = await dbPromise;
    const res = await db.getFirstAsync(`SELECT * FROM quoteWidget;`);
    return res;
  } catch (err) {
    console.error("Error while retrieving quoteWidget data.");
  }
};
