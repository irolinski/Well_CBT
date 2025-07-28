import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, View } from "react-native";
import { useSelector } from "react-redux";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import FadeInView from "@/components/global/FadeInView";
import TypewriterText from "@/components/global/TypewriterText";
import GroundYourselfBreather from "@/components/tools/ground_yourself/Breather";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import {
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
} from "@/constants/styles/values";
import { RootState } from "@/state/store";

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
    "instruction_1" | "instruction_2" | undefined
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
          <TypewriterText
            text={t("tools.ground_yourself.common.now_deep_breath")}
            size={20}
            cursorColor={Colors.mainGray}
            speed="very_fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
          />
          <GroundYourselfBreather
            isActive={groundYourselfToolState.currentSlide === objKey}
            onFinish={() => setCurrentInstruction("instruction_1")}
          />
        </FadeInView>
        <FadeInView
          isActive={currentInstruction === "instruction_1"}
          inputVal={0}
          duration={2500}
          style={{ transform: [{ translateY: instruction2PositionAnim }] }}
        >
          <TypewriterText
            className="mb-8"
            text={t("tools.ground_yourself.body.page_2.instruction_1")}
            size={20}
            cursorColor={Colors.mainGray}
            speed="fast"
            delaySeconds={1.5}
            isActive={currentInstruction === "instruction_1"}
            onFinish={() => setCurrentInstruction("instruction_2")}
          />
          <FadeInView
            isActive={currentInstruction === "instruction_2"}
            className="my-4"
          >
            <TypewriterText
              text={t("tools.ground_yourself.body.page_2.instruction_2")}
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={15}
              speed="very_fast"
              delaySeconds={4}
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
