import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, ScrollView, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo/logo";
import learnArticlesLocales from "@/assets/text/learn_articles.json";
import ErrorScreen from "@/components/ErrorScreen";
import Text from "@/components/global/Text";
import LearnArticleCard from "@/components/learn/ArticleCard";
import CategoryScrollableHeader from "@/components/learn/CategoryScrollableHeader";
import { learnArticles } from "@/constants/models/learn/articles";
import { learnCategories } from "@/constants/models/learn/categories";
import { ArticlesInCurrentLanguageType } from "@/constants/models/learn/learn";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { AvailableLanguage } from "@/hooks/i18n";

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.5;

const index = () => {
  const { t, i18n } = useTranslation(["learn", "common"]);
  const selectedLanguage: AvailableLanguage =
    i18n.language as AvailableLanguage;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: false,
    },
  );

  const categoryTitle: string = useLocalSearchParams<{ category: string }>()
    .category;

  const articlesInCurrentLanguage = learnArticlesLocales[
    selectedLanguage
  ] as ArticlesInCurrentLanguageType;

  const availableArticles = learnArticles.filter((articleObj) =>
    Object.keys(articlesInCurrentLanguage).includes(String(articleObj.id)),
  );
  const displayedArticles = availableArticles.filter(
    (a) => a.category === categoryTitle,
  );
  const categoryData = learnCategories.find((c) => c.title === categoryTitle);

  if (displayedArticles.length > 0 && categoryData) {
    return (
      <React.Fragment>
        <CategoryScrollableHeader
          value={scrollOffsetY}
          headerHeight={HEADER_HEIGHT}
          {...categoryData}
        />
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: Colors.offWhite,
            paddingTop: HEADER_HEIGHT,
          }}
          onScroll={handleScroll}
        >
          <View className="ml-8 mt-4">
            <Text className="text-2xl">{t("articles.title")}</Text>
          </View>
          <View className="mx-4 mb-4">
            <View style={{ backgroundColor: Colors.offWhite }}>
              <View className="items-center justify-center">
                {displayedArticles.map((article, index: number) => (
                  <View className="mt-5 flex-1" key={index}>
                    <LearnArticleCard
                      title={articlesInCurrentLanguage[article.id].title}
                      subtitle={articlesInCurrentLanguage[article.id].subtitle}
                      time={article.time}
                      link={`./${categoryTitle}/${article.id}`}
                      id={article.id}
                      image={article.bgImage.image}
                      imagePlacement={article.bgImage.cardPlacementY}
                    />
                  </View>
                ))}
                <View className="my-5 w-full flex-row justify-end px-6">
                  <Text>
                    {t("lists_and_tables.showing_current_of_total", {
                      ns: "common",
                      current: displayedArticles.length,
                      total: displayedArticles.length,
                    })}
                  </Text>
                </View>
              </View>
            </View>
            <View className="mb-12 mt-6 h-4 w-full flex-row items-center justify-center">
              <Image className="h-4 w-1/2" source={logoImages.logo_standard} />
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  } else {
    return <ErrorScreen />;
  }
};
export default index;
