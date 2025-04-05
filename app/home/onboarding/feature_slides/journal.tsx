import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, Text, View } from "react-native";
import onboardingImages from "@/assets/images/home/onboarding/images";
import FadeInView from "@/components/FadeInView";
import { Colors } from "@/constants/styles/colorTheme";

const Onboarding_Feat_Journal = ({
  slideKey,
  slideNum,
  onFinish,
}: {
  slideKey: string;
  slideNum: number | null;
  onFinish: () => void;
}) => {
  const { t } = useTranslation(["home", "common"]);

  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedX = useRef(new Animated.Value(0)).current;
  const animatedY = useRef(new Animated.Value(0)).current;

  const animationFrames = [
    { rotate: "0deg", x: 0, y: 0 },
    { rotate: "-3deg", x: 2.18, y: 2.53 },
    { rotate: "0deg", x: 0, y: 0 },
    { rotate: "-3deg", x: 2.18, y: 2.53 },
    { rotate: "0deg", x: 0, y: 0 },
    { rotate: "5deg", x: 3.33, y: 4.46 },
    { rotate: "0deg", x: 0, y: 0 },
    { rotate: "10deg", x: 6.27, y: 9.18 },
    { rotate: "0deg", x: 0, y: 0 },
    { rotate: "-3deg", x: 2.23, y: 3 },
    { rotate: "0deg", x: 0, y: 0 },
  ];

  const animations = animationFrames.map(({ rotate, x, y }) =>
    Animated.parallel([
      Animated.timing(animatedRotation, {
        toValue: parseFloat(rotate),
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedX, {
        toValue: x,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedY, {
        toValue: y,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  );

  const loopedAnimation = () => {
    return Animated.loop(Animated.sequence(animations), {
      iterations: 2,
    });
  };

  useEffect(() => {
    if (slideNum === Number(slideKey) - 1) {
      loopedAnimation().start(() => {
        onFinish();
      });
    }
  }, [slideNum]);

  return (
    <View className="items-center" key={slideKey}>
      <Text className="mt-4 text-3xl" style={{ color: Colors.offWhite }}>
        {t("onboarding.feature_slides.journal")}
      </Text>
      <FadeInView className="mt-20 flex-row">
        <View style={{ transform: [{ translateX: -70 }, { translateY: -10 }] }}>
          <Animated.View
            style={{
              zIndex: 10,
              transform: [
                {
                  rotate: animatedRotation.interpolate({
                    inputRange: [-10, 10],
                    outputRange: ["-10deg", "10deg"],
                  }),
                },
                { translateX: animatedX },
                { translateY: animatedY },
              ],
            }}
          >
            <Image
              source={onboardingImages.writing_hand}
              style={{
                height: 176,
                width: 150,
                transform: [{ translateX: 80 }, { translateY: -20 }],
              }}
            />
          </Animated.View>
        </View>
        <View style={{ zIndex: 0 }}>
          <Image
            source={onboardingImages.writing_writing}
            style={{
              height: 176,
              width: 210,
              transform: [{ translateX: -40 }],
            }}
          />
        </View>
      </FadeInView>
    </View>
  );
};

export default Onboarding_Feat_Journal;
