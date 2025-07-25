import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Easing,
  Modal,
  NativeSyntheticEvent,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import FadeInView from "@/components/global/FadeInView";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import {
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/constants/styles/values";
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
  const { t } = useTranslation("common");

  const refPagerView = useRef<PagerView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [skipButtonIsActive, setSkipButtonIsActive] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    refPagerView.current?.setPage(currentSlide + 1);
  }, [currentSlide]);

  const skipOnboarding = () => {
    refPagerView.current?.setPage(4);
    setSkipButtonIsActive(false);
  };

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
        className={`items-center justify-center px-4 ${SCREEN_HEIGHT > REFERENCE_SMALL_DEVICE_HEIGHT ? "pt-20" : "pt-12"}`}
        style={{
          top: 0,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: Colors.offWhite,
        }}
      >
        <FadeInView
          className={`absolute ${SCREEN_HEIGHT > REFERENCE_SMALL_DEVICE_HEIGHT && Platform.OS === "ios" ? "top-[7.5vh]" : "top-[5vh]"} z-20 h-8 w-full flex-row justify-end`}
          inputVal={0}
          outputVal={1}
          duration={1500}
          isActive={skipButtonIsActive}
        >
          <TouchableOpacity
            disabled={!skipButtonIsActive}
            activeOpacity={0.4}
            className={`h-12 w-24 flex-row items-center justify-center ${!skipButtonIsActive ? "opacity-0" : ""}`}
            onPress={() => {
              skipOnboarding();
            }}
          >
            <Text
              style={{
                color: Colors.darkGray,
                fontWeight: 400,
                fontSize: 18,
              }}
            >
              {t("buttons.skip").toUpperCase()}
            </Text>
          </TouchableOpacity>
        </FadeInView>

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
            slideKey="1"
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              slideDownBackgroundAnim().start(() => {
                nextSlide();
                setSkipButtonIsActive(true);
              });
            }}
          />
          <Onborading_Slide_2
            slideKey="2"
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
              setSkipButtonIsActive(false);
            }}
          />
          <Onboarding_Slide_3
            slideKey="3"
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_SecuritySlide
            slideKey="4"
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_LoadingSlide
            slideKey="5"
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_PaymentSlide
            slideKey="6"
            onboardingSlideNum={currentSlide}
            onFinish={() => {
              nextSlide();
            }}
          />
          <Onboarding_LastSlide
            slideKey="7"
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
            height: "135%",
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
