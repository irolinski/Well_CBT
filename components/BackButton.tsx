import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";
const BackButton = (props: any) => {
  return (
    <Pressable
      className="absolute top-12 left-6 z-10"
      onPress={() => router.back()}
    >
      <AntDesign name="leftcircleo" size={30} color="gray" />
    </Pressable>
  );
};
export default BackButton;
