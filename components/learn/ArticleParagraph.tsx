import Text from "@/components/global/Text";
import { View } from "react-native";

type ArticleParagraphTypes = {
  header: string;
  body: string;
};

const ArticleParagraph = ({ header, body }: ArticleParagraphTypes) => {
  return (
    <View className="mt-3">
      <Text className="w-3/4 text-lg font-semibold">{header} </Text>
      <Text className="m-3 text-base leading-6">{body}</Text>
    </View>
  );
};
export default ArticleParagraph;
