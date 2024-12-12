import React from "react";
import { Text } from "react-native";
import SettingsTab from "@/components/SettingsTab";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FrameMenu from "@/components/home/FrameMenu";

const More = () => {
  return (
    <FrameMenu title="More">
      {/* <Text className="mb-4 text-left text-xl">Settings</Text>
      <SettingsTab
        name={"Settings"}
        link={""}
        icon={<AntDesign name="setting" size={36} color="black" />}
      />
      <Text className="mb-4 text-left text-xl">Info</Text>
      <SettingsTab
        name={"About"}
        link={""}
        icon={<FontAwesome6 name="question" size={34} color="black" />}
      />
      <SettingsTab
        name={"Rate us"}
        link={""}
        icon={<AntDesign name="staro" size={34} color="black" />}
      /> */}
    </FrameMenu>
  );
};

export default More;
