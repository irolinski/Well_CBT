import { Href, router } from "expo-router";
import React, { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { FontAwesome6 } from "@expo/vector-icons";

const SettingsTab = ({
  name,
  link,
  icon,
}: {
  name: string;
  link: string;
  icon: ReactElement;
}) => {
  return (
    <Pressable onPress={() => router.push(link as Href)}>
      <View className="mb-8 h-16 flex-row bg-gray-200">
        <View className="w-1/5 justify-center">
          <View className="mx-auto">{icon}</View>
        </View>
        <View className="w-3/5 justify-center">
          <Text className="translate-x-4 text-center text-xl font-bold">
            {name}
          </Text>
        </View>
        <View className="w-1/5 justify-center">
          <View className="mx-auto">
            <FontAwesome6 name="chevron-right" size={16} color={Colors.black} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default SettingsTab;
