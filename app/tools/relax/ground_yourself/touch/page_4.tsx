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

  const instruction2PositionAnim = useRef(new Animated.Value(0)).current;

  const [instruction2IsActive, setInstruction2IsActive] = useState(false);

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
          isActive={instruction2IsActive}
          onFinish={() => liftInstruction2PositionAnim(1000).start()}
        >
          <TypewriterText
            text={t("tools.ground_yourself.common.another_deep_breath")}
            size={20}
            cursorColor={Colors.mainGray}
            speed="very_fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
          />
          <TypewriterText
            text={t("tools.ground_yourself.touch.page_4.instruction_2")}
            textColor={Colors.mainGray}
            size={12}
            speed="fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
            delaySeconds={1}
            showOverflow={true}
          />
          <GroundYourselfBreather
            isActive={groundYourselfToolState.currentSlide === objKey}
            onFinish={() => setInstruction2IsActive(true)}
          />
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
                text={t("tools.ground_yourself.common.head_to_next_exercise")}
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
              text={
                "(" +
                t("instructions.tap_button_below", {
                  ns: "common",
                }).toLowerCase() +
                ")"
              }
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

export default Ground_Touch_Page_4;
