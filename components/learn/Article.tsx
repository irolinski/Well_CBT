import { Image } from "expo-image";
import React, { useRef } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo/logo";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import ArticleImage from "@/components/learn/ArticleCustomImage";
import ArticleParagraph from "@/components/learn/ArticleParagraph";
import ArticleTextHeader from "@/components/learn/ArticleTextHeader";
import RelatedArticleCard from "@/components/learn/RelatedArticleCard";
import { learnArticles } from "@/constants/models/learn/articles";
import { articleParagraph, ArticleTypes } from "@/constants/models/learn/learn";
import { Colors } from "@/constants/styles/colorTheme";
import ArticleImageScrollableHeader from "./ArticleImageScrollableHeader";

const getRelatedArticles = (idArr: number[] | undefined) => {
  let relatedArticlesArr: ArticleTypes[] = [];
  if (idArr) {
    idArr.map((id: number) => {
      let relatedArticle = learnArticles.find((a) => a.id === id);
      relatedArticle && relatedArticlesArr.push(relatedArticle);
    });
  }
  return relatedArticlesArr;
};

const ArticlePage = ({
  title,
  subtitle,
  category,
  time,
  bgImage,
  articleBody,
  customImage,
  relatedArticleIds,
  id,
}: ArticleTypes) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const headerHeight = windowHeight * 0.4;
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const relatedArticles = getRelatedArticles(relatedArticleIds);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: false,
    },
  );

  return (
    <View>
      {/* Page Header */}
      <ArticleImageScrollableHeader
        value={scrollOffsetY}
        headerHeight={headerHeight}
        image={bgImage.image}
        id={id}
      />
      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        style={{ paddingTop: headerHeight }}
      >
        <View
          className="px-6"
          style={{ width: "100%", backgroundColor: Colors.white }}
        >
          {/* Article Header */}
          <ArticleTextHeader
            title={title}
            subtitle={subtitle}
            time={time}
            category={category}
          />
          {/* Article Body */}
          <View className="mt-10">
            {/* Single paragraph w/ header */}
            {articleBody.map((p: articleParagraph, index: number) => (
              <ArticleParagraph header={p.header} body={p.body} key={index} />
            ))}
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
              <DividerLine width={windowWidth * 0.65} />
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
                  <Text className="pb-2 text-xl">Related Articles</Text>
                </View>
                <View className="my-4 items-center">
                  {relatedArticles.length > 0 &&
                    relatedArticles.map(
                      (article: ArticleTypes, indexNum: number) => (
                        <RelatedArticleCard
                          title={article.title}
                          time={article.time}
                          image={article.bgImage.image}
                          link={`/learn/categories/${article.category}/${article.id}`}
                          key={indexNum}
                        />
                      ),
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
