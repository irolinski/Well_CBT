import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("learn");

  return (
    <Pressable
      className="my-2 rounded-2xl border px-4"
      style={{
        width: "100%",
        height: 140,
        borderColor: Colors.lightGray,
      }}
      onPress={() => router.replace(link as Href)}
    >
      <View className="h-full flex-row">
        <View className="h-full w-2/5 justify-center">
          <Image className="h-24 w-24 rounded-xl" source={image} />
        </View>
        <View className="w-3/5">
          <View className="py-5">
            <View className="pb-3">
              <Text className="wrap h-12 w-full overflow-hidden text-base">
                {title}
              </Text>
            </View>
            <View className="flex-row items-end justify-between">
              <Text
                className="mb-2 text-sm"
                style={{ color: Colors.blackPearl }}
              >
                {t(`article_card.num_minute_read`, { num: time })}
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
