import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "./global/Text";

interface AdvanceButtonProps {
  onPress: () => void;
  title: string;
  className?: string;
  btnStyle?: any;
  textStyle?: any;
  disabled?: boolean;
}

const AdvanceButton = ({
  onPress,
  title,
  className = "",
  btnStyle = {},
  textStyle = {},
  disabled,
}: AdvanceButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`h-12 items-center justify-center ${className}`}
      style={[
        btnStyle,
        {
          borderRadius: btnStyle.borderRadius ?? 4,
          backgroundColor: btnStyle.backgroundColor ?? "#4391BC",
          opacity: disabled ? 0.25 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className="text-md font-semibold"
        style={[textStyle, { color: textStyle.color ?? "#F5F5F5" }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AdvanceButton;
