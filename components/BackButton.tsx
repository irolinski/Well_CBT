import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

const BackButton = ({
  handleBackButtonPress,
  color,
}: {
  handleBackButtonPress?: () => void;
  color?: string;
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
