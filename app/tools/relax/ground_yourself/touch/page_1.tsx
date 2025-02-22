import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import TypewriterText from "@/components/TypewriterText";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { Entypo, Feather } from "@expo/vector-icons";

const Ground_Touch_Page_1 = ({
  onButtonPress,
}: {
  onButtonPress: () => void;
}) => {
  return (
    <Animated.View key="1">
      <TypewriterText
        text="With this exercise you will try to ground yourself using the sense of touch."
        size={20}
        letterSpacing={1.25}
        lineHeight={1.25}
        speed="medium"
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
          size={18}
          color={Colors.mainGray}
          hideCursorOnFinish={false}
        />
      </View>
      <TouchableOpacity
        className="flex-row justify-center"
        style={{ marginTop: SCREEN_HEIGHT * 0.15 }}
        onPress={() => onButtonPress()}
      >
        <Feather name="arrow-right-circle" size={48} color={Colors.mainGray} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Ground_Touch_Page_1;
