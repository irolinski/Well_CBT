import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import { useSelector } from "react-redux";
import ArrowRightButton from "@/components/ArrowRightButton";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import TypewriterText from "@/components/TypewriterText";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { RootState } from "@/state/store";

const BREATHE_IN_TIME_MS = 5000;
const HOLD_TIME_MS = 6000 - 500;
const BREATHE_OUT_TIME_MS = 7000;

const Ground_Body_Page_4 = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const innerCircleAnim = useRef(new Animated.Value(0.55)).current;
  const holdProgressBarAnim = useRef(
    new Animated.Value(-SCREEN_WIDTH * 0.75),
  ).current;
  const instruction2PositionAnim = useRef(new Animated.Value(0)).current;

  const [breatheState, setBreatheState] = useState<"in" | "out" | "hold">("in");
  const [instruction2IsActive, setInstruction2IsActive] = useState(false);

  const expandInnerCircleAnim = (duration: number) => {
    return Animated.timing(innerCircleAnim, {
      toValue: 0.95,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    });
  };

  const shrinkInnerCircleAnim = (duration: number) => {
    return Animated.timing(innerCircleAnim, {
      toValue: 0.65,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    });
  };

  const fillHoldProgressBarAnim = (duration: number) => {
    return Animated.timing(holdProgressBarAnim, {
      toValue: 0,
      duration: HOLD_TIME_MS,
      useNativeDriver: true,
      easing: Easing.linear,
    });
  };

  const liftInstruction2PositionAnim = (duration: number) => {
    return Animated.timing(instruction2PositionAnim, {
      toValue: -SCREEN_HEIGHT * 0.3,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    });
  };

  const animateinnerCircle = (duration: number) => {
    expandInnerCircleAnim(BREATHE_IN_TIME_MS).start(() => {
      setBreatheState("hold");
      fillHoldProgressBarAnim(HOLD_TIME_MS).start(() => {
        shrinkInnerCircleAnim(BREATHE_OUT_TIME_MS).start(() => {
          setInstruction2IsActive(true);
        });
        setBreatheState("out");
      });
    });
  };

  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      setTimeout(() => {
        animateinnerCircle(7000);
      }, 2000);
    }
  }, [groundYourselfToolState.currentSlide]);

  return (
    <GroundYourselfSlideFrame exerciseName={exerciseName}>
      <View
        style={{
          paddingTop: SCREEN_HEIGHT > 750 ? SCREEN_HEIGHT * 0.05 : null,
        }}
      >
        <FadeInView
          inputVal={1}
          outputVal={0}
          duration={1000}
          isActive={instruction2IsActive}
          onFinish={() => liftInstruction2PositionAnim(1000).start()}
        >
          <TypewriterText
            text="Ok, now, let's do another deep breath."
            size={20}
            cursorColor={Colors.mainGray}
            speed="very_fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
          />
          <TypewriterText
            text="(while noticing the sensations in your hands, legs, feet and back)"
            textColor={Colors.mainGray}
            size={12}
            speed="fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
            delaySeconds={1}
            showOverflow={true}
          />
          {/* Breather w/ Progress Bar */}
          <FadeInView
            isActive={groundYourselfToolState.currentSlide === objKey}
          >
            {/* Breather */}
            <View className="my-8 flex-row justify-center">
              <View
                className="h-56 w-56 rounded-full border"
                style={{
                  height: SCREEN_HEIGHT * 0.275,
                  width: SCREEN_HEIGHT * 0.275,
                  borderColor: Colors.mainGray,
                }}
              >
                <View className="absolute h-full w-full flex-row items-center justify-center">
                  <Text
                    className="z-10 text-2xl"
                    style={{ color: Colors.offWhite, fontFamily: "Kodchasan" }}
                  >
                    {breatheState}
                  </Text>
                </View>
                <Animated.View
                  className="relative h-full w-full items-center justify-center rounded-full"
                  style={{
                    backgroundColor: Colors.mainBlue,
                    transform: [{ scale: innerCircleAnim }],
                  }}
                ></Animated.View>
              </View>
            </View>
            {/* Progress bar */}
            <View className="absolute bottom-0 h-0 w-full">
              <View className="h-4 items-center">
                <View
                  className="absolute top-0 h-2 w-3/4 overflow-hidden rounded-xl border"
                  style={{ borderColor: Colors.mainGray }}
                >
                  <Animated.View
                    className="absolute top-0 h-2 w-full rounded-xl"
                    style={{
                      backgroundColor: Colors.mainGray,
                      transform: [{ translateX: holdProgressBarAnim }],
                    }}
                  />
                </View>
              </View>
            </View>
          </FadeInView>
        </FadeInView>
        <FadeInView
          isActive={instruction2IsActive}
          inputVal={0}
          duration={2500}
          style={{ transform: [{ translateY: instruction2PositionAnim }] }}
        >
          <View className="mb-8">
            <View>
              <TypewriterText
                text="Now, we'll head to the next exercise which will help ground you further"
                size={20}
                cursorColor={Colors.mainGray}
                speed="fast"
                delaySeconds={1.5}
                isActive={instruction2IsActive}
              />
            </View>
          </View>
          <FadeInView isActive={instruction2IsActive}>
            <TypewriterText
              text="(tap the button below to proceed)"
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={14}
              speed="very_fast"
              delaySeconds={6}
              isActive={instruction2IsActive}
            />
            <View
              className="w-full flex-row justify-center"
              style={{ top: SCREEN_HEIGHT * 0.05 }}
            >
              <ArrowRightButton onPress={() => onButtonPress()} />
            </View>
          </FadeInView>
        </FadeInView>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Body_Page_4;
