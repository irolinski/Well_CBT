import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Text from "@/components/global/Text";
import DividerLine from "../global/DividerLine";

type ArticleTextHeaderTypes = {
  title: string;
  subtitle: string;
  time?: number;
  category: string;
};

const ArticleTextHeader = ({
  title,
  subtitle,
  time,
  category,
}: ArticleTextHeaderTypes) => {
  const { t } = useTranslation("learn");

  return (
    <View>
      <View className="mt-3.5 flex-row justify-between">
        <Text className="text-center text-base">{category}</Text>
        <Text className="italic opacity-80">
          {t(`article_page.num_minute_read`, { num: time })}
        </Text>
      </View>
      <View className="mt-7 flex-row justify-center">
        <Text
          className="px-8 text-center text-3xl"
          style={{ fontFamily: "KodchasanRegular", fontWeight: 400 }}
        >
          {title}
        </Text>
      </View>

      {subtitle ? (
        <View className="mt-7 flex-row justify-center">
          <Text className="mx-2 text-center text-base italic">{subtitle}</Text>
        </View>
      ) : (
        <View className="mt-12">
          <DividerLine width={150} />
        </View>
      )}
    </View>
  );
};
export default ArticleTextHeader;
