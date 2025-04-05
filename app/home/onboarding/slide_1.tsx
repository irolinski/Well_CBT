import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo/logo";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";

const INITIAL_DELAY_MS = 1000;
const LOGO_WORRY_X_OFFSET_INIT = -500;
const LOGO_WORRY_X_OFFSET_FINAL = -15;
const LOGO_FREE_X_OFFSET_INIT = 20;
const LOGO_FREE_X_OFFSET_FINAL = 65;

const Onborading_Slide_1 = ({
  slideKey,
  onboardingSlideNum,
  onFinish,
}: {
  slideKey: string;
  onboardingSlideNum: number;
  onFinish: () => void;
}) => {
  const [hasFinished, setHasFinished] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<
    null | "show_logo_view" | "show_title_view" | "hide_logo_view"
  >(null);

  const logoWorryXOffsetAnim = useRef(
    new Animated.Value(LOGO_WORRY_X_OFFSET_INIT),
  ).current;
  const logoFreeXOffsetAnim = useRef(
    new Animated.Value(LOGO_FREE_X_OFFSET_INIT),
  ).current;

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

  const onLogoViewFadeIn = () => {
    setTimeout(() => runLogoAnimation(), INITIAL_DELAY_MS);
  };

  const onTitleViewFadeIn = () => {
    setTimeout(() => setCurrentAnimation("hide_logo_view"), 1000);
  };

  useEffect(() => {
    if (onboardingSlideNum === Number(slideKey) - 1) {
      setTimeout(() => {
        setCurrentAnimation("show_logo_view");
      }, INITIAL_DELAY_MS);
    }
  }, [onboardingSlideNum]);

  return (
    <FadeInView
      className="z-10 h-full w-full items-center justify-center"
      key={slideKey} //obligatory for outside PagerView
      inputVal={1}
      outputVal={0}
      isActive={currentAnimation === "hide_logo_view"}
      duration={2000}
      onFinish={() => {
        onFinish();
      }}
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
          onFinish={() => onTitleViewFadeIn()}
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
  );
};

export default Onborading_Slide_1;
