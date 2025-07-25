import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, Text, View } from "react-native";
import onboardingImages from "@/assets/images/home/onboarding";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";

const TIME_AFTER_ANIMATION_MS = 1500;

const Onboarding_SecuritySlide = ({
  slideKey,
  onboardingSlideNum,
  onFinish,
}: {
  slideKey: string;
  onboardingSlideNum: number;
  onFinish: () => void;
}) => {
  const { t } = useTranslation(["home", "common"]);

  const rotateSecurityKeyAnim = useRef(new Animated.Value(0)).current;

  const rotateSecurityKey = () => {
    return Animated.sequence([
      Animated.timing(rotateSecurityKeyAnim, {
        toValue: -15,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotateSecurityKeyAnim, {
        toValue: 15,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotateSecurityKeyAnim, {
        toValue: -10,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotateSecurityKeyAnim, {
        toValue: 10,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotateSecurityKeyAnim, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    if (onboardingSlideNum === Number(slideKey) - 1) {
      rotateSecurityKey().start(() =>
        setTimeout(() => onFinish(), TIME_AFTER_ANIMATION_MS),
      );
    }
  }, [onboardingSlideNum]);

  return (
    <View className="relative z-10 h-full w-full items-center" key={slideKey}>
      <View className="w-72">
        <Text
          className="text-center text-4xl"
          style={{
            color: Colors.offWhite,
            marginTop: SCREEN_HEIGHT * 0.125,
            marginBottom: 48,
          }}
        >
          {t("onboarding.privacy_text_1")}
        </Text>
        <Text
          className="text-center text-2xl"
          style={{
            color: Colors.offWhite,
          }}
        >
          {t("onboarding.privacy_text_2")}
        </Text>
      </View>
      <View className="h-1/2 justify-center">
        <View>
          <Image
            contentFit="contain"
            style={{ width: 150, height: 150 }}
            source={onboardingImages.security_lock}
          />
          <View
            style={{ transform: [{ translateX: -60 }, { translateY: -15 }] }}
          >
            <Animated.View
              style={{
                alignSelf: "center",
                transform: [
                  {
                    rotate: rotateSecurityKeyAnim.interpolate({
                      inputRange: [-15, 15],
                      outputRange: ["-15deg", "15deg"],
                    }),
                  },
                ],
              }}
            >
              <Image
                contentFit="contain"
                style={{ width: 100, height: 100 }}
                source={onboardingImages.security_key}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding_SecuritySlide;
