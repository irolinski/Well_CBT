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
import {
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
} from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { Typewriter } from "typewriter4react-native";

const Ground_Body_Page_2 = ({
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
    "instruction_1" | "breather" | "instruction_2" | undefined
  >(undefined);


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
          paddingTop:
            SCREEN_HEIGHT > REFERENCE_SMALL_DEVICE_HEIGHT
              ? SCREEN_HEIGHT * 0.05
              : null,
        }}
      >
        <FadeInView
          inputVal={1}
          outputVal={0}
          duration={1000}
          isActive={currentInstruction === "instruction_1"}
          onFinish={() => liftInstruction2PositionAnim(1000).start()}
        >
          <Typewriter
            textStyle={{fontSize: 20, lineHeight: 30, letterSpacing: 1.5}}
            cursorStyle={{color: Colors.mainGray}}
            text={t("tools.ground_yourself.common.now_deep_breath")}
            speed="very_fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
            onFinish={() => setCurrentInstruction("breather")}
          />
          <GroundYourselfBreather
            isActive={currentInstruction === "breather"}
            onFinish={() => setCurrentInstruction("instruction_1")}
          />
        </FadeInView>
        <FadeInView
          isActive={currentInstruction === "instruction_1"}
          inputVal={0}
          duration={2500}
          style={{ transform: [{ translateY: instruction2PositionAnim }] }}
        >
          <Typewriter
            textStyle={{fontSize: 20, lineHeight: 30, letterSpacing: 1.5}}
            cursorStyle={{color: Colors.mainGray}}
            containerStyle={{marginTop: 32}}
            text={t("tools.ground_yourself.body.page_2.instruction_1")}
            speed="fast"
            startDelay={1500}
            isActive={currentInstruction === "instruction_1"}
            onFinish={() => setCurrentInstruction("instruction_2")}
          />
          <FadeInView
            isActive={currentInstruction === "instruction_2"}
            className="my-4"
          >
            <Typewriter
              textStyle={{color: Colors.darkGray, fontSize: 15, lineHeight: 22.5, letterSpacing: 1.5}}
              cursorStyle={{color: Colors.mainGray}}
              text={t("tools.ground_yourself.body.page_2.instruction_2")}
              speed="very_fast"
              startDelay={4000}
              isActive={currentInstruction === "instruction_2"}
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

export default Ground_Body_Page_2;
