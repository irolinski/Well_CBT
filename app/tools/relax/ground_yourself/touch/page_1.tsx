import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useSelector } from "react-redux";
import ArrowRightButton from "@/components/ArrowRightButton";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import TypewriterText from "@/components/TypewriterText";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { Entypo } from "@expo/vector-icons";

const Ground_Touch_Page_1 = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
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
    <GroundYourselfSlideFrame exerciseName={exerciseName}>
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
          Touch
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
        <TypewriterText
          text="With this exercise you will try to ground yourself using the sense of touch."
          size={20}
          cursorColor={Colors.mainGray}
          isActive={groundYourselfToolState.currentSlide === objKey}
          letterSpacing={1.25}
          lineHeight={1.25}
          speed="fastest"
        />

        <View style={{ marginTop: SCREEN_HEIGHT * 0.025 }}>
          <TypewriterText
            text="Tap the button below to proceed."
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

export default Ground_Touch_Page_1;
