import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Modal, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo/logo";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";

const AppOnboardingModal = () => {
  const breathingViewTopOffsetAnim = useRef(new Animated.Value(0)).current;
  const breathingViewScaleAnim = useRef(new Animated.Value(1)).current;

  const slideDownBackgroundAnim = () => {
    return Animated.timing(breathingViewTopOffsetAnim, {
      toValue: SCREEN_HEIGHT * 0.33,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const breathingCircleBackgroundLoopAnim = () => {
    const AnimationBreathLength = 4000;
    const animationStartPosition = 1;
    const animationFinishPosition = 1.1;
    const microAnimationBetweenBreaths = 0.015;

    return Animated.loop(
      Animated.sequence([
        Animated.timing(breathingViewScaleAnim, {
          toValue: animationFinishPosition,
          duration: AnimationBreathLength,
          useNativeDriver: true,
        }),
        Animated.timing(breathingViewScaleAnim, {
          toValue: animationFinishPosition + microAnimationBetweenBreaths,
          duration: AnimationBreathLength / 3,
          useNativeDriver: true,
        }),
        Animated.timing(breathingViewScaleAnim, {
          toValue: animationFinishPosition,
          duration: AnimationBreathLength / 3,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(AnimationBreathLength / 3),
        Animated.timing(breathingViewScaleAnim, {
          toValue: animationStartPosition,
          duration: AnimationBreathLength,
          useNativeDriver: true,
        }),
        Animated.timing(breathingViewScaleAnim, {
          toValue: animationStartPosition - microAnimationBetweenBreaths,
          duration: AnimationBreathLength / 3,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(breathingViewScaleAnim, {
          toValue: animationStartPosition,
          duration: AnimationBreathLength / 3,
          useNativeDriver: true,
        }),
        Animated.delay(AnimationBreathLength / 3),
      ]),
    );
  };

  useEffect(() => {
    breathingCircleBackgroundLoopAnim().start();
  }, [breathingViewScaleAnim]);

  return (
    <Modal visible={true} className="flex-1">
      <View
        className={`items-center justify-center px-4 ${SCREEN_HEIGHT > 850 ? "py-20" : "py-12"}`}
        style={{
          top: 0,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: Colors.offWhite,
        }}
      >
        {/* logo */}
        <View className="z-10 items-center">
          <View
            className="flex-row justify-center"
            style={{
              height: 85,
              width: 85 + 75,
              transform: [{ translateX: 15 }], // centers image in the View
            }}
          >
            <Image
              className="absolute"
              style={{
                width: 181,
                height: 76,
                transform: [{ translateX: -15 }],
                // transform: [{ translateX: -500 }], // hide out of bounds to the left
              }}
              contentFit="contain"
              source={logoImages.logo_split_worry}
            />
            <Image
              className=""
              style={{
                width: 118,
                height: 76,
                // transform: [{ translateX: 75 / 4 }], // to center alone
                transform: [{ translateX: 65 }], // to fit with worry
              }}
              contentFit="contain"
              source={logoImages.logo_split_free}
            />
          </View>
          <Text
            style={{ color: Colors.offWhite, fontSize: 32, fontWeight: 500 }}
          >
            WorryFree
          </Text>
          <Text
            className="mt-4 text-center"
            style={{ color: Colors.offWhite, fontSize: 20 }}
          >
            Your pocket CBT aid
          </Text>
        </View>

        {/* Background */}
        <Animated.View
          className="absolute h-full"
          style={{
            width: "200%",
            height: "150%",
            transform: [{ translateY: breathingViewTopOffsetAnim }],
          }}
        >
          <Animated.View
            className="absolute h-full w-full rounded-full"
            style={{
              backgroundColor: Colors.mainBlue,
              transform: [
                {
                  scale: breathingViewScaleAnim,
                },
              ], // Explicitly type cast here
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AppOnboardingModal;
