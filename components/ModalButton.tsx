import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ModalButtonTypes = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  icon?: ReactNode;
};

const ModalButton = ({ title, disabled, onPress, icon }: ModalButtonTypes) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center rounded-xl"
      style={{
        width: 0.75 * 320,
        height: 50,
        backgroundColor: !disabled ? "#4391BC" : "#B8B8B8",
      }}
      disabled={disabled}
      onPress={() => {
        onPress();
      }}
    >
      <Text className="mx-1" style={{ color: "#FFFFFF" }}>
        {title}
      </Text>
      {icon && <View className="mx-1">{icon}</View>}
    </TouchableOpacity>
  );
};
export default ModalButton;
