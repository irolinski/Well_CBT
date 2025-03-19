import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import learnArticlesLocales from "@/assets/text/learn_articles.json";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import LearnArticleCard from "@/components/learn/ArticleCard";
import LearnCategoryCard from "@/components/learn/LearnCategoryCard";
import { learnArticles } from "@/constants/models/learn/articles";
import {
  learnCategories,
  learnCategoriesTypes,
} from "@/constants/models/learn/categories";
import { ArticlesInCurrentLanguageType } from "@/constants/models/learn/learn";
import { Colors } from "@/constants/styles/colorTheme";
import { AvailableLanguage, selectedLanguage } from "@/hooks/i18n";

const Learn = () => {
  const { t, i18n } = useTranslation("learn");

  const articlesInCurrentLanguage = learnArticlesLocales[
    selectedLanguage as AvailableLanguage
  ] as ArticlesInCurrentLanguageType;

  const availableArticles = learnArticles.filter((articleObj) =>
    Object.keys(articlesInCurrentLanguage).includes(String(articleObj.id)),
  );

  const articleNumber =
    (Math.random() * (Object.keys(availableArticles).length - 1)) | 0;

  const featuredArticle = availableArticles[articleNumber];

  return (
    <FrameMenu title={t("index.title")}>
      <View>
        <View className="mb-4">
          <Text className="mb-6 mt-2 text-left text-2xl">
            {t("index.todays_pick")}
          </Text>
          <View className="items-center justify-center">
            <LearnArticleCard
              title={articlesInCurrentLanguage[featuredArticle.id].title}
              subtitle={articlesInCurrentLanguage[featuredArticle.id].subtitle}
              time={featuredArticle.time}
              link={`/learn/categories/${featuredArticle.category}/${availableArticles[articleNumber].id}`}
              id={featuredArticle.id}
              image={featuredArticle.bgImage.image}
              imagePlacement={featuredArticle.bgImage.cardPlacementY}
            />
          </View>
        </View>
        <Text
          className="mb-4 mt-2 text-left text-2xl"
          style={{ color: Colors.offBlack }}
        >
          {t("index.categories")}
        </Text>
        <View className="flex-row flex-wrap justify-center overflow-hidden">
          {learnCategories.map(
            (category: learnCategoriesTypes, index: number) => (
              <LearnCategoryCard
                name={t(`categories.${category.title}.title`)}
                backgroundImage={category.image}
                link={`/learn/categories/${category.title}`}
                key={index}
                disabled={category.disabled && category.disabled}
              />
            ),
          )}
        </View>
      </View>
    </FrameMenu>
  );
};

export default Learn;
