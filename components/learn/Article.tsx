import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Platform, ScrollView, View } from "react-native";
import { ArticleTypesWithArticleBody } from "@/app/learn/categories/[category]/[articleId]";
import { logoImages } from "@/assets/images/global/logo";
import learnArticlesLocales from "@/assets/text/learn_articles.json";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import ArticleImage from "@/components/learn/ArticleCustomImage";
import ArticleTextHeader from "@/components/learn/ArticleTextHeader";
import RelatedArticleCard from "@/components/learn/RelatedArticleCard";
import { learnArticles } from "@/constants/models/learn/articles";
import {
  ArticlesInCurrentLanguageType,
  learnRelatedArticleCardTypes,
} from "@/constants/models/learn/learn";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { selectedLanguage } from "@/hooks/i18n";
import { analyticsLogOpenArticleEvent } from "@/services/firebase/firebase";
import ArticleImageScrollableHeader from "./ArticleImageScrollableHeader";

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.4;

const ArticlePage = ({
  title,
  subtitle,
  body,
  category,
  time,
  bgImage,
  customImage,
  relatedArticleIds,
  id,
}: ArticleTypesWithArticleBody) => {
  const { t } = useTranslation(["learn", "common"]);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const getRelatedArticles = (idArr: number[] | undefined) => {
    let relatedArticlesArr: learnRelatedArticleCardTypes[] = [];

    if (idArr) {
      idArr.forEach((id: number) => {
        const relatedArticleLocaleObj = articlesInCurrentLanguage[id];
        let relatedArticleMediaObj = learnArticles.find((a) => a.id === id);

        const relatedArticle: learnRelatedArticleCardTypes = {
          title: relatedArticleLocaleObj.title,
          image: relatedArticleMediaObj!.bgImage.image!,
          time: relatedArticleMediaObj!.time,
          link: `/learn/categories/${relatedArticleMediaObj!.category}/${relatedArticleMediaObj!.id}`,
          id: relatedArticleMediaObj!.id,
        };

        if (relatedArticle) {
          relatedArticlesArr.push(relatedArticle);
        }
      });
    }
    return relatedArticlesArr;
  };

  const articlesInCurrentLanguage = learnArticlesLocales[
    selectedLanguage as keyof typeof learnArticlesLocales
  ] as ArticlesInCurrentLanguageType;

  const relatedArticles = getRelatedArticles(relatedArticleIds);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: false,
    },
  );

  useEffect(() => {
    analyticsLogOpenArticleEvent(id);
  }, []);

  return (
    <View>
      {/* Page Header */}
      <ArticleImageScrollableHeader
        value={scrollOffsetY}
        headerHeight={HEADER_HEIGHT}
        image={bgImage.image}
        id={id}
      />
      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        style={{ paddingTop: HEADER_HEIGHT }}
        contentContainerStyle={{
          // Android doesn't compensate automatically for the paddingTop automatically
          paddingBottom: Platform.OS === "android" ? HEADER_HEIGHT : null,
        }}
      >
        <View
          className="px-6"
          style={{ width: "100%", backgroundColor: Colors.white }}
        >
          {/* Article Header */}
          <ArticleTextHeader
            title={title}
            subtitle={subtitle ?? ""}
            time={time}
            category={t(`categories.${category}.title`)}
          />
          {/* Article Body */}
          <View className="mt-10">
            {body}

            {/* optional image */}
            {customImage && (
              <ArticleImage
                image={customImage.image}
                subtitle={customImage.subtitle}
              />
            )}
          </View>

          <View className="py-8">
            {relatedArticles.length > 0 ? (
              <DividerLine width={SCREEN_WIDTH * 0.65} />
            ) : (
              <View className="mt-6 h-4 w-full flex-row items-center justify-center">
                <Image
                  className="h-4 w-1/2"
                  source={logoImages.logo_braid_divider}
                />
              </View>
            )}
          </View>
          <View className="mb-12">
            {relatedArticles.length > 0 && (
              <React.Fragment>
                <View>
                  <Text className="pb-2 text-xl">
                    {t(`article_page.related_articles`)}
                  </Text>
                </View>
                <View className="my-4 items-center">
                  {relatedArticles.length > 0 &&
                    relatedArticles.map(
                      (
                        article: learnRelatedArticleCardTypes,
                        indexNum: number,
                      ) => <RelatedArticleCard {...article} key={indexNum} />,
                    )}
                </View>
              </React.Fragment>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ArticlePage;
