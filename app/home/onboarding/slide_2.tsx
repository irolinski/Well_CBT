import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import FadeInView from "@/components/FadeInView";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import Onboarding_Feat_Breathing from "./feature_slides/breathing";

const THIS_SLIDE_KEY = "2";

const Onboarding_Slide_2 = ({
  onboardingSlideNum,
  onFinish,
}: {
  onboardingSlideNum: number;
  onFinish?: () => void;
}) => {
  const [currentAnimation, setCurrentAnimation] = useState<
    "fade_in_header" | null
  >(null);
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);

  useEffect(() => {
    if (onboardingSlideNum === Number(THIS_SLIDE_KEY) - 1) {
      setCurrentAnimation("fade_in_header");
      setCurrentSlide(0);
    }
  }, [onboardingSlideNum]);

  return (
    <FadeInView
      className="relative z-10 h-full w-full items-center justify-start"
      key={THIS_SLIDE_KEY}
      inputVal={0}
      outputVal={1}
      duration={1500}
      isActive={currentAnimation === "fade_in_header"}
    >
      <Text
        className="absolute w-64 text-center text-4xl"
        style={{ color: Colors.offWhite, top: SCREEN_HEIGHT * 0.15 }}
      >
        WorryFree will help you to:
      </Text>
      <PagerView className="absolute bottom-0 h-2/3 w-full items-center justify-center border">
        <Onboarding_Feat_Breathing slideNum={currentSlide} />
        {/* <View className="items-center" key="2">
          <Text className="text-3xl" style={{ color: Colors.offWhite }}>
            Turn your negative thoughts...
          </Text>
        </View>
        <View className="items-center" key="3">
          <Text className="text-3xl" style={{ color: Colors.offWhite }}>
            ...into more rational ones
          </Text>
        </View>
        <View className="items-center" key="4">
          <Text className="text-3xl" style={{ color: Colors.offWhite }}>
            Keep a daily mood journal
          </Text>
        </View> */}
      </PagerView>
    </FadeInView>
  );
};

export default Onboarding_Slide_2;
