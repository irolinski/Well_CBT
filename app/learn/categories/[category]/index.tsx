import MenuNav from "@/components/global/MenuNav";
import LearnArticleCard from "@/components/learn/ArticleCard";
import { learnArticles } from "@/constants/models/learn_articles";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView } from "react-native";
import { View, Text } from "react-native";

const index = () => {
  const windowHeight = Dimensions.get("window").height;

  const category: string = useLocalSearchParams<{ category: string }>()
    .category;

  const articles = learnArticles.filter((a) => a.category === category);

  return (
    <ScrollView>
      <View style={{ width: "100%", height: windowHeight * 0.55 }}>
        <View className="relative z-30 mb-12 justify-center">
          <MenuNav name="Learn" backgroundColor="transparent" />
        </View>
        <View className="relative z-30">
          <View
            className="flex-row justify-center"
            style={{ marginTop: windowHeight * 0.03 }}
          >
            <Text className="text-center text-lg" style={{ color: "#FFFFFF" }}>
              Category
            </Text>
          </View>
          <View className="mt-3 flex-row justify-center">
            <Text
              className="px-8 text-center text-4xl"
              style={{
                fontFamily: "KodchasanRegular",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              Science
            </Text>
          </View>
          <View className="mt-7 flex-row justify-center">
            <Text
              className="mx-10 text-center text-base italic"
              style={{ color: "#FFFFFF" }}
            >
              “All of science is nothing more than the refinement of everyday
              thinking.”
              {" \n"}
              {" \n"}- Albert Einstein
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={["rgba(115, 132, 141, 1)", "rgba(0, 0, 0, 0.65)"]}
          start={[0, 0]}
          end={[0, 1]}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 10,
          }}
        ></LinearGradient>
        <Image
          className="absolute h-full w-full"
          source={require("@/assets/images/learn/telescope.jpg")}
        />
      </View>
      <View className="m-4">
        <View>
          <Text className="mt-2 text-left text-2xl">Articles</Text>
          <View className="items-center justify-center">
            {articles.map((el, index: number) => (
              <View className="mt-5 flex-1" key={index}>
                <LearnArticleCard
                  title={el.title}
                  subtitle={el.subtitle}
                  time={el.time}
                  link={`./${category}/${el.id}`}
                  image={el.bgImage}
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
  );
};
export default index;
