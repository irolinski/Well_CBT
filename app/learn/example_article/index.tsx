import React, { useRef } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import { learnImages } from "@/assets/images/learn/images";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import ArticleImage from "@/components/learn/ArticleImage";
import ArticleParagraph from "@/components/learn/ArticleParagraph";
import ArticleTextHeader from "@/components/learn/ArticleTextHeader";
import RelatedArticleCard from "@/components/learn/RelatedArticleCard";

import ArticleHeader from "./ArticleImageScrollableHeader";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const headerHeight = windowHeight * 0.4;

const ArticlePage = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: false,
    },
  );

  return (
    <View>
      {/* Page Header */}
      <ArticleHeader
        value={scrollOffsetY}
        headerHeight={headerHeight}
        image={learnImages[0]}
      />
      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        style={{ paddingTop: headerHeight }}
      >
        <View
          className="px-6"
          style={{ width: "100%", backgroundColor: "#FFFFFF" }}
        >
          {/* Article Header */}
          <ArticleTextHeader
            title="10 suprising benefits of breathwork"
            subtitle="How young millenial queens are rocking the Tesla-inspired post-slow-fashion movement"
            time={10}
            category="Science"
          />
          {/* Article Body */}
          <View className="mt-10">
            {/* Single paragraph w/ header */}
            <ArticleParagraph
              header="Header 1"
              body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Duis laoreet gravida mauris nec pulvinar. Vivamus nec pulvinar odio.Duis venenatis gravida nunc, ac laoreet turpis tristique a. Vestibulum sagittis volutpat condimentum. Aliquam accumsan ex eumagna dignissim blandit. Sed odio tellus, tempor sed pharetraeu, tincidunt sit amet neque. Integer lobortis at mauris inelementum. Maecenas pulvinar aliquam molestie. Aliquam efficiturmagna nec orci sollicitudin faucibus. Nullam ut accumsan eros.In vel nunc eu nibh condimentum ultricies. Pellentesque finibusorci eu arcu eleifend, vel scelerisque nunc gravida. Sedpulvinar porttitor dignissim. Maecenas nisi arcu, convallis euviverra et, hendrerit ac quam.`}
            />
            {/* optional image */}
            <ArticleImage
              image={learnImages[1]}
              subtitle="Marsz pingwinów, 2012"
            />
          </View>
          <View className="py-8">
            <DividerLine width={windowWidth * 0.65} />
          </View>
          <View className="mb-12">
            <View>
              <Text className="pb-6 text-xl">Related Articles</Text>
            </View>
            <View className="my-4 items-center">
              <RelatedArticleCard
                name="10 suprising benefits of breathwork"
                time={10}
                image={learnImages[0]}
                link="/"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ArticlePage;
