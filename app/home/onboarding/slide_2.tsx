import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NativeSyntheticEvent, Text } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import FadeInView from "@/components/FadeInView";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import Onboarding_Feat_Breathing from "./feature_slides/breathing";
import Onboarding_Feat_CDA_1 from "./feature_slides/cda_1";
import Onboarding_Feat_CDA_2 from "./feature_slides/cda_2";
import Onboarding_Feat_Journal from "./feature_slides/journal";
import Onboarding_Feat_Last from "./feature_slides/last";

const Onboarding_Slide_2 = ({
  slideKey,
  onboardingSlideNum,
  onFinish,
}: {
  slideKey: string;
  onboardingSlideNum: number;
  onFinish: () => void;
}) => {
  const { t } = useTranslation(["home", "common"]);

  const [currentAnimation, setCurrentAnimation] = useState<
    "fade_in_header" | null
  >(null);
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);
  const refPagerView = useRef<PagerView>(null);

  const nextSlide = useCallback(() => {
    if (typeof currentSlide === "number") {
      refPagerView.current?.setPage(currentSlide + 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    if (onboardingSlideNum === Number(slideKey) - 1) {
      setCurrentAnimation("fade_in_header");
      setCurrentSlide(0);
    }
  }, [onboardingSlideNum]);

  return (
    <FadeInView
      className="relative z-10 h-full w-full items-center justify-start"
      key={slideKey}
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
        className="absolute bottom-0 h-2/3 w-full items-center justify-center"
        ref={refPagerView}
        initialPage={0}
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
          slideKey="2"
          slideNum={typeof currentSlide === "number" ? currentSlide : null}
          onFinish={() => {
            setTimeout(() => nextSlide(), 1500);
          }}
        />
        <Onboarding_Feat_CDA_1
          slideKey="3"
          slideNum={typeof currentSlide === "number" ? currentSlide : null}
          onFinish={() => {
            setTimeout(() => nextSlide(), 1500);
          }}
        />
        <Onboarding_Feat_CDA_2
          slideKey="4"
          slideNum={typeof currentSlide === "number" ? currentSlide : null}
          onFinish={() => {
            setTimeout(() => nextSlide(), 1500);
          }}
        />
        <Onboarding_Feat_Journal
          slideKey="5"
          slideNum={typeof currentSlide === "number" ? currentSlide : null}
          onFinish={() => nextSlide()}
        />
        <Onboarding_Feat_Last
          slideKey="6"
          slideNum={typeof currentSlide === "number" ? currentSlide : null}
          onFinish={() => {
            onFinish();
          }}
        />
      </PagerView>
    </FadeInView>
  );
};

export default Onboarding_Slide_2;
