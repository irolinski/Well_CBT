import ArticlePage from "@/components/learn/Article";
import ErrorScreen from "@/components/ErrorScreen";
import { learnArticles } from "@/constants/models/learn_articles";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const articleId: number = Number(
    useLocalSearchParams<{ articleId: string }>().articleId,
  );

  const article = learnArticles.find((el) => el.id === articleId);

  if (article) {
    return <ArticlePage {...article} />;
  } else {
    return <ErrorScreen />;
  }
};
export default index;
