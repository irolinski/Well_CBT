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
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";

const INSTRUCTION_3_DELAY_MS = 1000;

const Ground_Touch_Page_2 = ({
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
    "instruction_2" | "instruction_3" | undefined
  >(undefined);

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
          <TypewriterText
            text={t("tools.ground_yourself.common.now_deep_breath")}
            size={20}
            cursorColor={Colors.mainGray}
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
          <View className="mb-8">
            <View>
              <TypewriterText
                text={t("tools.ground_yourself.touch.page_2.instruction_2")}
                size={20}
                cursorColor={Colors.mainGray}
                speed="fast"
                delaySeconds={1.5}
                isActive={currentInstruction === "instruction_2"}
                onFinish={() =>
                  setTimeout(() => {
                    setCurrentInstruction("instruction_3");
                  }, INSTRUCTION_3_DELAY_MS)
                }
              />
            </View>
          </View>
          <FadeInView isActive={currentInstruction === "instruction_3"}>
            <TypewriterText
              text={t("tools.ground_yourself.touch.page_2.instruction_3")}
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={14}
              speed="very_fast"
              delaySeconds={6}
              isActive={currentInstruction === "instruction_3"}
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

export default Ground_Touch_Page_2;
