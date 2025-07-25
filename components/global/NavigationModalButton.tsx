import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

type NavigationModalButtonTypes = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  icon?: ReactNode;
};

const NavigationModalButton = ({
  title,
  disabled,
  onPress,
  icon,
}: NavigationModalButtonTypes) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center rounded-xl"
      style={{
        width: 0.75 * 320,
        height: 50,
        backgroundColor: Colors.darkBlue,
        opacity: disabled ? 0.4 : 1,
      }}
      disabled={disabled}
      onPress={() => {
        onPress();
      }}
    >
      <Text className="mx-1" style={{ color: Colors.white }}>
        {title}
      </Text>
      {icon && <View className="mx-1">{icon}</View>}
    </TouchableOpacity>
  );
};
export default NavigationModalButton;
