import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { Pressable, View } from "react-native";
import Text from "@/components/global/Text";
import { learnArticleCardTypes } from "@/constants/models/learn/learn";
import { Colors } from "@/constants/styles/colorTheme";
import { Feather } from "@expo/vector-icons";

const RelatedArticleCard = ({
  title,
  time,
  image,
  link,
}: learnArticleCardTypes) => {
  return (
    <Pressable
      className="rounded-2xl border px-4"
      style={{
        width: "100%",
        height: 140,
        borderColor: Colors.blackPearl,
      }}
      onPress={() => router.replace(link as Href)}
    >
      <View className="h-full flex-row">
        <View className="h-full w-2/5 justify-center">
          <Image className="h-24 w-24 rounded-xl" source={image} />
        </View>
        <View className="w-3/5">
          <View className="py-5">
            <View>
              <Text className="text-base">{title} </Text>
            </View>
            <View className="mt-2 flex-row items-end justify-between">
              <Text
                className="mb-2 text-sm"
                style={{ color: Colors.blackPearl }}
              >
                {time} min read
              </Text>
              <View
                className="items-center justify-center rounded-xl"
                style={{
                  width: 70,
                  height: 45,
                  backgroundColor: "#FF997C",
                }}
              >
                <Feather name="arrow-right" size={24} color={Colors.white} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
export default RelatedArticleCard;
