import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";
const BackButton = (props: any) => {
  return (
    <Pressable className="z-10" onPress={() => router.back()}>
      <Entypo name="chevron-left" size={24} color="black" />
    </Pressable>
  );
};
export default BackButton;
