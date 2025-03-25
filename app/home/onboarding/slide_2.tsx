import React, { useCallback, useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import FadeInView from "@/components/FadeInView";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import Onboarding_Feat_Breathing from "./feature_slides/breathing";
import Onboarding_Feat_CDA_1 from "./feature_slides/cda_1";

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
  const [currentSlide, setCurrentSlide] = useState<Number | null>(null);
  const refPagerView = useRef<PagerView>(null);

  const nextSlide = useCallback(() => {
    typeof currentSlide === "number" &&
      refPagerView.current?.setPage(currentSlide + 1);
  }, [currentSlide]);

  useEffect(() => {
    if (onboardingSlideNum === Number(THIS_SLIDE_KEY) - 1) {
      setCurrentAnimation("fade_in_header");
    }
  }, [onboardingSlideNum]);

  useEffect(() => {
    if (currentAnimation === "fade_in_header") {
      setCurrentSlide(0);
    }
  }, [currentAnimation]);

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
      <PagerView
        className="absolute bottom-0 h-2/3 w-full items-center justify-center border"
        ref={refPagerView}
        onPageSelected={(
          evt: NativeSyntheticEvent<
            Readonly<{
              position: Double;
            }>
          >,
        ) => {
          setCurrentSlide(evt.nativeEvent.position);
        }}
      >
        {/* empty slide to prevent the animation on first page from running immediately */}
        <FadeInView
          key="1"
          isActive={currentAnimation === "fade_in_header"}
          duration={2000}
          onFinish={() => nextSlide()}
        >
          {null}
        </FadeInView>
        {/* empty slide to prevent the animation on first page from running immediately */}

        <Onboarding_Feat_Breathing
          slideNum={typeof currentSlide === "number" ? currentSlide : null}
          onFinish={() => {
            nextSlide();
          }}
        />
        <Onboarding_Feat_CDA_1
          slideNum={typeof currentSlide === "number" ? currentSlide : null}
        />
        {/* 
        <View className="items-center" key="2">
          <Text className="text-3xl" style={{ color: Colors.offWhite }}>
            Turn your negative thoughts...
          </Text>
        </View> */}
        {/*
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
