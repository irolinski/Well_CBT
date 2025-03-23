import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Modal, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo/logo";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";

const INITIAL_DELAY_MS = 1000;
const LOGO_WORRY_X_OFFSET_INIT = -500;
const LOGO_WORRY_X_OFFSET_FINAL = -15;
const LOGO_FREE_X_OFFSET_INIT = 20;
const LOGO_FREE_X_OFFSET_FINAL = 65;

const AppOnboardingModal = () => {
  const [currentAnimation, setCurrentAnimation] = useState<
    null | "show_logo_view" | "show_title_view" | "hide_logo_view"
  >(null);

  const breathingViewTopOffsetAnim = useRef(new Animated.Value(0)).current;
  const breathingViewScaleAnim = useRef(new Animated.Value(1)).current;

  const logoWorryXOffsetAnim = useRef(
    new Animated.Value(LOGO_WORRY_X_OFFSET_INIT),
  ).current;
  const logoFreeXOffsetAnim = useRef(
    new Animated.Value(LOGO_FREE_X_OFFSET_INIT),
  ).current;

  const slideDownBackgroundAnim = () => {
    return Animated.timing(breathingViewTopOffsetAnim, {
      toValue: SCREEN_HEIGHT * 0.33,
      duration: 3000,
      useNativeDriver: true,
    });
  };

  const logoMoveFreeOffCenterAnim = () => {
    return Animated.timing(logoFreeXOffsetAnim, {
      toValue: LOGO_FREE_X_OFFSET_FINAL,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const logoSlideInWorryAnim = () => {
    return Animated.timing(logoWorryXOffsetAnim, {
      toValue: LOGO_WORRY_X_OFFSET_FINAL,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const runLogoAnimation = () => {
    logoMoveFreeOffCenterAnim().start(() =>
      logoSlideInWorryAnim().start(() => {
        setTimeout(() => setCurrentAnimation("show_title_view"), 1000);
      }),
    );
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

  const onLogoViewFadeIn = () => {
    setTimeout(() => runLogoAnimation(), INITIAL_DELAY_MS);
  };

  const onTitleAnimFinish = () => {
    slideDownBackgroundAnim().start(() =>
      setCurrentAnimation("hide_logo_view"),
    );
  };

  useEffect(() => {
    breathingCircleBackgroundLoopAnim().start();
    setTimeout(() => {
      setCurrentAnimation("show_logo_view");
    }, INITIAL_DELAY_MS);
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
        {/* Logo and Title View */}
        <FadeInView
          className="z-10 items-center"
          inputVal={1}
          outputVal={0}
          duration={2000}
          isActive={currentAnimation === "hide_logo_view"}
        >
          {/* Logo */}
          <FadeInView
            className="flex-row justify-center"
            style={{
              height: 85,
              transform: [{ translateX: 15 }],
            }}
            duration={1000}
            inputVal={0}
            outputVal={1}
            isActive={currentAnimation === "show_logo_view"}
            onFinish={() => onLogoViewFadeIn()}
          >
            <Animated.View
              style={{
                position: "absolute",
                width: "90%",
                height: "90%",
                transform: [{ translateX: logoWorryXOffsetAnim }],
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                }}
                contentFit="contain"
                source={logoImages.logo_split_worry}
              />
            </Animated.View>
            <Animated.View
              style={{
                width: "90%",
                height: "90%",
                transform: [{ translateX: logoFreeXOffsetAnim }],
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                }}
                contentFit="contain"
                source={logoImages.logo_split_free}
              />
            </Animated.View>
          </FadeInView>
          {/* Title */}
          <View className="mt-2">
            <FadeInView
              className="items-center"
              isActive={currentAnimation === "show_title_view"}
              inputVal={0}
              outputVal={1}
            >
              <Text
                style={{
                  color: Colors.offWhite,
                  fontSize: 32,
                  fontWeight: 500,
                }}
              >
                WorryFree
              </Text>
            </FadeInView>
            <FadeInView
              isActive={currentAnimation === "show_title_view"}
              inputVal={0}
              outputVal={0.9}
              onFinish={() => onTitleAnimFinish()}
            >
              <Text
                className="mt-1 text-center"
                style={{ color: Colors.offWhite, fontSize: 20 }}
              >
                Your Pocket CBT Aid
              </Text>
            </FadeInView>
          </View>
        </FadeInView>

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
              ],
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AppOnboardingModal;
