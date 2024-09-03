import React from "react";
import { ScrollView, Text } from "react-native";
import Frame from "@/components/Frame";
import SettingsTab from "@/components/SettingsTab";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const More = () => {
  return (
    <Frame>
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
    </Frame>
  );
};

export default More;
