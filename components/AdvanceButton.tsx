import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "./global/Text";

interface AdvanceButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  className?: string;
  style?: any;
}

const AdvanceButton = ({
  onPress,
  title,
  className = "",
  style,
}: AdvanceButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`h-12 items-center justify-center rounded ${className}`}
      style={[style, { backgroundColor: "#4391BC" }]}
      onPress={onPress}
    >
      <Text className="text-md font-semibold" style={{ color: "#F5F5F5" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AdvanceButton;
