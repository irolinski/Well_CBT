import MenuNav from "@/components/global/MenuNav";
import LearnArticleCard from "@/components/learn/ArticleCard";
import { learnArticles } from "@/constants/models/learn_articles";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";

const index = () => {
  const category: string = useLocalSearchParams<{ category: string }>()
    .category;

  const articles = learnArticles.filter((a) => a.category === category);

  return (
    <ScrollView>
      <MenuNav name="Learn" />
      <View className="mx-4 pt-4">
        <View>
          <Text className="mb-6 mt-2 text-left text-2xl">Articles</Text>
          <View className="items-center justify-center">
            {articles.map((el, index: number) => (
              <View className="flex-1" key={index}>
                <LearnArticleCard
                  title={el.title}
                  subtitle={el.subtitle}
                  time={el.time}
                  link={`./${category}/${el.id}`}
                  image={el.bgImage}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default index;
