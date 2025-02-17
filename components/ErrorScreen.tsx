import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { Entypo } from '@expo/vector-icons';
import Text from './global/Text';

const ErrorScreen = () => {
  const { t } = useTranslation("common");
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="my-4 text-2xl font-bold">
        {t("errors.wrong_way.header_1")} ✋🏼
      </Text>
      <Text className="w-3/5 text-center text-lg">
        {t("errors.wrong_way.header_2")}
        {"\n"}
      </Text>
      <Text className="w-4/5 text-center text-base">
        {t("errors.wrong_way.body")}
      </Text>
      <Pressable
        className="mx-4 my-8 flex-row items-center justify-center rounded-lg border px-4 py-2"
        style={{ borderColor: Colors.mainGray }}
        onPress={() => router.back()}
      >
        <View className="mx-1">
          <Entypo name="chevron-left" size={24} />
        </View>
        <Text className="mx-1 font-semibold">{t("buttons.go_back")}</Text>
      </Pressable>
    </View>
  );
};

export default ErrorScreen;
