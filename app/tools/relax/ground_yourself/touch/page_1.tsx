import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import ArrowRightButton from "@/components/ArrowRightButton";
import FadeInView from "@/components/FadeInView";
import TypewriterText from "@/components/TypewriterText";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { Entypo } from "@expo/vector-icons";

const Ground_Touch_Page_1 = ({
  objKey,
  onButtonPress,
}: {
  objKey: number;
  onButtonPress: () => void;
}) => {
  // Animated value for rotation
  const waveAnim = useRef(new Animated.Value(0)).current;

  // Start waving animation on mount
  useEffect(() => {
    Animated.sequence([
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(waveAnim, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(waveAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [waveAnim]);

  // Interpolate rotation degrees
  const rotate = waveAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  return (
    <Animated.View key={objKey} style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
      <TypewriterText
        text="With this exercise you will try to ground yourself using the sense of touch."
        size={20}
        cursorColor={Colors.mainGray}
        letterSpacing={1.25}
        lineHeight={1.25}
        speed="fastest"
      />

      <FadeInView
        className="flex-row justify-center"
        style={{ marginTop: SCREEN_HEIGHT * 0.1 }}
        duration={1500}
        inputVal={0.1}
        outputVal={1}
      >
        {/* Animated hand with waving effect */}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Entypo
            name="hand"
            size={SCREEN_HEIGHT * 0.075}
            color={Colors.mainGray}
          />
        </Animated.View>
      </FadeInView>

      <View style={{ marginTop: SCREEN_HEIGHT * 0.1 }}>
        <TypewriterText
          text="Tap the button below to proceed."
          speed="fast"
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
  );
};

export default Ground_Touch_Page_1;
