import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, View } from "react-native";
import { useSelector } from "react-redux";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/global/TypewriterText";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";

const Ground_Environment_Page_1 = ({
  exerciseName,
  objKey,
  onButtonPress,
  exerciseLength,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );

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
          {t("tools.ground_yourself.environment.title_extended")}
        </Text>
        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.05,
          }}
        >
          <TypewriterText
            text={t("tools.ground_yourself.environment.page_1.instruction_1")}
            size={20}
            cursorColor={Colors.mainGray}
            isActive={groundYourselfToolState.currentSlide === objKey}
            letterSpacing={1.25}
            lineHeight={1.25}
            speed="fastest"
          />
        </View>

        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.05,
          }}
        >
          <TypewriterText
            text={t("instructions.tap_button_below", { ns: "common" })}
            speed="fast"
            isActive={groundYourselfToolState.currentSlide === objKey}
            delaySeconds={1.5}
            size={18}
            textColor={Colors.mainGray}
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

export default Ground_Environment_Page_1;
