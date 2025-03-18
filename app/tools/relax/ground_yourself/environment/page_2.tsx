import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, View } from 'react-native';
import { useSelector } from 'react-redux';
import ArrowRightButton from '@/components/ArrowRightButton';
import FadeInView from '@/components/FadeInView';
import Text from '@/components/global/Text';
import GroundYourselfSlideFrame from '@/components/tools/ground_yourself/GroundYourselfSlideFrame';
import TypewriterText from '@/components/TypewriterText';
import { GroundYourselfSlideProps } from '@/constants/models/tools/ground_yourself';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/styles/values';
import { RootState } from '@/state/store';

const BREATHE_IN_TIME_MS = 5000;
const HOLD_TIME_MS = 6000 - 500;
const BREATHE_OUT_TIME_MS = 7000;

const Ground_Environment_Page_2 = ({
  exerciseName,
  objKey,
  onButtonPress,
  exerciseLength,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const innerCircleAnim = useRef(new Animated.Value(0.55)).current;
  const holdProgressBarAnim = useRef(
    new Animated.Value(-SCREEN_WIDTH * 0.75),
  ).current;
  const instruction2PositionAnim = useRef(new Animated.Value(0)).current;

  const [breatheState, setBreatheState] = useState<"in" | "out" | "hold">("in");
  const [currentInstruction, setCurrentInstruction] = useState<
    "instruction_1" | "instruction_2" | "instruction_3" | null
  >("instruction_1");

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
          setCurrentInstruction("instruction_2");
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
    <GroundYourselfSlideFrame
      exerciseName={exerciseName}
      slideNum={objKey}
      exerciseLenght={exerciseLength}
    >
      <View
        style={{
          paddingTop: SCREEN_HEIGHT > 750 ? SCREEN_HEIGHT * 0.05 : null,
        }}
      >
        <FadeInView
          inputVal={1}
          outputVal={0}
          duration={1000}
          isActive={currentInstruction === "instruction_2"}
          onFinish={() => liftInstruction2PositionAnim(1000).start()}
        >
          <TypewriterText
            text={t("tools.ground_yourself.common.now_deep_breath")}
            size={20}
            cursorColor={Colors.mainGray}
            speed="very_fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
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
                    {breatheState === "in" &&
                      t("tools.breathing.exercise.commands.breathe_in")}
                    {breatheState === "out" &&
                      t("tools.breathing.exercise.commands.breathe_out")}
                    {breatheState === "hold" &&
                      t("tools.breathing.exercise.commands.hold")}
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
          isActive={currentInstruction === "instruction_2"}
          inputVal={0}
          duration={2500}
          style={{ transform: [{ translateY: instruction2PositionAnim }] }}
        >
          <TypewriterText
            className="mb-8"
            text={t("tools.ground_yourself.environment.page_2.instruction_2")}
            size={20}
            cursorColor={Colors.mainGray}
            speed="fast"
            delaySeconds={1.5}
            isActive={currentInstruction === "instruction_2"}
          />
          <FadeInView
            isActive={currentInstruction === "instruction_2"}
            className="my-4"
          >
            <TypewriterText
              text={t(
                "tools.ground_yourself.environment.page_2.instruction_2_1",
              )}
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={15}
              speed="very_fast"
              delaySeconds={6}
              isActive={currentInstruction === "instruction_2"}
              onFinish={() => setCurrentInstruction("instruction_3")}
            />
            <TypewriterText
              className="mt-8"
              text={t("tools.ground_yourself.environment.page_2.instruction_3")}
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={15}
              speed="very_fast"
              delaySeconds={2}
              isActive={currentInstruction === "instruction_3"}
            />
            <FadeInView
              isActive={currentInstruction === "instruction_3"}
              className="w-full flex-row justify-center"
              style={{ top: SCREEN_HEIGHT * 0.05 }}
            >
              <ArrowRightButton onPress={() => onButtonPress()} />
            </FadeInView>
          </FadeInView>
        </FadeInView>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Environment_Page_2;
