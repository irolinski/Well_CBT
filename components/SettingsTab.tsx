import { FontAwesome6 } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";

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
      <View className="flex-row h-16 mb-8 bg-gray-200">
        <View className="w-1/5 justify-center">
          <View className="mx-auto">{icon}</View>
        </View>
        <View className="w-3/5 justify-center">
          <Text className="text-center translate-x-4 font-bold text-xl">
            {name}
          </Text>
        </View>
        <View className="w-1/5 justify-center">
          <View className="mx-auto">
            <FontAwesome6 name="chevron-right" size={16} color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default SettingsTab;
