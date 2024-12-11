import { ColorValue, Pressable, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Text from "../global/Text";
import { Href, router } from "expo-router";

type LearnCategoryCardTypes = {
  name: string;
  backgroundColor: ColorValue;
  link: string;
};

const LearnCategoryCard = ({
  name,
  backgroundColor,
  link,
}: LearnCategoryCardTypes) => {
  return (
    <Pressable
      className="m-2.5 rounded-xl"
      style={{ height: 150, width: 150, backgroundColor: backgroundColor }}
      onPress={() => router.push(`${link}` as Href)}
    >
      <View className="h-1/2 items-center justify-center pt-6">
        <Text style={{ color: "#FFFFFF" }}>{name}</Text>
      </View>
      <View className="h-1/2 items-center justify-center">
        <TouchableOpacity
          className="mx-1 items-center justify-center rounded-xl"
          style={{ width: 100, height: 45, backgroundColor: "#FBFBFB" }}
          onPress={() => router.push(`${link}` as Href)}
        >
          <View>
            <Feather name="arrow-right" size={24} color="#757575" />
          </View>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};
export default LearnCategoryCard;
