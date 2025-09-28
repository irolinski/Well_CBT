import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, View } from "react-native";
import { useSelector } from "react-redux";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import Text from "@/components/global/Text";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { Typewriter } from "typewriter4react-native";

const Ground_Body_Page_1 = ({
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
    "instruction_1" | "instruction_2"
  >("instruction_1");

  return (
    <GroundYourselfSlideFrame
      exerciseName={exerciseName}
      slideNum={objKey}
      exerciseLenght={exerciseLength}
    >
      <Animated.View
        key={objKey}
        style={{
          paddingTop: SCREEN_HEIGHT > 750 ? SCREEN_HEIGHT * 0.05 : null,
        }}
      >
        <Text
          className="mb-4 text-2xl font-semibold"
          style={{
            fontFamily: "Kodchasan",
          }}
        >
          {t("tools.ground_yourself.body.title_extended")}
        </Text>
        {/* Hand animation */}
        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.05,
          }}
        >
          <Typewriter
            textStyle={{fontSize: 20, letterSpacing: 1.25, lineHeight: 25}}
            cursorStyle={{color: `${Colors.mainGray}`}}
            text={t("tools.ground_yourself.body.page_1.instruction_1")}
            isActive={groundYourselfToolState.currentSlide === objKey}
            onFinish={() => {
              setCurrentInstruction("instruction_2");
            }}
            speed="fastest"
          />
        </View>

        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.05,
          }}
        >
          <Typewriter
            textStyle={{fontSize: 18, lineHeight: 27, color: `${Colors.mainGray}`, letterSpacing: 1.5}}
            text={t("instructions.tap_button_below", { ns: "common" })}
            speed="fast"
            isActive={currentInstruction === "instruction_2"}
            hideCursorOnFinish={false}
          />
        </View>
        <View className="flex-row justify-center">
          <ArrowRightButton
            style={{ marginTop: SCREEN_HEIGHT * 0.15 }}
            onPress={onButtonPress}
          />
        </View>
      </Animated.View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Body_Page_1;
