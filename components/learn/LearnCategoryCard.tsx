import { Image, ImageBackground } from 'expo-image';
import { Href, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Text from '@/components/global/Text';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_WIDTH } from '@/constants/styles/values';
import { Feather } from '@expo/vector-icons';

export type LearnCategoryCardTypes = {
  name: string;
  backgroundImage: Image;
  link: string;
  disabled?: boolean;
};

const LearnCategoryCard = ({
  name,
  backgroundImage,
  link,
  disabled = false,
}: LearnCategoryCardTypes) => {
  const { t } = useTranslation("common");

  return (
    <Pressable
      className="m-2.5 overflow-hidden rounded-xl"
      style={{
        height: 0.4 * SCREEN_WIDTH,
        width: 0.4 * SCREEN_WIDTH,
      }}
      disabled={disabled}
      onPress={() => router.push(`${link}` as Href)}
    >
      <ImageBackground source={backgroundImage}>
        <View className="h-1/2 items-center justify-center pt-6">
          <Text
            className={`${disabled ? "absolute bottom-0 pb-1" : ""}`}
            style={{ color: Colors.white }}
          >
            {name}
          </Text>
        </View>
        <View className="h-1/2 items-center justify-center">
          {!disabled ? (
            <TouchableOpacity
              className="mx-1 items-center justify-center rounded-xl"
              style={{
                width: 100,
                height: 45,
                backgroundColor: Colors.offWhite,
              }}
              onPress={() => router.push(`${link}` as Href)}
            >
              <View>
                <Feather name="arrow-right" size={24} color={Colors.darkGray} />
              </View>
            </TouchableOpacity>
          ) : (
            <View
              className="items-center justify-center"
              style={{
                width: "100%",
                height: 45,
                backgroundColor: Colors.offWhite,
                transform: [{ skewY: "-15deg" }],
              }}
            >
              <Text className="mx-2" style={{ color: Colors.offBlack }}>
                {t("instructions.coming_soon")}
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );
};
export default LearnCategoryCard;
