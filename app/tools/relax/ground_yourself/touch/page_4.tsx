import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, View } from "react-native";
import { useSelector } from "react-redux";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import FadeInView from "@/components/global/FadeInView";
import GroundYourselfBreather from "@/components/tools/ground_yourself/Breather";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { Typewriter } from "typewriter4react-native";

const Ground_Touch_Page_4 = ({
  exerciseName,
  objKey,
  onButtonPress,
  exerciseLength,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );

  const [currentInstruction, setCurrentInstruction] = useState<
    "instruction_1" | "instruction_2" | "instruction_3" | "instruction_4" |
    "instruction_5" | null
  >("instruction_1");

  const instruction2PositionAnim = useRef(new Animated.Value(0)).current;

  const liftInstruction2PositionAnim = (duration: number) => {
    return Animated.timing(instruction2PositionAnim, {
      toValue: -SCREEN_HEIGHT * 0.3,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    });
  };

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
          isActive={currentInstruction === "instruction_4"}
          onFinish={() => liftInstruction2PositionAnim(1000).start()}
        >
          <Typewriter
            textStyle={{fontSize: 20, lineHeight: 30, letterSpacing: 1.5}}
            cursorStyle={{color: Colors.mainGray}}
            text={t("tools.ground_yourself.common.another_deep_breath")}
            speed="very_fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
            onFinish={() => setCurrentInstruction("instruction_2")}
          />
          <Typewriter
            textStyle={{color: Colors.mainGray, fontSize: 12, lineHeight: 18, letterSpacing: 1.5}}
            containerStyle={{overflow: 'visible'}}
            text={t("tools.ground_yourself.touch.page_4.instruction_2")}
            speed="fast"
            isActive={currentInstruction === "instruction_2"}
            startDelay={250}
            onFinish={() => setCurrentInstruction("instruction_3")}
          />
          <GroundYourselfBreather
            isActive={currentInstruction === "instruction_3"}
            onFinish={() => setCurrentInstruction("instruction_4")}
          />
        </FadeInView>
        <FadeInView
          isActive={currentInstruction === "instruction_4"}
          inputVal={0}
          duration={2500}
          style={{ transform: [{ translateY: instruction2PositionAnim }] }}
        >
          <View className="mb-8">
            <View>
              <Typewriter
                textStyle={{fontSize: 20, lineHeight: 30, letterSpacing: 1.5}}
                cursorStyle={{color: Colors.mainGray}}
                text={t("tools.ground_yourself.common.head_to_next_exercise")}
                speed="fast"
                startDelay={1500}
                isActive={currentInstruction === "instruction_4"}
                onFinish={() => setCurrentInstruction("instruction_5")}
              />
            </View>
          </View>
          <FadeInView isActive={currentInstruction === "instruction_4"}>
            <Typewriter
              textStyle={{color: Colors.darkGray, fontSize: 14, lineHeight: 21, letterSpacing: 1.5}}
              cursorStyle={{color: Colors.mainGray}}
              text={
                "(" +
                t("instructions.tap_button_below", {
                  ns: "common",
                }).toLowerCase() +
                ")"
              }
              speed="very_fast"
              startDelay={250}
              isActive={currentInstruction === "instruction_5"}
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

export default Ground_Touch_Page_4;
