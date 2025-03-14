import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { Feather } from "@expo/vector-icons";

const ArrowRightButton = ({
  onPress,
  style,
}: {
  onPress: () => any;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity
      className="h-12 w-12 flex-row items-center justify-center rounded-full"
      onPress={() => onPress()}
      style={[style, { backgroundColor: Colors.mainBlue }]}
    >
      <Feather name="arrow-right" size={38} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default ArrowRightButton;
