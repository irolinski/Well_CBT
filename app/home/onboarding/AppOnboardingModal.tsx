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
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import Onborading_Slide_1 from "./slide_1";

const AppOnboardingModal = () => {
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
        <PagerView
          scrollEnabled={false}
          className="z-10 h-full w-full justify-center border"
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
            slideNum={currentSlide}
            onFinish={() => {
              slideDownBackgroundAnim().start(() => {
                nextSlide();
              });
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
