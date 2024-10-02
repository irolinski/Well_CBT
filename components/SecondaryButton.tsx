import { TouchableOpacity, View } from "react-native";
import Text from "./global/Text";

interface SecondaryButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

const SecondaryButton = ({
  onPress,
  title,
  containerStyles = "",
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center rounded border-2 ${containerStyles}`}
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
