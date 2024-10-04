import { TouchableOpacity, View } from "react-native";
import Text from "./global/Text";

interface SecondaryButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  className?: string;
}

const SecondaryButton = ({
  onPress,
  title,
  className = "",
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center rounded border-2 ${className}`}
      style={{ borderColor: "#4391BC" }}
      onPress={onPress}
    >
      <View className="h-12 w-36 items-center justify-center">
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default SecondaryButton;
