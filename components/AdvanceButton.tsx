import React, { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import Text from "./global/Text";

interface AdvanceButtonProps {
  onPress: () => void;
  title: string;
  className?: string;
  btnStyle?: any;
  textStyle?: any;
  icon?: ReactNode;
  disabled?: boolean;
}

const AdvanceButton = ({
  onPress,
  title,
  className = "",
  btnStyle = {},
  textStyle = {},
  icon,
  disabled,
}: AdvanceButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`h-12 flex-row items-center justify-center ${className}`}
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
        className="mx-2 font-semibold"
        style={[textStyle, { color: textStyle.color ?? Colors.whiteSmoke }]}
      >
        {title}
      </Text>
      {icon && <View>{icon}</View>}
    </TouchableOpacity>
  );
};

export default AdvanceButton;
