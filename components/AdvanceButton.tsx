import React from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
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
          backgroundColor: btnStyle.backgroundColor ?? Colors.darkBlue,
          opacity: disabled ? 0.25 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className="font-semibold"
        style={[textStyle, { color: textStyle.color ?? Colors.whiteSmoke }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AdvanceButton;
