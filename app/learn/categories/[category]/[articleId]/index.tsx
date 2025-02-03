import { useLocalSearchParams } from "expo-router";
import ErrorScreen from "@/components/ErrorScreen";
import ArticlePage from "@/components/learn/Article";
import { learnArticles } from "@/constants/models/learn/articles";
import { ArticleTypes } from "@/constants/models/learn/learn";

const index = () => {
  const articleId: number = Number(
    useLocalSearchParams<{ articleId: string }>().articleId,
  );

  const article: ArticleTypes | undefined = learnArticles.find(
    (el) => el.id === articleId,
  );

  if (article) {
    return <ArticlePage {...article} />;
  } else {
    return <ErrorScreen />;
  }
};
export default index;
