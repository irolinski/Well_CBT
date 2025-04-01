import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  NativeSyntheticEvent,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import Onboarding_LastSlide from "./last_slide";
import Onboarding_LoadingSlide from "./loading_slide";
import Onboarding_PaymentSlide from "./payment_slide";
import Onboarding_SecuritySlide from "./security_slide";
import Onborading_Slide_1 from "./slide_1";
import Onborading_Slide_2 from "./slide_2";
import Onboarding_Slide_3 from "./slide_3";

const AppOnboardingModal = ({
  isActive,
  onFinish,
}: {
  isActive: boolean;
  onFinish: () => void;
}) => {
  const refPagerView = useRef<PagerView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    refPagerView.current?.setPage(currentSlide + 1);
  }, [currentSlide]);

  const breathingViewTopOffsetAnim = useRef(new Animated.Value(0)).current;
  const breathingViewScaleAnim = useRef(new Animated.Value(1)).current;

  const breathingCircleBackgroundLoopAnim = () => {
    const AnimationBreathLength = 4000;
    const animationStartPosition = 1;
    const animationFinishPosition = 1.05;
    const microAnimationBetweenBreaths = 0.01;

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

  const slideDownBackgroundAnim = () => {
    return Animated.timing(breathingViewTopOffsetAnim, {
      toValue: SCREEN_HEIGHT * 0.27,
      duration: 3000,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    breathingCircleBackgroundLoopAnim().start();
  }, [breathingViewScaleAnim]);

  return (
    <Modal visible={isActive} className="flex-1" animationType="slide">
      <View
        className={`items-center justify-center px-4 ${SCREEN_HEIGHT > 850 ? "pt-20" : "pt-12"}`}
        style={{
          top: 0,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: Colors.offWhite,
        }}
      >
        {/* Logo and Title View */}
        <PagerView
          scrollEnabled={false}
          className="z-10 h-full w-full justify-center"
          initialPage={0}
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
          <Onborading_Slide_1
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              slideDownBackgroundAnim().start(() => {
                nextSlide();
              });
            }}
          />
          <Onborading_Slide_2
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_Slide_3
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_SecuritySlide
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_LoadingSlide
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_PaymentSlide
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_LastSlide
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              onFinish();
            }}
          />
        </PagerView>

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
