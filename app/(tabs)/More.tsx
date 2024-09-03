import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Href, router } from "expo-router";
import SettingsTab from "@/components/SettingsTab";
const More = () => {
  return (
    <View className="flex-1 py-12 px-2">
      <View className="mb-6 mt-12">
        <Text className="mb-8 font-bold text-4xl text-center">More</Text>
        <ScrollView className="px-6 mb-4">
          <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
            Settings
          </Text>
          <SettingsTab
            name={"Settings"}
            link={""}
            icon={<AntDesign name="setting" size={36} color="black" />}
          />
          <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
            Info
          </Text>
          <SettingsTab
            name={"About"}
            link={""}
            icon={<FontAwesome6 name="question" size={34} color="black" />}
          />
          <SettingsTab
            name={"Rate us"}
            link={""}
            icon={<AntDesign name="staro" size={34} color="black" />}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default More;
