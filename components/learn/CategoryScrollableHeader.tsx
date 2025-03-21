import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Animated, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT } from '@/constants/styles/values';
import MenuNav from '../global/MenuNav';
import Text from '../global/Text';

type CategoryScrollableHeaderTypes = {
  title: string;
  value: any;
  headerHeight: number;
  image: Image;
};

const CategoryScrollableHeader = ({
  title,
  value,
  headerHeight,
  image,
}: CategoryScrollableHeaderTypes) => {
  const { t } = useTranslation(["learn", "common"]);

  const animateHeaderHeight = value.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: "clamp",
  });

  const hideNav = value.interpolate({
    inputRange: [0, headerHeight - 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View>
      <Animated.View
        className={`absolute top-2 z-30 flex-row`} //idk why top-2 works here but it does
        style={{ opacity: hideNav }}
      >
        <MenuNav
          name={t(`categories.${title}.title`)}
          backgroundColor="transparent"
        />
      </Animated.View>
      <Animated.View
        style={{
          width: "100%",
          height: animateHeaderHeight,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        {/* Text */}
        <Animated.View className="z-30" style={{ opacity: hideNav }}>
          <View
            className="flex-row justify-center"
            style={{ marginTop: SCREEN_HEIGHT * 0.03 }}
          >
            <Text
              className="text-center text-lg"
              style={{ color: Colors.white }}
            >
              {t("articles.category")}
            </Text>
          </View>
          <View className="mt-3 flex-row justify-center">
            <Text
              className="px-8 text-center text-4xl"
              style={{
                fontFamily: "KodchasanRegular",
                fontWeight: 400,
                color: Colors.white,
              }}
            >
              {t(`categories.${title}.title`)}
            </Text>
          </View>
          <View className="mt-7 flex-row justify-center">
            <Text
              className="mx-10 text-center text-base italic"
              style={{ color: Colors.white }}
            >
              {t(`categories.${title}.description`)}
            </Text>
          </View>
        </Animated.View>
        <Image
          style={{ width: "100%", height: "100%" }}
          className="absolute h-full w-full"
          source={image}
          cachePolicy="memory" // necessary to prevent image flicker onScroll
        />
      </Animated.View>
    </View>
  );
};

export default CategoryScrollableHeader;
