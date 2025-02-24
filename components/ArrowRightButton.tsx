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
      className="flex-row justify-center"
      onPress={() => onPress()}
      style={style}
    >
      <Feather name="arrow-right-circle" size={48} color={Colors.mainGray} />
    </TouchableOpacity>
  );
};

export default ArrowRightButton;
