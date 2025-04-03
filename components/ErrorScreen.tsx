import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { Entypo } from "@expo/vector-icons";
import Text from "./global/Text";

const ErrorScreen = ({
  errorType,
  title,
  subheader,
  body,
  buttonTitle,
  onPress,
}: {
  errorType: "routing" | "rendering";
  title?: string;
  subheader?: string;
  body?: string;
  errorBody?: string;
  buttonTitle?: string;
  onPress?: () => void;
}) => {
  const { t } = useTranslation("common");
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="my-4 text-2xl font-bold">
        {title ? title : t("errors.wrong_way.header_1") + " ✋🏼"}
      </Text>
      <Text className="w-3/5 text-center text-lg">
        {subheader ? subheader : t("errors.wrong_way.header_2")}
        {"\n"}
      </Text>
      <Text className="w-4/5 text-center text-base">
        {body ? body : t("errors.wrong_way.body")}
      </Text>
      <Pressable
        className="mx-4 my-8 flex-row items-center justify-center rounded-lg border px-4 py-2"
        style={{ borderColor: Colors.mainGray }}
        onPress={() => {
          if (onPress) {
            onPress();
          } else {
            router.back();
          }
        }}
      >
        <View className="mx-1">
          <Entypo name="chevron-left" size={24} />
        </View>
        <Text className="mx-1 font-semibold">
          {buttonTitle ? buttonTitle : t("buttons.go_back")}
        </Text>
      </Pressable>
    </View>
  );
};

export default ErrorScreen;
