import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, Text, View } from "react-native";
import FadeInView from "@/components/FadeInView";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";

const THIS_SLIDE_KEY = "1";
const START_DELAY_MS = 2500;

const BREATHE_IN_TIME_MS = 5000;
const HOLD_TIME_MS = 6000 - 500;
const BREATHE_OUT_TIME_MS = 7000;

const Onboarding_Feat_Breathing = ({
  slideNum,
}: {
  slideNum: number | null;
}) => {
  const { t } = useTranslation(["tools", "common"]);

  const innerCircleAnim = useRef(new Animated.Value(0.55)).current;
  const holdProgressBarAnim = useRef(
    new Animated.Value(-SCREEN_WIDTH * 0.75),
  ).current;

  const [breatheState, setBreatheState] = useState<"in" | "out" | "hold">("in");
  const [currentAnimation, setCurrentAnimation] = useState<
    "fade_in_breather" | "fade_out_breather" | null
  >(null);

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

  const animateinnerCircle = (duration: number) => {
    expandInnerCircleAnim(BREATHE_IN_TIME_MS).start(() => {
      setBreatheState("hold");
      fillHoldProgressBarAnim(HOLD_TIME_MS).start(() => {
        shrinkInnerCircleAnim(BREATHE_OUT_TIME_MS).start(() => {
          setCurrentAnimation("fade_out_breather");
        });
        setBreatheState("out");
      });
    });
  };

  useEffect(() => {
    if (slideNum === Number(THIS_SLIDE_KEY) - 1) {
      setTimeout(() => {
        animateinnerCircle(7000);
      }, START_DELAY_MS);
    }
  }, [slideNum]);

  return (
    <View className="items-center" key={THIS_SLIDE_KEY}>
      <FadeInView
        className="items-center"
        isActive={currentAnimation === "fade_out_breather"}
        inputVal={1}
        outputVal={0}
      >
        <Text className="text-3xl" style={{ color: Colors.offWhite }}>
          Take a breather
        </Text>
        {/* Breather w/ Progress Bar */}

        <FadeInView
          className="items-center"
          isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
        >
          {/* Breather */}
          <View className="my-8 flex-row justify-center">
            <View
              className="h-56 w-56 rounded-full border"
              style={{
                height: SCREEN_HEIGHT * 0.275,
                width: SCREEN_HEIGHT * 0.275,
                borderColor: Colors.mainGray,
                backgroundColor: Colors.lightGray,
              }}
            >
              <View className="absolute h-full w-full flex-row items-center justify-center">
                <Text
                  className="z-10 text-2xl"
                  style={{ color: Colors.offBlack, fontFamily: "Kodchasan" }}
                >
                  {breatheState === "in" &&
                    t("tools.breathing.exercise.commands.breathe_in")}
                  {breatheState === "out" &&
                    t("tools.breathing.exercise.commands.breathe_out")}
                  {breatheState === "hold" &&
                    t("tools.breathing.exercise.commands.hold")}{" "}
                </Text>
              </View>
              <Animated.View
                className="relative h-full w-full items-center justify-center rounded-full"
                style={{
                  backgroundColor: Colors.offWhite,
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
                style={{ borderColor: Colors.offWhite }}
              >
                <Animated.View
                  className="absolute top-0 h-2 w-full rounded-xl"
                  style={{
                    backgroundColor: Colors.offWhite,
                    transform: [{ translateX: holdProgressBarAnim }],
                  }}
                />
              </View>
            </View>
          </View>
        </FadeInView>
      </FadeInView>
    </View>
  );
};

export default Onboarding_Feat_Breathing;
