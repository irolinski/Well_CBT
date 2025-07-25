import { useLocalSearchParams } from "expo-router";
import { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import { View } from "react-native";
import learnArticlesLocales from "@/assets/text/learn_articles.json";
import ErrorScreen from "@/components/global/ErrorScreen";
import Text from "@/components/global/Text";
import ArticlePage from "@/components/learn/Article";
import { learnArticles } from "@/constants/models/learn/articles";
import {
  ArticlesInCurrentLanguageType,
  ArticleTypes,
} from "@/constants/models/learn/learn";
import { AvailableLanguage, selectedLanguage } from "@/hooks/i18n";

export type ArticleTypesWithArticleBody = ArticleTypes & { body: ReactElement };

const index = () => {
  const articleId: number = Number(
    useLocalSearchParams<{ articleId: string }>().articleId,
  );

  const articlesInCurrentLanguage = learnArticlesLocales[
    selectedLanguage as AvailableLanguage
  ] as ArticlesInCurrentLanguageType;

  const articleLocaleObj = articlesInCurrentLanguage[articleId];

  const articleMediaObj = learnArticles.find((el) => el.id === articleId);

  const articleBody = () => {
    return (
      <Trans
        // i18nKey={t(`article_data.${id}.body`)}
        defaults={articleLocaleObj.body}
        ns="learn"
        components={{
          paragraph: <View className="mt-3" />,
          header: <Text className="w-3/4 text-lg font-semibold" />,
          body: <Text className="m-3 text-base leading-6" />,
          bold: <Text style={{ fontWeight: 600 }} />,
        }}
      />
    );
  };

  const article: ArticleTypesWithArticleBody = {
    title: articleLocaleObj.title,
    subtitle: articleLocaleObj.subtitle,
    category: articleMediaObj!.category,
    body: articleBody(),
    time: articleMediaObj!.time,
    bgImage: articleMediaObj!.bgImage,
    customImage: articleMediaObj?.customImage,
    relatedArticleIds: articleMediaObj?.relatedArticleIds,
    id: articleMediaObj!.id,
  };

  if (article) {
    return <ArticlePage {...article} />;
  } else {
    return <ErrorScreen />;
  }
};
export default index;
