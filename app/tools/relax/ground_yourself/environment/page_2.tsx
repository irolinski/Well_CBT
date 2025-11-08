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

  const instruction2PositionAnim = useRef(new Animated.Value(0)).current;

  const [currentInstruction, setCurrentInstruction] = useState<
    "instruction_1" | "instruction_2" | "instruction_3" | "instruction_4" |
    "instruction_5" | null
  >("instruction_1");

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
          isActive={currentInstruction === "instruction_2"}
          onFinish={() => liftInstruction2PositionAnim(1000).start()}
        >
          <Typewriter
            textStyle={{fontSize: 20, lineHeight: 30, letterSpacing: 1.5}}
            cursorStyle={{color: Colors.mainGray}}
            text={t("tools.ground_yourself.common.now_deep_breath")}
            speed="very_fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
          />
          <GroundYourselfBreather
            isActive={groundYourselfToolState.currentSlide === objKey}
            onFinish={() => setCurrentInstruction("instruction_2")}
          />
        </FadeInView>
        <FadeInView
          isActive={currentInstruction === "instruction_2"}
          inputVal={0}
          duration={2500}
          style={{ transform: [{ translateY: instruction2PositionAnim }] }}
        >
          <Typewriter
            containerStyle={{marginBottom: 32}}
            textStyle={{fontSize: 20, lineHeight: 30, letterSpacing: 1.5}}
            cursorStyle={{color: Colors.mainGray}}
            text={t("tools.ground_yourself.environment.page_2.instruction_2")}
            speed="fast"
            startDelay={1500}
            isActive={currentInstruction === "instruction_2"}
            onFinish={() => setCurrentInstruction("instruction_3")}
          />
          <FadeInView
            isActive={currentInstruction === "instruction_2"}
            className="my-4"
          >
              <Typewriter
              textStyle={{color: Colors.darkGray, fontSize: 15, lineHeight: 22.5, letterSpacing: 1.5}}
              cursorStyle={{color: Colors.mainGray}}
              text={t(
                "tools.ground_yourself.environment.page_2.instruction_2_1",
              )}
              speed="very_fast"
              startDelay={2000}
              isActive={currentInstruction === "instruction_3"}
              onFinish={() => setCurrentInstruction("instruction_4")}
            />
            <Typewriter
              containerStyle={{marginTop: 32}}
              textStyle={{color: Colors.darkGray, fontSize: 15, lineHeight: 22.5, letterSpacing: 1.5}}
              cursorStyle={{color: Colors.mainGray}}
              text={t("tools.ground_yourself.environment.page_2.instruction_3")}
              speed="very_fast"
              startDelay={2000}
              isActive={currentInstruction === "instruction_4"}
              onFinish={() => setCurrentInstruction("instruction_5")}
            />

            <FadeInView
              isActive={currentInstruction === "instruction_5"}
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
