import React from "react";
import { Animated, View } from "react-native";
import ArrowRightButton from "@/components/ArrowRightButton";
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
  return (
    <Animated.View key={objKey} style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
      <TypewriterText
        text="With this exercise you will try to ground yourself using the sense of touch."
        size={20}
        letterSpacing={1.25}
        lineHeight={1.25}
        speed="fast"
      />
      <View
        className="flex-row justify-center"
        style={{ marginTop: SCREEN_HEIGHT * 0.1 }}
      >
        <Entypo name="hand" size={44} color={Colors.mainGray} />
      </View>
      <View style={{ marginTop: SCREEN_HEIGHT * 0.1 }}>
        <TypewriterText
          text="Tap the button below to proceed."
          speed="fast"
          delaySeconds={3}
          size={18}
          color={Colors.mainGray}
          hideCursorOnFinish={false}
        />
      </View>
      <ArrowRightButton
        style={{ marginTop: SCREEN_HEIGHT * 0.15 }}
        onPress={() => onButtonPress()}
      />
    </Animated.View>
  );
};

export default Ground_Touch_Page_1;
