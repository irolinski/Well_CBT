import { router } from "expo-router";
import { ColorValue, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const BackButton = ({
  handleBackButtonPress,
  color,
}: {
  handleBackButtonPress?: () => void;
  color?: ColorValue;
}) => {
  return (
    <Pressable
      className="z-10"
      onPress={() => {
        handleBackButtonPress && handleBackButtonPress();
        router.back();
      }}
    >
      <Entypo name="chevron-left" size={24} color={color ?? "black"} />
    </Pressable>
  );
};
export default BackButton;
