import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { Entypo } from "@expo/vector-icons";

const ErrorScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Sorry, an error has occured. {"\n"}Try again later.</Text>
      <Pressable
        className="mx-4 my-8 flex-row items-center justify-center rounded-lg border px-4 py-2"
        style={{ borderColor: Colors.mainGray }}
        onPress={() => router.back()}
      >
        <View className="mx-1">
          <Entypo name="chevron-left" size={24} color={""} />
        </View>
        <Text className="mx-1 font-semibold">Go back</Text>
      </Pressable>
    </View>
  );
};

export default ErrorScreen;
