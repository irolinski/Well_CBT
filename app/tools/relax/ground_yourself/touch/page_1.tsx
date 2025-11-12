import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, View } from "react-native";
import { useSelector } from "react-redux";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import FadeInView from "@/components/global/FadeInView";
import Text from "@/components/global/Text";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { Entypo } from "@expo/vector-icons";
import { Typewriter } from "typewriter4react-native";

const Ground_Touch_Page_1 = ({
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
  // Animated value for rotation
  const waveAnimRef = useRef(new Animated.Value(0)).current;

  // Interpolate rotation degrees
  const rotate = waveAnimRef.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  const waveHandAnim = () => {
    return Animated.sequence([
      Animated.timing(waveAnimRef, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(waveAnimRef, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(waveAnimRef, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);
  };

  // Start waving animation on mount
  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      waveHandAnim().start();
    }
  }, [groundYourselfToolState.currentSlide]);

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
          style={{ fontFamily: "Kodchasan" }}
        >
          {t("tools.ground_yourself.touch.title")}
        </Text>
        <FadeInView
          className="flex-row justify-center"
          style={{
            marginTop: SCREEN_HEIGHT * 0.1,
            marginBottom: SCREEN_HEIGHT * 0.1,
          }}
          duration={1500}
          inputVal={0.1}
          outputVal={1}
        >
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Entypo
              name="hand"
              size={SCREEN_HEIGHT * 0.075}
              color={Colors.mainGray}
            />
          </Animated.View>
        </FadeInView>
        <Typewriter
          textStyle={{fontSize: 20, letterSpacing: 1.25, lineHeight: 25}}
          cursorStyle={{color: Colors.mainGray}}
          text={t("tools.ground_yourself.touch.page_1.instruction_1")}
          isActive={groundYourselfToolState.currentSlide === objKey}
          onFinish={() => setCurrentInstruction("instruction_2")}
          speed="fastest"
        />

        <View style={{ marginTop: SCREEN_HEIGHT * 0.025 }}>
          <Typewriter
            textStyle={{fontSize: 18, lineHeight: 27, letterSpacing: 1.5, color: Colors.mainGray}}
            text={t("instructions.tap_button_below", { ns: "common" })}
            speed="fast"
            isActive={currentInstruction === "instruction_2"}
            startDelay={1500}
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

export default Ground_Touch_Page_1;
