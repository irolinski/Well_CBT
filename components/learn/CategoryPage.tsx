import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import LearnArticleCard from "@/components/learn/ArticleCard";
import { learnArticles } from "@/constants/models/learn/articles";
import { learnCategories } from "@/constants/models/learn/categories";
import ErrorScreen from "../ErrorScreen";
import Text from "../global/Text";
import CategoryScrollableHeader from "./CategoryScrollableHeader";

const CategoryPage = () => {
  const windowHeight = Dimensions.get("window").height;
  const headerHeight = windowHeight * 0.5;
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: false,
    },
  );

  const categoryTitle: string = useLocalSearchParams<{ category: string }>()
    .category;
  const articles = learnArticles.filter((a) => a.category === categoryTitle);
  const categoryData = learnCategories.find((c) => c.title === categoryTitle);

  if (articles.length > 0 && categoryData) {
    return (
      <React.Fragment>
        <CategoryScrollableHeader
          value={scrollOffsetY}
          headerHeight={headerHeight}
          {...categoryData}
        />
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "#FBFBFB",
            paddingTop: headerHeight,
          }}
          onScroll={handleScroll}
        >
          <View className="ml-8 mt-4">
            <Text className="text-2xl">Articles</Text>
          </View>
          <View className="mx-4 mb-4">
            <View style={{ backgroundColor: "#FBFBFB" }}>
              <View className="items-center justify-center">
                {articles.map((el, index: number) => (
                  <View className="mt-5 flex-1" key={index}>
                    <LearnArticleCard
                      title={el.title}
                      subtitle={el.subtitle}
                      time={el.time}
                      link={`./${categoryTitle}/${el.id}`}
                      image={el.bgImage.image}
                      imagePlacement={el.bgImage.cardPlacementY}
                      frameColor={categoryData.color}
                    />
                  </View>
                ))}
                <View className="my-5 w-full flex-row justify-end px-6">
                  <Text>
                    Showing {articles.length} of {articles.length}
                  </Text>
                </View>
              </View>
            </View>
            <View className="mb-12 mt-6 h-4 w-full flex-row items-center justify-center">
              <Image
                className="h-4 w-1/2"
                source={require("@/assets/images/logo_braid.webp")}
              />
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  } else {
    return <ErrorScreen />;
  }
};
export default CategoryPage;
