import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "./global/Text";

interface AdvanceButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

const AdvanceButton = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
}: AdvanceButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white min-h-[48px] rounded-md justify-center items-center ${containerStyles}`}
      style={{ backgroundColor: "#4391BC" }}
      onPress={onPress}
    >
      <Text
        className={`font-semibold text-md ${textStyles}`}
        style={{ color: "#F5F5F5" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AdvanceButton;
